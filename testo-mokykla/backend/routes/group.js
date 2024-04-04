const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User, Group } = require("../models");
const shortid = require("shortid");

// Funkcija, skirta sugeneruoti naują prisijungimo kodą grupei
const updateJoinCode = async (groupId) => {
  const newCode = shortid.generate(); // Sugeneruojamas naujas kodas naudojant shortid biblioteką
  await Group.update({ code: newCode }, { where: { id: groupId } }); // Atnaujinamas grupės kodas duomenų bazėje
};

// Sukuria naują grupę su sugeneruotu kodu
router.post("/create", async (req, res) => {
  try {
    const { name } = req.body; // Išgryninamas grupės pavadinimas iš užklausos
    // Išskiriama vartotojo ID iš JWT žetono
    const token = req.headers.authorization.split(" ")[1]; // Išgryninamas JWT žetonas iš užklausos antraštės
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Dekoduojamas JWT žetonas naudojant JWT biblioteką ir slaptažodį iš aplinkos kintamųjų
    const userId = decoded.id; // Išgryninamas vartotojo ID iš dekoduoto JWT žetono

    // Sugeneruojamas unikalus kodas grupei
    const code = shortid.generate(); // Sugeneruojamas naujas unikalus kodas naudojant shortid biblioteką

    // Sukuriama grupė su sugeneruotu kodu ir susijusiu vartotojo ID
    const group = await Group.create({
      name,
      code,
      userId: userId, // Susiejamas vartotojo ID su grupe
    });

    // Nustatomas intervalas, kad kas 7 dienas būtų atnaujinamas prisijungimo prie grupės kodas
    setInterval(() => {
      updateJoinCode(group.id);
    }, 7 * 24 * 60 * 60 * 1000); // 7 dienų intervalas

    res.status(201).json({ success: true, group, code });
  } catch (error) {
    console.error("Klaida kuriant grupę:", error);
    res.status(500).json({ success: false, error: "Vidinė serverio klaida" });
  }
});

// Vartotojas prisijungia prie grupės
router.post("/join", async (req, res) => {
  try {
    const { code } = req.body; // Išgryninamas prisijungimo kodas iš užklausos
    const token = req.headers.authorization.split(" ")[1]; // Išgryninamas JWT žetonas iš užklausos antraštės
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Dekoduojamas JWT žetonas naudojant JWT biblioteką ir slaptažodį iš aplinkos kintamųjų
    const userId = decoded.id; // Išgryninamas vartotojo ID iš dekoduoto JWT žetono

    const group = await Group.findOne({ where: { code } }); // Surandama grupė pagal kodą duomenų bazėje

    if (!group) {
      return res.status(404).json({ success: false, error: "Grupė nerasta" });
    }

    await group.addUser(userId); // Pridedamas vartotojas prie grupės

    res
      .status(201)
      .json({ success: true, message: "Sėkmingai prisijungta prie grupės" });
  } catch (error) {
    console.error("Klaida prisijungiant prie grupės:", error);
    res.status(500).json({ success: false, error: "Vidinė serverio klaida" });
  }
});

// Gaunami vartotojo grupės
router.get("/my-groups", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Išgryninamas JWT žetonas iš užklausos antraštės
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Dekoduojamas JWT žetonas naudojant JWT biblioteką ir slaptažodį iš aplinkos kintamųjų
    const userId = decoded.id; // Išgryninamas vartotojo ID iš dekoduoto JWT žetono

    const groups = await Group.findAll({ where: { userId } }); // Surandamos visos vartotojo grupės

    const mappedGroups = groups.map((group) => ({
      // Sudaromas žemėlapis su grupių duomenimis
      id: group.id,
      name: group.name,
      code: group.code,
    }));

    res.status(200).json({ success: true, groups: mappedGroups });
  } catch (error) {
    console.error("Klaida gaunant vartotojo grupes:", error);
    res.status(500).json({ success: false, error: "Vidinė serverio klaida" });
  }
});

