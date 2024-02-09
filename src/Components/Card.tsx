import React from "react";
import style from "../css/Card.module.css";

import { timeCalc } from "../helpers/Time";
import { Link } from "react-router-dom";

interface ICard {
    image: string;
    label: string;
    totalTime: number;
    onClick?: () => void;
}

const Card: React.FC<ICard> = ({ image, label, totalTime, onClick }) => {
    return (
        <Link to="/Recipe" className={style.wrapper} onClick={onClick}>
            <div className={style.wrapper_image}>
                <div className={style.overlay}>
                    <img src={image} alt="img" />
                </div>
                <p>{timeCalc(totalTime)}</p>
            </div>
            <p className={style.label}>
                {label.length > 50 ? label.substring(0, 50) + "..." : label}
            </p>
        </Link>
    );
};
export default Card;
