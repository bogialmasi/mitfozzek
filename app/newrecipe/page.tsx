'use client'
import { useEffect, useState } from "react";
import { HeroCheck, HeroCancel } from "@/components/icons";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { title } from "@/components/primitives";
import { Form } from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import { useRouter } from "next/navigation";
import { MyAddIngredientsTable } from "@/components/newrecipe/table_newrecipe_ingredients";
import { Ingredient } from "@/types";
import { MyDropdown } from "@/components/search/dropdown_searchfilters";
import { MySearchBar } from "@/components/search/searchbar_dropdown";
import { subtitle } from "@/components/primitives";
import { Spinner } from "@heroui/react";
import { MySubmittedModal } from "@/components/newrecipe/modal_submitted";

export default function NewRecipePage() {
  const [recipeName, setRecipeName] = useState<string>('');
  const [recipeDescription, setRecipeDescription] = useState<string>('');
  const [recipeTime, setRecipeTime] = useState<string>('1');
  const [recipeHeadcount, setRecipeHeadcount] = useState<string>('1');
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [tableItems, setTableItems] = useState<Ingredient[]>([]);
  const [dishType, setDishType] = useState([]);
  const [dietCategory, setDietCategory] = useState([]);
  const [dishCuisine, setDishCuisine] = useState([]);
  const [addUserId, setAddUserId] = useState<boolean>(false);
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState({
    dishType: new Set<number>(),
    dietCategory: new Set<number>(),
    dishCuisine: new Set<number>(),
  });

  const checkLogin = async () => {
    try {
      const res = await fetch('/api/authcheck', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await res.json();
      if (!data.success) {
        setError('Bejelentkezés szükséges');
        setLoading(false);
        return false;
      }
      return true;
    } catch (err) {
      setError('Bejelentkezés szükséges');
      setLoading(false);
      return false;
    }
  };

  useEffect(() => {
    checkLogin();
    const fetchFilters = async () => {
      setLoading(true);
      setError('');


      try {
        // Fetch all dropdown data
        const [dishTypeRes, dietCategoryRes, dishCuisineRes] = await Promise.all([
          fetch('/api/data?type=dish_type'),
          fetch('/api/data?type=diet_category'),
          fetch('/api/data?type=dish_cuisine')
        ]);

        if (!dishTypeRes.ok || !dietCategoryRes.ok || !dishCuisineRes.ok) {
          setError("Hiba a keresési filterek betöltése közben");
        }

        setDishType(await dishTypeRes.json());
        setDietCategory(await dietCategoryRes.json());
        setDishCuisine(await dishCuisineRes.json());

      } catch (error) {
        console.error('Hiba a filterek betöltése közben:', error);
        setError('Hiba a keresési filterek betöltése közben');
      } finally {
        setLoading(false);
      }
    };
    fetchFilters();
  }, []);

  const updateFilter = (type: keyof typeof selectedFilters, keys: number[]) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: new Set(keys),
    }));
  };

  const validateForm = () => {
    if (!recipeName || !recipeDescription || tableItems.length === 0) {
      setError("A mezők kitöltése kötelező");
      return false;
    }
    if (!acceptTerms) {
      setError("A feltételek elfogadása kötelező");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setError('');
    setLoading(true);

    const newRecipe = {
      recipe_name: recipeName,
      recipe_description: recipeDescription,
      recipe_time: Number(recipeTime),
      recipe_headcount: Number(recipeHeadcount),
      ingredients: tableItems,
    };

    const formattedFilters = {
      dishType: Array.from(selectedFilters.dishType),
      dietCategory: Array.from(selectedFilters.dietCategory),
      dishCuisine: Array.from(selectedFilters.dishCuisine),
    };

    console.log("submitted:", newRecipe, formattedFilters, acceptTerms, addUserId)
    setIsModalOpen(true)
    try {
      const response = await fetch('/api/newrecipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ newRecipe, formattedFilters, acceptTerms, addUserId }),
      });
      const res = await response.json();
      if (!response.ok) {
        setError(res.message || 'Hiba történt a feltöltés során.');
      }
    } catch (err) {
      console.error('Feltöltés közben hiba lépett fel:', err);
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  function handleCancel() {
    router.push('/profile');
  }

  const handleAddItem = (ingredient: Ingredient) => {
    setTableItems((prevIngredients) => [...prevIngredients, ingredient]);
  };

  const handleRemoveIngredient = (ingredientId: number) => {
    setTableItems((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient.ingredient_id !== ingredientId)
    );
  };

  if (loading) return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <p>Betöltés...</p>
        <Spinner />
      </div>
    </div>);

  return (
    <div>
      <h1 className={title()}>Új recept feltöltése</h1>
      <Form onSubmit={handleSubmit} validationBehavior="native" className="w-full flex flex-col gap-6 py-4">
        <Input
          isRequired
          value={recipeName} onChange={(e) => setRecipeName(e.target.value)}
          label="Recept címe"
          labelPlacement="outside"
          name="recipeName"
          placeholder="Írja be a címet"
          type="text"
          variant="bordered"
          maxLength={100}
          errorMessage="A cím maximum 100 karakter lehet"
          isClearable
          onClear={() => setRecipeName('')}
          isInvalid={recipeName.length >= 100}
        />
        <div className="flex gap-4">
          <Input
            value={recipeHeadcount} onChange={(e) => setRecipeHeadcount(e.target.value)}
            isRequired
            errorMessage="Adjon meg érvényes számot"
            label="Hány főre?"
            labelPlacement="outside"
            name="recipeHeadcount"
            placeholder="Írjon be egy számot"
            type="number"
            variant="bordered"
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">fő</span>
              </div>
            }
          />
          <Input
            isRequired
            value={recipeTime} onChange={(e) => setRecipeTime(e.target.value)}
            label="Elkészítési idő"
            labelPlacement="outside"
            name="recipeTime"
            placeholder="Elkészítés ideje"
            type="number"
            variant="bordered"
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">perc</span>
              </div>
            }
          />
        </div>
        <MyAddIngredientsTable
          tableIngredients={tableItems}
          onAddItem={handleAddItem}
          onRemove={handleRemoveIngredient}
        />
        <Textarea
          isRequired
          value={recipeDescription} onChange={(e) => setRecipeDescription(e.target.value)}
          labelPlacement="outside"
          name="description"
          placeholder="Recept leírása"
          type="text"
          variant="bordered"
          maxLength={3000}
          errorMessage="A leírás maximum 3000 karakter lehet"
          isClearable
          onClear={() => setRecipeDescription('')}
          isInvalid={recipeDescription.length >= 3000}
        />
        <div className={subtitle({ class: "mt-4" })}>
          Keresési feltételek:
        </div>
        <div className='flex flex-col space-y-1 w-full'>
          <p className="text-sm py-2">Milyen konyha?</p>
          <MySearchBar
            isDisabled={false}
            list={dishCuisine}
            selectedKeys={Array.from(selectedFilters.dishCuisine)}
            onSelectionChange={(keys: number[]) => updateFilter('dishCuisine', keys)}
            showSelection={true}
          />
        </div>
        <p className="text-sm">Étkezési kategória megjelölése</p>
        <MyDropdown
          list={dishType}
          selectedKeys={selectedFilters.dishType}
          onSelectionChange={(keys: number[]) => updateFilter('dishType', keys)}
        />
        <p className="text-sm">Ételérzékenység, speciális diéta megjelölése</p>
        <MyDropdown
          list={dietCategory}
          selectedKeys={selectedFilters.dietCategory}
          onSelectionChange={(keys: number[]) => updateFilter('dietCategory', keys)}
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Checkbox isSelected={acceptTerms} onValueChange={setAcceptTerms}>
          <div className="text-sm">
            Elfogadom, hogy a recept akkor kerül nyilvánosságra, ha a megjelölt kategóriáknak megfelel, és nem tartalmaz trágár kifejezéseket
          </div>
        </Checkbox>
        <Checkbox isSelected={addUserId} onValueChange={setAddUserId}>
          <div className="text-sm">
            Engedélyezem, hogy a felhasználónevem megjelenjen a receptben
          </div>
        </Checkbox>
        <div className="py-4 flex justify-center w-full space-x-4">
          <Button type="submit"><HeroCheck />Recept beküldése</Button>
          <Button type="button" onClick={handleCancel}><HeroCancel />Mégsem</Button>
        </div>
      </Form>
      <MySubmittedModal isOpen={isModalOpen}
        onOpenChange={(openState) => {
          setIsModalOpen(openState);
          if (!openState && !localStorage.getItem('token')) {
            router.replace('/profile')
          }
        }} />
    </div>
  );
}
