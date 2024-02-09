import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import style from "../css/Header.module.css";
import search from "../assets/search.png";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { selectSearch } from "../Redux/searchSlice";
import { setSearchInput } from "../Redux/searchSlice";
import { fetchSearch } from "../Redux/searchSlice";
import { selectHome } from "../Redux/homeSlice";

const Header = () => {
    const dispatch = useAppDispatch();
    const { searchInput, mealType, dishType, diet, cuisineType } =
        useAppSelector(selectSearch);
    const { statusHeader } = useAppSelector(selectHome);
    const { pathname } = useLocation();
    return (
        <header className={statusHeader === "big" ? style.header_wrapper : style.header_wrapper_small}>
            <div className={style.container}>
                <Link to="/">
                    <img className={statusHeader === "small" && style.logo} src={logo} alt="" />
                </Link>
                <div className={style.search}>
                    {statusHeader === "small" || pathname !== "/Search" && (
                        <input
                            onChange={(e) =>
                                dispatch(setSearchInput(e.target.value))
                            }
                            value={searchInput}
                            type="text"
                            placeholder="Поиск"
                        />
                    )}
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
                            <img className={statusHeader === "small" && style.search_button} src={search} alt="" />
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
