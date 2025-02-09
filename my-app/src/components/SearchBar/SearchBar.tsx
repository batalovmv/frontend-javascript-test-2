import React from "react";
import "./SearchBar.css";

interface SearchBarProps {
    inputValue: string;
    onInputChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ inputValue, onInputChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onInputChange(e.target.value);
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="🔍 Введите GitHub имя..."
                className="search-input"
            />
        </div>
    );
};

export default SearchBar;