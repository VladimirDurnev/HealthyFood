import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import MainLayout from "./Layout/MainLayout";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import style from "./css/App.module.css";
function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout></MainLayout>}>
                <Route path="" element={<Home></Home>}></Route>
                <Route path="Recipe" element={<Recipe></Recipe>}></Route>
                <Route path="Search" element={<Search></Search>}></Route>
            </Route>
            <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
    );
}

export default App;
