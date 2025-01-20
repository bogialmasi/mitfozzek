import { CancelIcon, CheckmarkIcon } from "../icons";

interface Ingredient {
    id: number;
    name: string;
}

interface Recipe {
    recipe_id: number;
    recipe_name: string;
    recipe_description: string;
    recipe_time: string;
    recipe_headcount: number;
    source_user_id: number;
    ingredients: Ingredient[]; // array of ingredients
}

interface MyIngredientsTableProps {
    recipe: Recipe;
}

export const MyIngredientsTable: React.FC<MyIngredientsTableProps> = ({ recipe }) => {
    return (
        <table className="table-fixed md:table-fixed border border-collapse w-full">
            <thead>
                <tr>
                    <th className="border px-4 py-2 text-sm">Összetevő</th>
                    <th className="border px-4 py-2 text-sm">Mennyiség</th>
                    <th className="border px-4 py-2 text-sm">Spájzom</th>
                </tr>
            </thead>
            <tbody>
                {recipe.ingredients.map((ingredient) => (
                    <tr key={ingredient.id}>
                        <td className="border px-4 py-2 text-sm">{ingredient.name}</td>
                        <td className="border px-4 py-2 text-sm">200 g</td>
                        <td className="border px-4 py-2 text-sm">
                            <div className="flex justify-center items-center h-full">
                                <CancelIcon style={{ width: '16px', height: '16px' }} />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}