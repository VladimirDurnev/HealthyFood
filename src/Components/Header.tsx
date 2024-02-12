import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import style from "../css/Header.module.css";
import search from "../assets/search.png";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { selectSearch } from "../Redux/searchSlice";

import { fetchSearch } from "../Redux/searchSlice";
import { selectHome } from "../Redux/homeSlice";
import Recipes from "./Recipes";

const Header = () => {
    const dispatch = useAppDispatch();
    const { searchInput, mealType, dishType, diet, cuisineType } =
        useAppSelector(selectSearch);
    const { statusHeader } = useAppSelector(selectHome);

   
    return (
        <header
            className={
                statusHeader === "big"
                    ? style.header_wrapper
                    : style.header_wrapper_small
            }
        >
            <div className={style.container}>
                <Link className={style.logo_wrapper} to="/">
                    <img
                        className={
                            statusHeader === "small"
                                ? style.logo_small
                                : style.logo
                        }
                        src={logo}
                        alt=""
                    />
                    <h3
                        className={
                            statusHeader === "small"
                                ? style.logo_title_small
                                : style.logo_title
                        }
                    >
                        HealthyFood
                    </h3>
                </Link>
                <div className={style.search}>
                    
                    <Recipes></Recipes>
                    <Link to="Search">
                        <button
                            onClick={() =>
                                dispatch(
                                    fetchSearch({
                                        mealType,
                                        dishType,
                                        searchInput,
                                        diet,
                                        cuisineType,
                                    })
                                )
                            }
                        >
                            <img
                                className={
                                    statusHeader === "small" &&
                                    style.search_button
                                }
                                src={search}
                                alt=""
                            />
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
