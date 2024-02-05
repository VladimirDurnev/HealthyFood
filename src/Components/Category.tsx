import React from "react";
import style from "../css/Category.module.css";
import { category } from "../static/StaticData";
import { Link } from "react-router-dom";
import { setMealType } from "../Redux/searchSlice";
import { useAppDispatch } from "../Redux/hooks";
export default function Category() {
const dispatch = useAppDispatch()
    return (
        <div className={style.wrapper_category}>
            <h3 className={style.title}>Pick Your Meal: </h3>

            <div className={style.wrapper}>
                {category.map((item) => (
                    <Link
                        to='Search'
                        key={item.img}
                        className={style.wrapper_item}
                        onClick={() => dispatch(setMealType(item.title))}
                    >   
                        <img src={item.img} alt="img"></img>

                        <h4>{item.title}</h4>
                    </Link>
                ))}
            </div>
        </div>
    );
}
