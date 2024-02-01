import React from "react";

import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import style from "../css/Header.module.css";
import search from "../assets/search.png";
const Header = () => {
    return (
        <header className={style.header_wrapper}>
            <div className={style.container}>
                <Link to="/" >
                    <img className={style.logo} src={logo} alt="" />
                </Link>
                <div className={style.search}>
                    <input type="text" placeholder="Поиск" />
                    <button>
                        <img src={search} alt="" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
