import React from "react";
import style from "../css/Category.module.css";
import { mealTypeArray } from "../static/StaticData";
import { Link } from "react-router-dom";
import { updateArray } from "../Redux/searchSlice";
import { useAppDispatch } from "../Redux/hooks";
export default function Category() {
    const dispatch = useAppDispatch();

    return (
        <div className={style.wrapper_category}>
            <h3 className={style.title}>Pick Your Meal: </h3>

            <div className={style.wrapper}>
                {mealTypeArray.map((item) => (
                    <Link
                        to="Search"
                        key={item.img}
                        className={style.wrapper_item}
                        onClick={() =>
                            dispatch(
                                updateArray({
                                    key: "mealType",
                                    value: item.title,
                                    operation: "add",
                                })
                            )
                        }
                    >
                        <img src={item.img} alt="img"></img>

                        <h4>
                            {item.title.slice(0, 1).toUpperCase() +
                                item.title.slice(1)}
                        </h4>
                    </Link>
                ))}
            </div>
        </div>
    );
}
