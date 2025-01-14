export const Examples = {

    // Basic tables for PROFILE

    users: [
        {
            user_id: 1,
            username: 'user1',
            password: 'password1',
            user_desc: 'user1 vagyok, ez a bemutatkozó szövegem',
            email: 'user1@email.com'
        }
    ],

    // Basic tables for SEARCH

    recipes: [
        {
            recipe_id: 1,
            recipe_name: 'Szeletelt alma',
            recipe_description: 'Szeleteljen össze egy almát',
            recipe_time: '1 perc',
            recipe_headcount: 1,
            source_user_id: 2
        }, 
        {
            recipe_id: 2,
            recipe_name: 'Avokádó krém',
            recipe_description: 'Hámozzunk meg egy avokádót, távolítsuk el a magot, és törjük össze az avokádó húsát egy villával. Ízlés szerint sózzuk, borsozzuk',
            recipe_time: '1 perc',
            recipe_headcount: 1,
            source_user_id: 2
        }
    ],

    /* these are now queried from db 

    dish_category: [
        {
            category_id: 1,
            category_name: 'Vegán'
        },
        {
            category_id: 2,
            category_name: 'Laktózmentes'
        }
    ],

    dish_type: [
        {
            dishtype_id: 1,
            dishtype_name: 'Előétel'
        },
        {
            dishtype_id: 2,
            dishtype_name: 'Főétel'
        }
    ],
*/
    ingredients: [
        {
            ingredient_id: 1,
            ingredient_name: 'Alma'
        },
        {
            ingredient_id: 2,
            ingredient_name: 'Cukor'
        },
        {
            ingredient_id: 3,
            ingredient_name: 'Avokádó'
        }
    ],



    // Connections

    con_recipe_ingredients: [
        {
            // Szeletelt alma. Recept id: 1, Alma id a db-ben: 1
            recipe_id: 1,
            ingredient_id: 1
        },
        {
            // Avokádó krém. Recept id: 2, Avokádó id a db-ben: 3
            recipe_id: 2,
            ingredient_id: 3
        }
    ],

    con_recipe_category: [
        {
            // Vegán kategória id-je db-ben: 1
            recipe_id: 1,
            category_id: 1
        }, 
        {
            // Vegán kategória id-je db-ben: 1
            recipe_id: 2,
            category_id: 1
        }
    ],

    con_recipe_dishtype: [
        {
            // Előétel kategória id-je db-ben: 1
            recipe_id: 1,
            dishtype_id: 1
        }, 
        {
            // Előétel kategória id-je db-ben: 1
            recipe_id: 2,
            dishtype_id: 1
        }
    ]

}