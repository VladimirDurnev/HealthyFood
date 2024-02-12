import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./Layout/MainLayout";
import style from "./css/App.module.css";
import { setStatusHeader } from "./Redux/homeSlice";
import { useAppDispatch } from "./Redux/hooks";


const NotFound = React.lazy(() => import("./pages/NotFound"));
const Recipe = React.lazy(() => import("./pages/Recipe"));
const Search = React.lazy(() => import("./pages/Search"));
const RecipesByCategory = React.lazy(() => import("./pages/RecipesByCategory"));

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
                    <Route
                        path="RecipesByCategory"
                        element={<RecipesByCategory></RecipesByCategory>}
                    ></Route>
                    <Route path="Recipe" element={<Recipe></Recipe>}></Route>
                    <Route path="Search" element={<Search></Search>}></Route>
                </Route>
                <Route path="*" element={<NotFound></NotFound>}></Route>
            </Routes>
        </div>
    );
}

export default App;
