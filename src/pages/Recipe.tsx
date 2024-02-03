import React, { useEffect, useState } from "react";
import { timeCalc } from "../helpers/Time";
import { caloriesCalc } from "../helpers/Calories";
import type { RecipeType } from "../type/RecipeType";
import style from "../css/Recipe.module.css";

export default function Recipe() {
    const [rec, setRec] = useState<RecipeType>();

    useEffect(() => {
        const recipeLocal: string | null = localStorage.getItem("recipe");
        recipeLocal && setRec(JSON.parse(recipeLocal));
    }, []);

    return rec ? (
        <div className={style.wrapper}>
            <h2 className={style.label}>{rec.label}</h2>

            <img className={style.recipeImage} src={rec.image} alt="" />

            <div className={style.wrapper_info}>
                <div className={style.wrapper_time}>
                    <h4 className={style.time}>
                        Total Time: {timeCalc(rec.totalTime)}
                    </h4>
                    <h4>Ingredients: {Object.keys(rec.ingredients).length}</h4>
                </div>
                <div className={style.wrapper_brief}>
                    <div>
                        <p>Сalories:</p>
                        <p>{caloriesCalc(rec.calories, rec.totalWeight)}</p>
                    </div>

                    {rec.digest.slice(0, 3).map((obj) => (
                        <li key={obj.label}>
                            <p>{obj.label}:</p>
                            <p>
                                {Math.round(obj.total)} {obj.unit}
                            </p>
                        </li>
                    ))}
                </div>
                <h4 className={style.health_title}>Health: </h4>
                <ul className={style.health}>
                    {rec.healthLabels &&
                        rec.healthLabels.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                </ul>
            </div>

            <ul className={style.wrapper_ingredients}>
                <h3 className={style.ingredients_title}>Ingredients</h3>
                {rec.ingredients &&
                    rec.ingredients.map((obj) => (
                        <li className={style.ingredients} key={obj.image}>
                            <img src={obj.image} alt="img" />
                            <p>{obj.text}</p>
                        </li>
                    ))}
            </ul>
            <a href={rec?.url}>
                <h3 className={style.instructions}>Cooking Instructions...</h3>
            </a>
        </div>
    ) : null;
}
