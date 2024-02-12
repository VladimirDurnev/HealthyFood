import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import style from "../css/App.module.css";

export default function MainLayout() {
    return (
        <>
            <Header></Header>
       
            <div className={style.container}>
                <Outlet></Outlet>
            </div>
        </>
    );
}
