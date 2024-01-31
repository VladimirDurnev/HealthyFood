import React from "react";
import style from "../css/Category.module.css";
import { Link } from "react-router-dom";
export default function Category() {
    type typeCategory = { title: string; img: string };
    const category: typeCategory[] = [
        {
            title: "Biscuit and coockies",
            img: "http://klublady.ru/uploads/posts/2022-02/1644615698_7-klublady-ru-p-pechene-kukis-foto-8.jpg",
        },
        {
            title: "Bread",
            img: "https://i.pinimg.com/originals/70/ca/b3/70cab3de585787160d3af332a6446750.jpg",
        },
        {
            title: "Lunch",
            img: "https://www.fashiontime.ru/upload/iblock/e89/e8958f8ae27b32f4504efa2a3882ad64w500h500cr.jpg",
        },
        {
            title: "Snack",
            img: "https://i.pinimg.com/originals/e9/eb/e1/e9ebe1ed7b62906743dcc06ce227cfde.jpg",
        },

        {
            title: "Soup",
            img: "https://is3-ssl.mzstatic.com/image/thumb/Purple111/v4/90/e3/52/90e3525b-9d9c-20a1-deee-4cdac803160a/source/512x512bb.jpg",
        },
        {
            title: "Salad",
            img: "https://i.pinimg.com/originals/1a/42/40/1a42407255bf2ea175a89ebd46225677.jpg",
        },
    ];
    return (
        <div className={style.wrapper_category}>
            <h3 className={style.title}>Category: </h3>

            <div className={style.wrapper}>
                {category.map((item) => (
                    <Link to={item.title} key={item.img}>
                        <div className={style.wrapper_item}>
                            <img src={item.img} alt="img"></img>

                            <p>{item.title}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
