export const caloriesCalc = (calories: number, totalWeight: number) => {
    return Math.round((calories / totalWeight) * 100);
};
