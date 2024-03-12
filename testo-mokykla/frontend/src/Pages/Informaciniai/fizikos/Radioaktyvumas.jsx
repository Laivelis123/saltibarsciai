import React, { useState } from "react";
import SideNav from "../../../components/SideNav";
import UI from "../../../components/UI";

function Radioaktyvumas() {
    const [categories, setCategories] = useState([
        { name: "Poveikis aplinkai" },
        { name: "Poveikis žmogui" },
        { name: "Spinduliuotės" },
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
export default Radioaktyvumas