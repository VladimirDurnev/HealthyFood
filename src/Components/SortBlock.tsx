import React, { useState } from "react";
import style from "../css/SortBlock.module.css";
import { useAppDispatch } from "../Redux/hooks";
import Sort from "./SortItem";
import { mealTypeArray, timeArray, dishTypeArray } from "../static/StaticData";
import { setTime, updateArray } from "../Redux/searchSlice";
import { debounce } from "lodash";

const handleSortItem = debounce(
    (key: string, title: string | undefined, dispatch, action) => {
        action === updateArray
            ? dispatch(action({ key: key, value: title, operation: "add" }))
            : dispatch(action(title));
    },
    300
);
const clearSortItem = debounce(
    (key: string, dispatch, action, title?: string) => {
        action === updateArray && title
            ? dispatch(
                  updateArray({ key: key, value: title, operation: "remove" })
              )
            : dispatch(action(title));
    },
    300
);

export default function SortBlock({
    nameBlock,
    sortArray,
    typeInput,
}: {
    nameBlock: string;
    sortArray: { title: string; value?: string }[];
    typeInput?: string;
}) {
    const dispatch = useAppDispatch();
    const [test, setTest] = useState(false);

    sortArray.forEach((item) => item.value);
    return (
        <>
            <h4 onClick={() => setTest((prev) => !prev)}>{nameBlock}</h4>
            <div className={style.SortBlock}>
                {test &&
                    sortArray.map((item) =>
                        sortArray === timeArray ? (
                            <Sort
                                addItem={() =>
                                    handleSortItem(
                                        "time",
                                        item.value,
                                        dispatch,
                                        setTime
                                    )
                                }
                                deleteItem={() =>
                                    clearSortItem("time", dispatch, setTime)
                                }
                                typeInput={typeInput}
                                title={item?.title}
                            />
                        ) : sortArray === mealTypeArray ? (
                            <Sort
                                addItem={() =>
                                    handleSortItem(
                                        "mealType",
                                        item.title,
                                        dispatch,
                                        updateArray
                                    )
                                }
                                deleteItem={() =>
                                    clearSortItem(
                                        "mealType",
                                        dispatch,
                                        updateArray,
                                        item.title
                                    )
                                }
                                typeInput={typeInput}
                                title={item?.title}
                            />
                        ) : sortArray === dishTypeArray ? (
                            <Sort
                                addItem={() =>
                                    handleSortItem(
                                        "dishType",
                                        item.title,
                                        dispatch,
                                        updateArray
                                    )
                                }
                                deleteItem={() =>
                                    clearSortItem(
                                        "dishType",
                                        dispatch,
                                        updateArray,
                                        item.title
                                    )
                                }
                                typeInput={typeInput}
                                title={item?.title}
                            />
                        ) : (
                            <></>
                        )
                    )}
            </div>
        </>
    );
}
