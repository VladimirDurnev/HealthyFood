import React, { useEffect, useState } from "react";
import search from "../assets/search.png";
import style from "../css/Search.module.css";
import Card from "../Components/Card";
import close from "../assets/close.png";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { fetchSearch, selectSearch } from "../Redux/searchSlice";
export default function Search() {
    const dispatch = useAppDispatch();
    const [value, setValue] = useState<string>("");
    const { data } = useAppSelector(selectSearch);
    useEffect(() => {
        dispatch(fetchSearch());
    }, [dispatch]);
    return (
        <div className={style.wrapper}>
            <div className={style.wrapper_input}>
                <input
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    type="text"
                    placeholder="what a you craving today"
                />
                {value && (
                    <button
                        onClick={() => {
                            setValue("");
                        }}
                        className={style.clear}
                    >
                        <img src={close} alt="close" />
                    </button>
                )}
                <button className={style.search_button}>Search</button>
            </div>
            <aside>
                <h4>Meal type</h4>
                <select name="category" id="category-id">
                    <option value=""></option>
                    <option value=" ">Breakfast</option>
                </select>
                
            </aside>
            interesting recipes
            <div >{data.map((obj) => <Card {...obj}></Card>)}</div>
        </div>
    );
}
