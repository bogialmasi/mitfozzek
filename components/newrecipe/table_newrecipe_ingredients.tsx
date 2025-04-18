import { Button } from "@heroui/button";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { HeroCancel, HeroPlus } from "@/components/icons";
import { Ingredient } from "@/types";
import { MyAddRecipeIngredientsModal } from "./modal_addrecipeingredient";
import { useDisclosure } from "@heroui/modal";
import { useEffect, useState } from "react";
import { Spinner } from "@heroui/react";
import { subtitle } from "@/components/primitives";
import { button as buttonStyles } from "@heroui/theme";

interface MyAddIngredientsTableProps {
  tableIngredients: Ingredient[];
  onAddItem: (ingredient: Ingredient) => void;
  onRemove: (ingredientId: number) => void;
}

export const MyAddIngredientsTable: React.FC<MyAddIngredientsTableProps> = ({ tableIngredients, onAddItem, onRemove }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { isOpen: isAddOpen, onOpen: onAddOpen, onOpenChange: onAddOpenChange } = useDisclosure();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [error, setError] = useState<string>('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [ingredientsRes] = await Promise.all([
          fetch("/api/data?type=ingredients"),
        ]);
        const ingredientsData = await ingredientsRes.json();

        const mappedIngredients = ingredientsData.map((ingredient: { key: number, value: string, measurement: string }) => ({
          ingredient_id: ingredient.key,
          ingredient_name: ingredient.value,
          ingredient_quantity: 0,  // quantity comes later
          ingredient_measurement: ingredient.measurement,
        }));

        setIngredients(mappedIngredients);
      } catch (error) {
        console.error("Dropdown data loading failed:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddIngredient = (ingredientId: number, quantity: number) => {
    const selectedIngredient = ingredients.find((ing) => ing.ingredient_id === ingredientId);

    if (selectedIngredient) {
      const newItem: Ingredient = {
        ingredient_id: selectedIngredient.ingredient_id,
        ingredient_name: selectedIngredient.ingredient_name,
        ingredient_quantity: quantity,
        ingredient_measurement: selectedIngredient.ingredient_measurement
      };

      onAddItem(newItem); // add ingredient to table
    }
  };


  const handleDelete = (ingredientId: number) => {
    onRemove(ingredientId);
  };

  const getKeyValue = (item: Ingredient, columnKey: string) => {
    switch (columnKey) {
      case "ingredient_name":
        return item.ingredient_name;
      case "ingredient_quantity":
        return item.ingredient_quantity;
      case "measurement_name":
        return item.ingredient_measurement;
      default:
        return "";
    }
  };

  if (loading)
    return (
      <div>
        <div className="flex justify-center items-center h-screen">
          <p>Loading...</p>
          <Spinner />
        </div>
      </div>
    );

  return (
    <section className="flex justify-center w-full py-8">
      <div className="w-full max-w-md mx-auto px-4 py-6 rounded-lg">
        <div className={subtitle({ class: "mt-4" })}>Hozzávalók:</div>
        {tableIngredients.length > 0 && (
          <Table aria-label="Hozzávalók listája:">
            <TableHeader>
              <TableColumn>Név</TableColumn>
              <TableColumn>Mennyiség</TableColumn>
              <TableColumn> </TableColumn>
            </TableHeader>
            <TableBody items={tableIngredients}>
              {(item) => (
                <TableRow key={item.ingredient_id}>
                  <TableCell>{getKeyValue(item, "ingredient_name")}</TableCell>
                  <TableCell>
                    {getKeyValue(item, "ingredient_quantity")} {getKeyValue(item, "measurement_name")}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="light"
                      radius="full"
                      onClick={() => handleDelete(item.ingredient_id)}
                      className="min-w-unit-8 w-unit-8 h-unit-8 p-0"
                    >
                      <HeroCancel />
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
        <div className="py-4 flex justify-center space-x-4">
          <Button className={buttonStyles({ variant: "bordered", radius: "full" })} onClick={onAddOpen}>
            <HeroPlus /> Hozzáadás
          </Button>
        </div>

        {error && <p className="text-red-500">{error}</p>}
        <MyAddRecipeIngredientsModal
          isOpen={isAddOpen}
          onOpenChange={onAddOpenChange}
          ingredients={ingredients}
          onAddItem={handleAddIngredient}
        />
      </div>
    </section>
  );
};
