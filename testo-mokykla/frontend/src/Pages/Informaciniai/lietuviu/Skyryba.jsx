import React, { useState } from "react";
import SideNav from "../../../components/SideNav";
import UI from "../../../components/UI";

function Skyryba() {
    const [categories, setCategories] = useState([
        { name: "Vienarūšės sakinio dalys" },
        { name: "Pažyminiai" },
        { name: "Įterpiniai" },
        { name: "Kreipiniai" },
    ]);

    const [filterText, setFilterText] = useState("");

    const handleFilterChange = (filterText) => {
        setFilterText(filterText);
    };

    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <UI filterText={filterText} filterCategories={handleFilterChange}>
            <SideNav categories={filteredCategories} />
        </UI>
    );

}
export default Skyryba