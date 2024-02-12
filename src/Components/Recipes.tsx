import React from "react";
import style from "../css/Recipes.module.css";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import {
    fetchRecipesByCategory,
    selectRecipesByCategory,
    setCategory,
    setOpen,
} from "../Redux/recipesByCategorySlice";
import {
    SortBlockArray,
    mealTypeArray,
    dishTypeArray,
    dietArray,
    cuisineTypeArray,
} from "../static/StaticData";
import { Link } from "react-router-dom";
import { isEqualArrays } from "../helpers/isEqualArrays";
import arrowDown from "../assets/arrow-down.png";
import { selectHome } from "../Redux/homeSlice";
export default function Recipes() {
    const { open } = useAppSelector(selectRecipesByCategory);
    const dispatch = useAppDispatch();
    const { statusHeader } = useAppSelector(selectHome);
    const hendleOnClick = (category: string, array: { title: string }[]) => {
        dispatch(setOpen());
        
        if (isEqualArrays(array, mealTypeArray)) {
            dispatch(
                fetchRecipesByCategory({
                    category: `&mealType=${category}`,
                })
            );
            dispatch(setCategory(`&mealType=${category}`));
        } else if (isEqualArrays(array, dishTypeArray)) {
            dispatch(
                fetchRecipesByCategory({
                    category: `&dishType=${category}`,
                })
            );
            dispatch(setCategory(`&dishType=${category}`));
        } else if (isEqualArrays(array, dietArray)) {
            dispatch(
                fetchRecipesByCategory({
                    category: `&diet=${category}`,
                })
            );
            dispatch(setCategory( `&diet=${category}`));
        } else if (isEqualArrays(array, cuisineTypeArray)) {
            dispatch(
                fetchRecipesByCategory({
                    category: `&cuisineType=${category}`,
                })
            );
            dispatch(setCategory(`&cuisineType=${category}`));
        }
        setOpen();
    };

    return (
        <div onMouseLeave={() => dispatch(setOpen())}>
            <button
                onMouseOver={ () => {!open && dispatch(setOpen())}}
                className={statusHeader === "big" ? style.recipes_button : style.recipes_button_small}
            >
                Recipes
                <img src={arrowDown} alt="" />
            </button>
            {open && (
                <div className={style.wrapper}>
                    <div className={style.recipes_block}>
                        {SortBlockArray.slice(1).map((item) => (
                            <div className={style.recipes_item}>
                                <h4 className={style.category}>{item.title}</h4>
                                {item.array
                                    .slice(0, 6)
                                    .map((item, index, array) => (
                                        <Link
                                            onClick={() =>
                                                hendleOnClick(item.title, array)
                                            }
                                            className={style.label}
                                            to="RecipesByCategory"
                                        >
                                            {item.title}
                                        </Link>
                                    ))}
                                {item.array.length > 6 && (
                                    <Link to="Search" className={style.view}>
                                        {"view all " + ">"}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
