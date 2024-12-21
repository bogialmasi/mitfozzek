export const Examples = {

    /* SEARCH FILTERS */

    dishTypes:[
        {key: "starter", value: "Előételek"},
        {key: "soup", value: "Levesek"},
        {key: "main_dish", value: "Főételek"},
        {key: "salad", value: "Saláták"},
        {key: "dessert", value: "Desszertek"},
    ] as const, //This ensures that TypeScript will treat key and value as literal types rather than generic strings.
    foodSensitivities:[
        {key: "gluten", value: "Glutén"},
        {key: "lactose", value: "Laktóz"},
        {key: "szoja", value: "Szója"},
        {key: "diabetic", value: "Diabetikus"},
        {key: "shellfish", value: "Rákfélék"},
    ] as const,
    dietaryRestrictions:[
        {key: "halal", value: "Halál"},
        {key: "vegan", value: "Vegán"},
        {key: "vegetarian", value: "Vegetariánus"},
        {key: "kosher", value: "Kóser"},
    ] as const,


}