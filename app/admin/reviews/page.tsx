'use client'
import React, { useEffect, useState } from "react";
import { Ingredient, Recipe } from "@/types";
import { Spinner } from "@heroui/react";
import { title } from "@/components/primitives";
import { MyReviews } from "@/components/admin/card_reviews";


interface Review {
    ingredients: Ingredient[];
    recipe_description: string;
    recipe_headcount: number;
    recipe_id: number;
    recipe_time: number;
    recipe_name: string;
    source_user_id: number | null;
    source_username: string | null;
    status: string;
}
export default function AdminReviewsPage() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/admin/reviews', {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                setError('Failed to fetch reviews');
            }
            const data = await response.json();
            console.log("Fetched reviews:", data);
            setReviews(data);
        } catch (err) {
            setError('Failed to fetch reviews. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    if (loading) return (
        <div>
            <div className="flex justify-center items-center h-screen">
                <p>Betöltés...</p>
                <Spinner />
            </div>
        </div>);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <div className="inline-block max-w-xl text-center justify-center">
                <h1 className={title()}>Receptek felülvizsgálata</h1>
            </div>
            {reviews && reviews.length > 0 ? (
                <ul>
                    {reviews.map((review) => (
                        <MyReviews key={review.recipe_id} username={review.source_username}
                        recipe={{
                            recipe_name: review.recipe_name,
                            recipe_description: review.recipe_description,
                            ingredients: review.ingredients,
                            recipe_headcount: review.recipe_headcount,
                            recipe_id: review.recipe_id,
                            recipe_time: review.recipe_time,
                            source_user_id: review.source_user_id,
                        }} />
                    ))}
                </ul>
            ) : (
                <div className="py-4">
                    <p>Nincs elbírálandó recept</p>
                </div>
            )}
        </div>
    );
};
