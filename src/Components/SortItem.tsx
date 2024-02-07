import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { setClearStatus } from "../Redux/searchSlice";
import { selectSearch } from "../Redux/searchSlice";
import style from "../css/Sort.module.css";
interface ISort {
    title: string;
    value?: string;
    typeInput?: string;
    addItem: () => void;
    deleteItem?: () => void;
}

export default function Sort({
    title,

    typeInput,
    addItem,
    deleteItem,
}: ISort) {
    const { mealType, clearStatus } = useAppSelector(selectSearch);

    const [addStatus, setAddStatus] = useState(true);
    const radioRef = useRef<HTMLInputElement>(null);
    const checkboxRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    useEffect(() => {
        mealType.forEach((item) => {
            if (checkboxRef.current && item.toLowerCase().includes(title)) {
                checkboxRef.current.checked = true;
                setAddStatus(false);
            }
        });
    }, []);

    useEffect(() => {
        if (checkboxRef.current && clearStatus) {
            checkboxRef.current.checked = false;
            dispatch(setClearStatus(false));
            setAddStatus((prev) => !prev);
        }
        if (radioRef.current && clearStatus) {
            radioRef.current.checked = false;
            setClearStatus(false);
            setAddStatus((prev) => !prev);
        }
    }, [clearStatus]);

    const hendleClick = () => {
        setAddStatus((prev) => !prev);
        if (!addStatus && radioRef.current) {
            radioRef.current.checked = false;
        }

        addStatus ? addItem && addItem() : deleteItem && deleteItem();
    };

    return (
        <label className={style.label}>
            <input
                type={typeInput ? typeInput : "checkbox"}
                name="myInput"
                ref={typeInput ? radioRef : checkboxRef}
                value={title[0].toUpperCase() + title.slice(1)}
                onClick={() => {
                    hendleClick();
                }}
            />
            {title[0].toUpperCase() + title.slice(1)}
        </label>
    );
}
