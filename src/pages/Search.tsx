import React, { useEffect } from "react";
import style from "../css/Search.module.css";
import Card from "../Components/Card";
import close from "../assets/close.png";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import {
    clearAll,
    fetchSearch,
    selectSearch,
    setSearchInput,
} from "../Redux/searchSlice";

import { Status } from "../type/StatusEnum";
import SortBlock from "../Components/SortBlock";
import { SortBlockArray } from "../static/StaticData";
export default function Search() {
    const dispatch = useAppDispatch();
    const { data, mealType, searchInput, dishType, time, status } =
        useAppSelector(selectSearch);

    useEffect(() => {
        dispatch(fetchSearch({ mealType, searchInput, dishType, time }));
    }, [mealType, dishType, time]);

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
                        dispatch(fetchSearch({ mealType, dishType, searchInput }))
                    }
                    className={style.search_button}
                >
                    Search
                </button>
            </div>
            <div className={style.wrapper_search}>
                <aside className={style.aside}>
                    {SortBlockArray.map((item) => (
                        <SortBlock
                            key={item.title}
                            nameBlock={item.title}
                            sortArray={item.array}
                            typeInput={item.typeInput}
                        ></SortBlock>
                    ))}
                </aside>
                {status === Status.PENDING ? (
                    <>LOADING</>
                ) : data.length > 0 && Status.FULFILLED ? (
                    <div className={style.wrapper_card}>
                        {data.map((obj) => (
                            <Card {...obj}></Card>
                        ))}
                    </div>
                ) : (
                    <div className={style.notFound}>
                        <h4>We don't find anything matching your search.</h4>
                        <p>Try removing filters or changing your keyword.</p>
                        <button onClick={() => dispatch(clearAll())}>
                            Reset search
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
