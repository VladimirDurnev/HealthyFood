export const timeArray: { title: string; value?: string }[] = [
    { title: "Under 15 Min", value: "5-15" },
    { title: "Under 30 Min", value: "5-30" },
    { title: "Under 60 Min", value: "5-60" },
];

export const mealTypeArray: { title: string; img: string }[] = [
    {
        title: "breakfast",
        img: "https://i.pinimg.com/736x/c0/89/8f/c0898f479d9785afc4eca4ab1ae4dbef.jpg",
    },
    {
        title: "brunch",
        img: "https://i.pinimg.com/736x/42/c2/d0/42c2d0408286a6b4f0c464f884d51f74.jpg",
    },
    {
        title: "lunch",
        img: "https://mykaleidoscope.ru/x/uploads/posts/2022-09/thumbs/1663633626_23-mykaleidoscope-ru-p-biznes-lanch-yeda-vkontakte-28.jpg",
    },
    {
        title: "snack",
        img: "https://i.pinimg.com/originals/e9/eb/e1/e9ebe1ed7b62906743dcc06ce227cfde.jpg",
    },

    {
        title: "teatime",
        img: "https://sun9-42.userapi.com/impg/xT-QFHo6XWlJ2Q0rAZBb6Orq5gF8Mj5gJp8xTA/dUB8nYHrcsg.jpg?size=807x794&quality=96&sign=c417f4c64f6856671beec30151f5b83e&c_uniq_tag=KmJ6OioH94Qvig5MdZtBYYuPmisnthboum1VoGdNjKY&type=album",
    },
];

export const dishTypeArray: { title: string }[] = [
    { title: "biscuits and cookies" },
    { title: "bread" },
    { title: "cereals" },
    { title: "condiments and sauces" },
    { title: "desserts" },

    { title: "drinks" },
    { title: "egg" },
    { title: "ice cream and custard" },
    { title: "main course" },
    { title: "pancake" },

    { title: "pasta" },
    { title: "pastry" },
    { title: "pies and tarts" },
    { title: "pizza" },
    { title: "preps" },

    { title: "preserve" },
    { title: "salad" },
    { title: "sandwiches" },
    { title: "seafood" },
    { title: "side dish" },

    { title: "soup" },
    { title: "special occasions" },
    { title: "starter" },
    { title: "sweets" },
];

export const dietArray: { title: string }[] = [
    { title: "balanced" },
    { title: "high-fiber" },
    { title: "high-protein" },
    { title: "low-carb" },
    { title: "low-fat" },
    { title: "low-sodium" },
];
export const cuisineTypeArray: { title: string }[] = [
    { title: "american" },
    { title: "asian" },
    { title: "british" },
    { title: "caribbean" },
    { title: "central europe" },
    { title: "chinese" },

    { title: "eastern europe" },
    { title: "french" },
    { title: "greek" },
    { title: "indian" },
    { title: "italian" },
    { title: "japanese  " },

    { title: "korean" },
    { title: "kosher" },
    { title: "mediterranean" },
    { title: "mexican" },
    { title: "middle eastern" },
    { title: "nordic  " },
    
    { title: "south american" },
    { title: "south east asian" },
    { title: "world" },
  
];
export const SortBlockArray = [
    { title: "Time", array: timeArray, typeInput: "radio" },
    { title: "Meal Type", array: mealTypeArray },
    { title: "Dish Type", array: dishTypeArray },
    { title: "Diet", array: dietArray },
    { title: "Cuisine Type", array: cuisineTypeArray },
];
