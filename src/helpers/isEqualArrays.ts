export const isEqualArrays = (
    array1: { title: string }[],
    array2: { title: string }[]
): boolean => {
    for (let i = 0; i < array1.length; i++) {
        if (array1[i].title !== array2[i].title) {
            return false;
        }
    }

    return true;
};
