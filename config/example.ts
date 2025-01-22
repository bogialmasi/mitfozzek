export const Examples = {

    // Basic tables for PROFILE

    users: [
        {
            user_id: 1,
            username: 'user1',
            password: 'password1',
            user_desc: 'user1 vagyok, ez a bemutatkozó szövegem',
            email: 'user1@email.com'
        },
        {
            user_id: 2,
            username: 'thisisuser2username',
            password: 'password2',
            user_desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            email: 'user2@email.com'

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
        },
        {
            recipe_id: 3,
            recipe_name: 'Alma és avokádó',
            recipe_description: 'Alma és avokádó recept leírása. Lorem ipsum dolor lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lore lore lore lore lore lore lore lore lore lore lore lore lore lore lore lore lore lore lore',
            recipe_time: '25 perc',
            recipe_headcount: 3,
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
        },
        {
            ingredient_id: 51,
            ingredient_name: 'Brokkoli'
        },
        {
            ingredient_id: 1261,
            ingredient_name: 'Tej'
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
        },
        // Ha egy receptben több összetevő van, azok nem lehetnek tömbben pl [1,3]
        {
            recipe_id: 3,
            ingredient_id: 1
        },
        {
            recipe_id: 3,
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
    ],

    measurements: [
        {
            measurement_id: 1,
            measurement_name: 'g',
        },
        {
            measurement_id: 2,
            measurement_name: 'ml'
        }
    ],

    con_user_pantry: [
        {
            user_id: 1,
            pantry_id: 1
        },
        {
            user_id: 2,
            pantry_id: 2
        }
    ],

    pantry: [
        {
            pantry_id: 1,
            ingredient_id: 3, // Avokádó
            ingredient_quantity: 300,
            measurement_id: 1 // g
        },
        {
            pantry_id: 1,
            ingredient_id: 1, // Alma
            ingredient_quantity: 300,
            measurement_id: 1 // g
        },
        {
            pantry_id: 1,
            ingredient_id: 51, // Brokkoli
            ingredient_quantity: 300,
            measurement_id: 1 // g
        },
        {
            pantry_id: 1,
            ingredient_id: 1261, // Tej
            ingredient_quantity: 1000,
            measurement_id: 2 // ml
        }
    ]
}