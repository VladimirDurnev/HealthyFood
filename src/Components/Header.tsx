import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import style from "../css/Header.module.css";
import search from "../assets/search.png";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { selectSearch } from "../Redux/searchSlice";
import { setSearchInput } from "../Redux/searchSlice";
import { fetchSearch } from "../Redux/searchSlice";

const Header = () => {
    const dispatch = useAppDispatch();
    const { searchInput, mealType, dishType } = useAppSelector(selectSearch);
    const { pathname } = useLocation();
    return (
        <header className={style.header_wrapper}>
            <div className={style.container}>
                <Link to="/">
                    <img className={style.logo} src={logo} alt="" />
                </Link>
                <div className={style.search}>
                    {pathname !== "/Search" && (
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
                                dispatch(fetchSearch({ mealType, dishType, searchInput }))
                            }
                        >
                            <img src={search} alt="" />
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
