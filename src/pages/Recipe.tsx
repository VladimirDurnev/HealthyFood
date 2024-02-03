import React, { useEffect, useState } from "react";

import { timeCalc } from "../helpers/Time";
import { caloriesCalc } from "../helpers/Calories";
import style from "../css/Recipe.module.css";
export default function Recipe() {
    const [rec, setRec] = useState<any>();

    useEffect(() => {
        const recipeLocal: any = localStorage.getItem("recipe");
        setRec(JSON.parse(recipeLocal));
    }, []);

    return (
        rec && (
            <div className={style.wrapper}>
                <h2 className={style.label}>{rec.label}</h2>

                <img className={style.recipeImage} src={rec.image} alt="" />
                <div className={style.wrapper_info}>
                    <p>{timeCalc(rec.totalTime)}</p>
                    <p>
                        calories: {caloriesCalc(rec.calories, rec.totalWeight)}
                    </p>
                    <ul className={style.health}>
                        {rec.healthLabels &&
                            rec.healthLabels.map((item: string) => (
                                <li key={item}>{item}</li>
                            ))}
                    </ul>
                </div>
                <ul>
                    {rec.ingredients &&
                        rec.ingredients.map(
                            (obj: { text: string; image: string }) => (
                                <li key={obj.image}>
                                    <p>{obj.text}</p>
                                    <img src={obj.image} alt="img" />;
                                </li>
                            )
                        )}
                </ul>
            </div>
        )
    );
}
