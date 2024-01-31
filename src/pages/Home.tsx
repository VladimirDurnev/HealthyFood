import React, { useEffect } from "react";
import { fetchData } from "../Redux/searchSlice";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import Category from "../Components/Category";
import style from "../css/Home.module.css";
export default function Home() {
    const dispatch = useAppDispatch();
    const { data } = useAppSelector((state) => state.searchSlice);
    const newData = data.map(({ recipe }: any) => recipe);
    console.log(newData);

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);
    return (
        <div>
            <div className={style.info}>
                <h1 className={style.title}>Low-Calorie Recipes</h1>
                <h2 className={style.desc}>
                    Low-calorie recipes to keep you full and happy sticking to
                    your diet. Learn about volume eating and enjoy delicious
                    low-calorie meals, including satisfying snacks and desserts.{" "}
                </h2>
            </div>
            <Category></Category>
            
            {data.map(({ recipe }: any) => (
               <div>
                <p>{recipe.label}</p>
                 <img src={recipe.image}></img>
               </div>
            ))}
        </div>
    );
}
