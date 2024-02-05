import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { selectSearch } from "../Redux/searchSlice";
interface ISort {
    title: string;
    value?: string;
    typeInput?: string;
    addItem: () => void;
    deleteItem?: () => void;
}

export default function Sort({
    title,
    value,
    typeInput,
    addItem,
    deleteItem,
}: ISort) {
    const dispatch = useAppDispatch();
    const [addStatus, setAddStatus] = useState(true);
    const radioRef = useRef<HTMLInputElement>(null);
    const checkboxRef = useRef<HTMLInputElement>(null);
    const { mealType } = useAppSelector(selectSearch);
    const testClick = () => {
        setAddStatus((prev) => !prev);
        if (!addStatus && radioRef.current) {
            radioRef.current.checked = false;
        }
       

        addStatus ? addItem && addItem() : deleteItem && deleteItem();
    };

    return (
        <label>
            <input
                type={typeInput ? typeInput : "checkbox"}
                name="myInput"
                ref={typeInput ? radioRef : checkboxRef}
                value={title[0].toUpperCase() + title.slice(1)}
                onClick={() => {
                    testClick();
                }}
            />
            {title[0].toUpperCase() + title.slice(1)}
        </label>
    );
}
