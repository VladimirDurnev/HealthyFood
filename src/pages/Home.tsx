import React, { useEffect, useState } from "react";
import { fetchRandom, setStatusHeader } from "../Redux/homeSlice";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { selectHome } from "../Redux/homeSlice";
import Category from "../Components/Category";
import Card from "../Components/Card";
import style from "../css/Home.module.css";
import reboot from "../assets/reboot.png";
import { Status } from "../type/StatusEnum";
import Skeleton from "../Components/Skeleton";

export default function Home() {
    const dispatch = useAppDispatch();
    const [rebootStatus, setRebootStatus] = useState<boolean>(false);
    const { data, status } = useAppSelector(selectHome);
    
    const hendleReboot = (): void => {
        setRebootStatus(true);
        setTimeout(() => setRebootStatus(false), 500);
    };

    useEffect((): void => {
        if (data.length === 0) {
            dispatch(fetchRandom());
        }
    }, [dispatch]);

    return (
        <div>
            <div className={style.info}>
                <h1 className={style.title}>Low-Calorie Recipes</h1>
                <h2 className={style.desc}>
                    Low-calorie recipes to keep you full and happy sticking to
                    your diet. <br /> Learn about volume eating and enjoy
                    delicious low-calorie meals, including satisfying snacks and
                    desserts.
                </h2>
            </div>
            <div className={style.shadow}></div>
            <Category></Category>

            <div className={style.card_section}>
                <div className={style.random_wrapper}>
                    <h3 className={style.card_title}>Random recipes: </h3>
                    <button
                        onClick={() => {
                            dispatch(fetchRandom());
                            hendleReboot();
                        }}
                        className={rebootStatus ? style.active : null}
                    >
                        <img src={reboot} alt="reboot"></img>
                    </button>
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
            </div>
        </div>
    );
}
