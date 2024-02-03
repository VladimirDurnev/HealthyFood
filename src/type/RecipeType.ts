export type RecipeType = {
    label: string;
    image: string;
    totalTime: number;
    calories: number;
    totalWeight: number;
    healthLabels: string[];
    ingredients: { text: string; image: string }[];
    digest: { label: string; total: number; unit: string }[];
    url: string;
}