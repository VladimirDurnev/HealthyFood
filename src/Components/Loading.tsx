import React from 'react'
import style from '../css/Loading.module.css'
export default function Loading() {
  return (
    <div className={style.wrapper}>
        <span className={style.loader}></span>
    </div>
  )
}
