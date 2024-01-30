import React, { useEffect } from "react";
import { fetchData } from "../Redux/searchSlice";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";

export default function Home() {
    const dispatch = useAppDispatch();
    const { data } = useAppSelector((state) => state.searchSlice);
    console.log(data);
    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);
    return <div>Home</div>;
}
