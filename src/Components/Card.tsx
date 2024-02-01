import React from "react";
import style from "../css/Card.module.css";
export default function Card({ image, label, totalTime }: any) {
    return (
        <div className={style.wrapper}>
            <div className={style.wrapper_image}>
                <div className={style.overlay}>
                    <img src={image} alt="img" />
                </div>
                <p>
                    {totalTime / 60 >= 1
                        ? Math.round(totalTime / 60) +
                          " hr " +
                          (totalTime % 60 > 0 ? (totalTime % 60) + " min" : "")
                        : totalTime + " min"}
                </p>
            </div>
            <p className={style.label}>{label.length > 50 ? label.substring(0, 50) + "..." : label}</p>
            {/* <button className={style.card_button}>Open</button> */}
        </div>
    );
}