// Gaunamos prisijungusios vartotojo grupės
router.get("/joined-groups", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Išgryninamas JWT žetonas iš užklausos antraštės
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Dekoduojamas JWT žetonas naudojant JWT biblioteką ir slaptažodį iš aplinkos kintamųjų
    const userId = decoded.id; // Išgryninamas vartotojo ID iš dekoduoto JWT žetono

    const user = await User.findByPk(userId, { include: [{ model: Group }] }); // Surandamas vartotojas su prisijungusiomis grupėmis

    const groups = user.Groups.map((group) => ({
      // Sudaromas žemėlapis su grupių duomenimis
      id: group.id,
      name: group.name,
      code: group.code,
    }));

    res.status(200).json({ success: true, groups });
  } catch (error) {
    console.error("Klaida gaunant prisijungusias vartotojo grupes:", error);
    res.status(500).json({ success: false, error: "Vidinė serverio klaida" });
  }
});

// Gaunama grupė pagal ID
router.get("/:groupId", async (req, res) => {
  try {
    const { groupId } = req.params; // Išgryninamas grupės ID iš užklausos parametrų
    const token = req.headers.authorization.split(" ")[1]; // Išgryninamas JWT žetonas iš užklausos antraštės
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Dekoduojamas JWT žetonas naudojant JWT biblioteką ir slaptažodį iš aplinkos kintamųjų
    const userId = decoded.id; // Išgryninamas vartotojo ID iš dekoduoto JWT žetono

    const group = await Group.findByPk(groupId, {
      // Surandama grupė pagal ID
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
      ],
    });

    if (!group) {
      return res.status(404).json({ success: false, error: "Grupė nerasta" });
    }

    if (group.userId !== userId) {
      // Jei vartotojas neturi teisės matyti šios grupės
      return res.status(403).json({ success: false, error: "Uždrausta" });
    }

    const users = group.Users.map((user) => ({
      id: user.id,
      username: user.username,
    }));

    res
      .status(200)
      .json({ success: true, group: { ...group.toJSON(), users } });
  } catch (error) {
    console.error("Klaida gaunant grupę:", error);
    res.status(500).json({ success: false, error: "Vidinė serverio klaida" });
  }
});

// Grupės informacijos atnaujinimas
router.put("/:groupId", async (req, res) => {
  try {
    const { name } = req.body; // Išgryninamas naujas grupės pavadinimas iš užklausos
    const { groupId } = req.params; // Išgryninamas grupės ID iš užklausos parametrų
    const token = req.headers.authorization.split(" ")[1]; // Išgryninamas JWT žetonas iš užklausos antraštės
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Dekoduojamas JWT žetonas naudojant JWT biblioteką ir slaptažodį iš aplinkos kintamųjų
    const userId = decoded.id; // Išgryninamas vartotojo ID iš dekoduoto JWT žetono

    const group = await Group.findByPk(groupId); // Surandama grupė pagal ID

    if (!group) {
      return res.status(404).json({ success: false, error: "Grupė nerasta" });
    }

    if (group.userId !== userId) {
      // Jei vartotojas neturi teisės redaguoti šios grupės
      return res.status(403).json({ success: false, error: "Uždrausta" });
    }

    await group.update({ name }); // Atnaujinamas grupės pavadinimas

    res.status(200).json({ success: true, group });
  } catch (error) {
    console.error("Klaida atnaujinant grupę:", error);
    res.status(500).json({ success: false, error: "Vidinė serverio klaida" });
  }
});

