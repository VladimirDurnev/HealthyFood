import React from "react";
import style from "../css/Category.module.css";
import { Link } from "react-router-dom";
export default function Category() {
    type typeCategory = { title: string; img: string };
    const category: typeCategory[] = [
        {
            title: "Breakfast",
            img: "https://i.pinimg.com/736x/c0/89/8f/c0898f479d9785afc4eca4ab1ae4dbef.jpg",
        },
        {
            title: "Brunch",
            img: "https://m-files.cdnvideo.ru/lpfile/e/e/2/ee26fe9e172bccbe9c6bc5de96d0cf16/-/scale/x2/-/crop/0x244x1680x1827/-/resize/357/-/quality/100/f.jpg",
        },
        {
            title: "Lunch",
            img: "https://mykaleidoscope.ru/x/uploads/posts/2022-09/thumbs/1663633626_23-mykaleidoscope-ru-p-biznes-lanch-yeda-vkontakte-28.jpg",
        },
        {
            title: "Snack",
            img: "https://i.pinimg.com/originals/e9/eb/e1/e9ebe1ed7b62906743dcc06ce227cfde.jpg",
        },

        {
            title: "Teatime",
            img: "https://sun9-42.userapi.com/impg/xT-QFHo6XWlJ2Q0rAZBb6Orq5gF8Mj5gJp8xTA/dUB8nYHrcsg.jpg?size=807x794&quality=96&sign=c417f4c64f6856671beec30151f5b83e&c_uniq_tag=KmJ6OioH94Qvig5MdZtBYYuPmisnthboum1VoGdNjKY&type=album",
        },
       
    ];
    return (
        <div className={style.wrapper_category}>
            <h3 className={style.title}>Category: </h3>

            <div className={style.wrapper}>
                {category.map((item) => (
                    <Link
                        to={item.title}
                        key={item.img}
                        className={style.wrapper_item}
                    >
                        <img src={item.img} alt="img"></img>

                        <h4>{item.title}</h4>
                    </Link>
                ))}
            </div>
        </div>
    );
}
