import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import MainLayout from "./Layout/MainLayout";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import style from "./css/App.module.css";
import { setStatusHeader } from "./Redux/homeSlice";
import { useAppDispatch } from "./Redux/hooks";
function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                dispatch(setStatusHeader("small"));
                
            } else {
                dispatch(setStatusHeader("big"));
            }
        };

        document.addEventListener("scroll", handleScroll);

        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div>
            <Routes>
                <Route path="/" element={<MainLayout></MainLayout>}>
                    <Route path="" element={<Home></Home>}></Route>
                    <Route path="Recipe" element={<Recipe></Recipe>}></Route>
                    <Route path="Search" element={<Search></Search>}></Route>
                </Route>
                <Route path="*" element={<NotFound></NotFound>}></Route>
            </Routes>
        </div>
    );
}

export default App;
