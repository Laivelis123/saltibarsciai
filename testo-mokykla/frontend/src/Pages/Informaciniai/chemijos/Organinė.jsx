import React, { useState } from "react";
import SideNav from "../../../components/SideNav";
import UI from "../../../components/UI";

function Organinė() {
    const [categories, setCategories] = useState([
        { name: "Alkoholiai" },
        { name: "Aldehidai" },
        { name: "Karboksirūgštys" },
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
export default Organinė