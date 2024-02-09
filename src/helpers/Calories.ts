export const caloriesCalc = (calories: number, totalWeight: number): number => {
    return Math.round((calories / totalWeight) * 100);
};
