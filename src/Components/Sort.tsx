import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../Redux/hooks";

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
    const ref = useRef<HTMLInputElement>(null);
    const testClick = () => {
        setAddStatus((prev) => !prev);
        if (!addStatus && ref.current) {
            ref.current.checked = false; 
        }
        addStatus ? addItem && addItem() : deleteItem && deleteItem();
    };

    return (
        <label>
            <input
                type={typeInput ? typeInput : "checkbox"}
                name="myInput"
                ref={ref}
                value={title[0].toUpperCase() + title.slice(1)}
                onClick={() => {
                    testClick();
                }}
            />
            {title[0].toUpperCase() + title.slice(1)}
        </label>
    );
}
