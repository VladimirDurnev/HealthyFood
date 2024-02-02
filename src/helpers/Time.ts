export const timeCalc = (totalTime: number) => {
    return totalTime / 60 >= 1
        ? Math.round(totalTime / 60) +
              " hr " +
              (totalTime % 60 > 0 ? (totalTime % 60) + " min" : "")
        : totalTime + " min";
};
