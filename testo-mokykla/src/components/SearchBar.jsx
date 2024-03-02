import React from "react";
import "./SearchBar.css";
export const SearchBar = ()=>{
    return (
        <div className="search_input">
            <img  src="https://img.icons8.com/search" alt="Icon" />
            <input id="input_" placeholder="Ieškoti"/>
        </div>

    );
};