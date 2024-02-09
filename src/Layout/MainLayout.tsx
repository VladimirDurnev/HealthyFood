import React, { useRef } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import style from "../css/App.module.css";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { selectHome, setStatusHeader } from "../Redux/homeSlice";

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
