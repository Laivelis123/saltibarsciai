const express = require("express");
const router = express.Router();
const { User, Group } = require("../models");
const { v4: uuidv4 } = require("uuid");
const verifyToken = require("./verifyToken");

//TeacherRoutes
// Endpoint to create a new group
// Mokytojas gali sukurti, pašalinti,redaguoti, peržiūrėti savo grupes, išmesti vartotojus iš savo grupės
router.post("/create", verifyToken, async (req, res, next) => {
  try {
    const { name } = req.body;
    const { userId } = req;

    // Generate a random code using uuidv4
    const code = uuidv4();

    const group = await Group.create({ name, code, userId });
    res.status(201).json({ success: true, group });
  } catch (error) {
    next(error);
  }
});

// Endpoint to retrieve user's groups
router.get("/my-groups", verifyToken, async (req, res) => {
  try {
    const { userId } = req; // Access user id from request object
    // Find user's groups
    const groups = await Group.findAll({ where: { userId } });

    res.status(200).json({ success: true, groups });
  } catch (error) {
    console.error("Klaida gaunant vartotojo sukurtas grupes:", error);
    res.status(500).json({ success: false, error: "Vidinė serverio klaida" });
  }
});

// Update Group Name Endpoint
router.put("/:groupId", verifyToken, async (req, res) => {
  try {
    const { name } = req.body;
    const { groupId } = req.params;

    // Find the group by ID
    const group = await Group.findByPk(groupId);

    if (!group) {
      return res.status(404).json({ success: false, error: "Grupė nerasta" });
    }

    // Update the group name
    group.name = name;
    await group.save();

    res.status(200).json({ success: true, group });
  } catch (error) {
    console.error("Klaida atnaujinant grupės pavadinimą:", error);
    res.status(500).json({ success: false, error: "Vidinė serverio klaida" });
  }
});

// Grupės trynimas
router.delete("/:groupId", verifyToken, async (req, res) => {
  try {
    const { groupId } = req.params; // Išgryninamas grupės ID iš užklausos parametrų
    const userId = req.userId;

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
router.delete("/:groupId/users/:userId", verifyToken, async (req, res) => {
  try {
    const { groupId, userId } = req.params; // Išgryninamas grupės ID ir vartotojo ID iš užklausos parametrų

    const requestingUserId = req.userId;

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
//StudentRoutes
// Vartotojas prisijungia prie grupės
// Studentas gali prisijungti, išeiti, peržiūrėti savo grupes
router.post("/join", async (req, res) => {
  try {
    const { code } = req.body; // Išgryninamas prisijungimo kodas iš užklausos
    const userId = req.userId; // Išgryninamas vartotojo ID iš užklausos

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

// Gaunamos prisijungusios vartotojo grupės
router.get("/joined-groups", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
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

// Vartotojas išeina iš grupės
router.delete("/:groupId/leave", verifyToken, async (req, res) => {
  try {
    const { groupId } = req.params; // Išgryninamas grupės ID iš užklausos parametrų

    const userId = req.userId;

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
//AllRoutes
// Gaunama grupė pagal ID
router.get("/:groupId", verifyToken, async (req, res) => {
  try {
    const { groupId } = req.params; // Išgryninamas grupės ID iš užklausos parametrų
    const userId = req.userId;

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

module.exports = router;
