import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./Layout/MainLayout";
import NotFound from "./pages/NotFound";
function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout></MainLayout>}>
                <Route path="" element={<Home></Home>}></Route>
            </Route>
            <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
    );
}

export default App;
