'use client'
import React, { useEffect, useState } from "react";
import { Ingredient, Recipe } from "@/types";
import { Spinner } from "@heroui/react";
import { title } from "@/components/primitives";
import { MyReviews } from "@/components/admin/card_reviews";
import { MyReviewsTabs } from "@/components/admin/tabs_reviews";


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
    dishtype_name: string[];
    cuisine_name: string[];
    category_name: string[];
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
            const formattedData = data.map((review: any) => ({
                ...review,
                dishtype_name: Array.isArray(review.dishtype_name) ? review.dishtype_name : [],
                cuisine_name: Array.isArray(review.cuisine_name) ? review.cuisine_name : [],
                category_name: Array.isArray(review.category_name) ? review.category_name : [],
            }));
            setReviews(formattedData);
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
            <MyReviewsTabs reviews={reviews}/>
        </div>
    );
};
