import React, { useEffect } from "react";
import style from "../css/RecipesByCategory.module.css";
import { Status } from "../type/StatusEnum";
import Skeleton from "../Components/Skeleton";
import Card from "../Components/Card";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import {
    fetchRecipesByCategory,
    selectRecipesByCategory,
} from "../Redux/recipesByCategorySlice";
export default function RecipesByCategory() {
    const { data, status, category, _cont } = useAppSelector(
        selectRecipesByCategory
    );
    const dispatch = useAppDispatch();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [category, _cont]);
    return (
        <div className={style.wrapper}>
            <div className={style.wrapper_main_img}>
                <div className={style.overlay}>
                    <img
                        className={style.main_img}
                        src="https://i.pinimg.com/originals/1f/b2/1d/1fb21d756e0b9e9ac9aebb92e61a4a84.jpg"
                        alt="img"
                    />
                </div>
                <h2 className={style.title}>
                    {category
                        .slice(category.indexOf("=") + 1)
                        .slice(0, 1)
                        .toUpperCase() +
                        category.slice(category.indexOf("=") + 1).slice(1)}
                </h2>
            </div>
            {status === Status.PENDING ? (
                <div className={style.card_wrapper}>
                    {[...new Array(20)].map(() => (
                        <Skeleton />
                    ))}
                </div>
            ) : status === Status.FULFILLED && data.length > 0 ? (
                <div className={style.card_wrapper}>
                    {data.map((obj) => (
                        <Card
                            onClick={() =>
                                localStorage.setItem(
                                    "recipe",
                                    JSON.stringify({ ...obj })
                                )
                            }
                            key={obj.image}
                            {...obj}
                        ></Card>
                    ))}
                </div>
            ) : (
                <h1>Nothing was found, try updating the data</h1>
            )}
            <div className={style.wrapper_pages}>
                <button
                    onClick={() => {
                        dispatch(fetchRecipesByCategory({ category }));

                        window.scrollTo(0, 0);
                    }}
                    className={style.pages}
                >
                    Go back to the beginning
                </button>
                <button
                    onClick={() =>
                        dispatch(fetchRecipesByCategory({ category, _cont }))
                    }
                    className={style.pages}
                >
                    NEXT PAGE
                </button>
            </div>
        </div>
    );
}