// Grupės trynimas
router.delete("/:groupId", async (req, res) => {
  try {
    const { groupId } = req.params; // Išgryninamas grupės ID iš užklausos parametrų

    const token = req.headers.authorization.split(" ")[1]; // Išgryninamas JWT žetonas iš užklausos antraštės
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Dekoduojamas JWT žetonas naudojant JWT biblioteką ir slaptažodį iš aplinkos kintamųjų
    const userId = decoded.id; // Išgryninamas vartotojo ID iš dekoduoto JWT žetono

    const group = await Group.findByPk(groupId); // Surandama grupė pagal ID

    if (!group) {
      status(404).json({ success: false, error: "Grupė nerasta" });
    }

    if (group.userId !== userId) {
      // Jei vartotojas neturi teisės šalinti šios grupės
      return res.status(403).json({ success: false, error: "Uždrausta" });
    }

    await group.destroy(); // Ištrinama grupė

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Klaida trinant grupę:", error);
    res.status(500).json({ success: false, error: "Vidinė serverio klaida" });
  }
});

// Vartotojo šalinimas iš grupės
router.delete("/:groupId/users/:userId", async (req, res) => {
  try {
    const { groupId, userId } = req.params; // Išgryninamas grupės ID ir vartotojo ID iš užklausos parametrų

    const token = req.headers.authorization.split(" ")[1]; // Išgryninamas JWT žetonas iš užklausos antraštės
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Dekoduojamas JWT žetonas naudojant JWT biblioteką ir slaptažodį iš aplinkos kintamųjų
    const requestingUserId = decoded.id; // Išgryninamas vartotojo ID iš dekoduoto JWT žetono

    const group = await Group.findByPk(groupId); // Surandama grupė pagal ID

    if (!group) {
      return res.status(404).json({ success: false, error: "Grupė nerasta" });
    }

    if (group.userId !== requestingUserId) {
      // Jei vartotojas neturi teisės šalinti vartotojo iš šios grupės
      return res.status(403).json({ success: false, error: "Uždrausta" });
    }

    const userToRemove = await User.findByPk(userId); // Surandamas vartotojas, kuris turi būti pašalintas iš grupės

    if (!userToRemove) {
      return res
        .status(404)
        .json({ success: false, error: "Vartotojas nerastas" });
    }

    await group.removeUser(userToRemove); // Pašalinamas vartotojas iš grupės

    res
      .status(200)
      .json({ success: true, message: "Vartotojas pašalintas iš grupės" });
  } catch (error) {
    console.error("Klaida šalinant vartotoją iš grupės:", error);
    res.status(500).json({ success: false, error: "Vidinė serverio klaida" });
  }
});

// Vartotojas išeina iš grupės
router.delete("/:groupId/leave", async (req, res) => {
  try {
    const { groupId } = req.params; // Išgryninamas grupės ID iš užklausos parametrų

    const token = req.headers.authorization.split(" ")[1]; // Išgryninamas JWT žetonas iš užklausos antraštės
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Dekoduojamas JWT žetonas naudojant JWT biblioteką ir slaptažodį iš aplinkos kintamųjų
    const userId = decoded.id; // Išgryninamas vartotojo ID iš dekoduoto JWT žetono

    const group = await Group.findByPk(groupId); // Surandama grupė pagal ID

    if (!group) {
      return res.status(404).json({ success: false, error: "Grupė nerasta" });
    }

    const user = await User.findByPk(userId); // Surandamas vartotojas pagal ID

    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: "Vartotojas nerastas" });
    }

    const isMember = await group.hasUser(user); // Patikrinama, ar vartotojas yra grupės narys

    if (!isMember) {
      // Jei vartotojas nėra grupės narys
      return res
        .status(404)
        .json({ success: false, error: "Vartotojas nėra grupės narys" });
    }

    await group.removeUser(user); // Vartotojas pašalinamas iš grupės

    res
      .status(200)
      .json({ success: true, message: "Vartotojas sėkmingai išėjo iš grupės" });
  } catch (error) {
    console.error("Klaida pašalinant vartotoją iš grupės:", error);
    res.status(500).json({ success: false, error: "Vidinė serverio klaida" });
  }
});

module.exports = router;
