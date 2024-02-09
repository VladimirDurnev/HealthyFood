import React  from "react";
import style from "../css/Recipes.module.css";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import {
    fetchRecipesByCategory,
    selectRecipesByCategory,
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
export default function Recipes() {
    const { open } = useAppSelector(selectRecipesByCategory);
    const dispatch = useAppDispatch();
    
    const hendleOnClick = (category: string, array: { title: string }[]) => {
        dispatch(setOpen())
        if (isEqualArrays(array, mealTypeArray)) {
            dispatch(
                fetchRecipesByCategory({
                    category: `&mealType=${category}`,
                })
            );
        } else if (isEqualArrays(array, dishTypeArray)) {
            dispatch(
                fetchRecipesByCategory({
                    category: `&dishType=${category}`,
                })
            );
        } else if (isEqualArrays(array, dietArray)) {
            dispatch(
                fetchRecipesByCategory({
                    category: `&diet=${category}`,
                })
            );
        } else if (isEqualArrays(array, cuisineTypeArray)) {
            dispatch(
                fetchRecipesByCategory({
                    category: `&cuisineType=${category}`,
                })
            );
        }
        setOpen()
    };

    return (
        <>
            {open && (
                <div onMouseLeave={() => dispatch(setOpen())}  className={style.wrapper}>
                    <div className={style.recipes_block}>
                        {SortBlockArray.slice(1).map((item) => (
                            <div className={style.recipes_item}>
                                <h4>{item.title}</h4>
                                {item.array
                                    .slice(0, 10)
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
                                {item.array.length > 10 && (
                                    <Link to="Search" className={style.view}>
                                        {"view all " + ">"}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
