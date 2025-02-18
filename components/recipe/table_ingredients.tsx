import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@heroui/table";
import { CancelIcon, CheckmarkIcon, HeroCheck } from "../icons";

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
        <Table aria-label="Example table with dynamic content">
      <TableHeader>
        <TableColumn>Összetevők</TableColumn>
        <TableColumn>Mennyiség</TableColumn>
        <TableColumn>Spájzom</TableColumn>
      </TableHeader>
      <TableBody items={recipe.ingredients}>
        {(ingredient) => (
          <TableRow key={ingredient.id}>
            <TableCell>{ingredient.name}</TableCell>
            <TableCell>200g</TableCell>
            <TableCell><HeroCheck/></TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
    )
}