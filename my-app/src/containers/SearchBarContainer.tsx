// src/containers/SearchBarContainer.tsx
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUsername } from "../features/userSlice";
import { resetRepos } from "../features/reposSlice";
import SearchBar from "../components/SearchBar/SearchBar";

const SearchBarContainer: React.FC = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        const trimmedValue = inputValue.trim();
        if (!trimmedValue) return;

        const handler = setTimeout(() => {
            dispatch(setUsername(trimmedValue));
            dispatch(resetRepos());
        }, 500);

        return () => clearTimeout(handler);
    }, [inputValue, dispatch]);

    const handleInputChange = (value: string) => {
        setInputValue(value);
    };

    return (
        <SearchBar inputValue={inputValue} onInputChange={handleInputChange} />
    );
};

export default SearchBarContainer;