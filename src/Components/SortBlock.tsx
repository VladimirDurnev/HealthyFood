import React, { useEffect, useState } from "react";
import style from "../css/SortBlock.module.css";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import Sort from "./SortItem";
import { mealTypeArray, timeArray, dishTypeArray, dietArray, cuisineTypeArray } from "../static/StaticData";
import { selectSearch, setTime, updateArray } from "../Redux/searchSlice";
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

interface ISortBlock {
    nameBlock: string;
    sortArray: { title: string; value?: string }[];
    typeInput?: string;
}

const SortBlock: React.FC<ISortBlock> = ({
    nameBlock,
    sortArray,
    typeInput,
}) => {
    const dispatch = useAppDispatch();
    const [openBlock, setOpenBlock] = useState(false);
    const { mealType } = useAppSelector(selectSearch);
    useEffect(() => {
        const openSortBlock = () => {
            sortArray === mealTypeArray && mealType.length > 0 && setOpenBlock(!openBlock);
        }
        openSortBlock()
        
    }, [mealType.length, openBlock, sortArray]);

    return (
        <>
            <div>
                <h4 onClick={() => setOpenBlock((prev) => !prev)}>
                    {nameBlock}
                </h4>
                <img src="" alt="" />
            </div>
            <div className={style.SortBlock}>
                {openBlock &&
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
                                title={item.title}
                            />
                        ) :  sortArray === dietArray ? (
                            <Sort
                                addItem={() =>
                                    handleSortItem(
                                        "diet",
                                        item.title,
                                        dispatch,
                                        updateArray
                                    )
                                }
                                deleteItem={() =>
                                    clearSortItem(
                                        "diet",
                                        dispatch,
                                        updateArray,
                                        item.title
                                    )
                                }
                                typeInput={typeInput}
                                title={item?.title}
                            />
                        ) :  sortArray === cuisineTypeArray ? (
                            <Sort
                                addItem={() =>
                                    handleSortItem(
                                        "cuisineType",
                                        item.title,
                                        dispatch,
                                        updateArray
                                    )
                                }
                                deleteItem={() =>
                                    clearSortItem(
                                        "cuisineType",
                                        dispatch,
                                        updateArray,
                                        item.title
                                    )
                                }
                                typeInput={typeInput}
                                title={item?.title}
                            />
                        ):  (
                            <></>
                        )
                    )}
            </div>
        </>
    );
};

export default SortBlock