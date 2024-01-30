import React, { useEffect } from "react";
import { fetchData } from "../Redux/sliceHome";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";

export default function Home() {
    const dispatch = useAppDispatch();
    const { data } = useAppSelector((state) => state.sliceHome);
    console.log(data);
    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);
    return (
        <div>
            {data.map((item) => (
                <img key={item.Title} alt="Poster" src={item.Poster}></img>
            ))}
        </div>
    );
}
