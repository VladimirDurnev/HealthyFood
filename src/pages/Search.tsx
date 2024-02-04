import React, { useEffect, useState } from "react"
import style from "../css/Search.module.css";
import Card from "../Components/Card";
import close from "../assets/close.png";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import {
    fetchSearch,
    selectSearch,
    setSearchInput,
} from "../Redux/searchSlice";
import Sort from "../Components/Sort";
import { mealTypeArry, timeArry } from "../static/StaticData";
import { setMealType, daleteItemMealType, setTime } from "../Redux/searchSlice";
import { debounce } from "lodash";
export default function Search() {
    const dispatch = useAppDispatch();
    const { data, mealType, searchInput, time } = useAppSelector(selectSearch);

    useEffect(() => {
        dispatch(fetchSearch({ mealType, searchInput, time }));
    }, [mealType, time]);

    const hendleTime = debounce((value) => {
        value && dispatch(setTime(value));
    }, 300);
    const clearTime = debounce((value) => {
        value && dispatch(setTime(""));
    }, 300);

    const hendleMealType = debounce((title) => {
        dispatch(setMealType(title));
    }, 300);
    const clearMealType = debounce((title) => {
        dispatch(daleteItemMealType(title));
    }, 300);

    return (
        <div className={style.wrapper}>
            <div className={style.wrapper_input}>
                <input
                    onChange={(e) => dispatch(setSearchInput(e.target.value))}
                    value={searchInput}
                    type="text"
                    placeholder="what a you craving today"
                />
                {searchInput && (
                    <button
                        onClick={() => {
                            dispatch(setSearchInput(""));
                        }}
                        className={style.clear}
                    >
                        <img src={close} alt="close" />
                    </button>
                )}
                <button
                    onClick={() =>
                        dispatch(fetchSearch({ mealType, searchInput }))
                    }
                    className={style.search_button}
                >
                    Search
                </button>
            </div>
            <div className={style.wrapper_search}>
                <aside>
                    <h4>Time</h4>
                    <div className={style.radio_wrapper}>
                        {timeArry.map((item) => (
                            <Sort
                                addItem={() => hendleTime(item.value)}
                                deleteItem={() => clearTime(item.value)}
                                typeInput='radio'
                                title={item.title}
                                value={item.value}
                            />
                        ))}
                    </div>
                    <h4>Meal type</h4>
                    <div className={style.radio_wrapper}>
                        {mealTypeArry.map((item) => (
                            <Sort
                                addItem={() => hendleMealType(item)}
                                deleteItem={() => clearMealType(item)}
                                title={item}
                            />
                        ))}
                    </div>
                </aside>

                <div className={style.wrapper_card}>
                    {data.map((obj) => (
                        <Card {...obj}></Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
