'use client'
import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Card } from "@heroui/react";
import { MyReviews } from './card_reviews';
import { Ingredient } from '@/types';

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

interface MyReviewsTabsProps {
    reviews: Review[];
}

export const MyReviewsTabs: React.FC<MyReviewsTabsProps> = ({ reviews }) => {
    const [allReviews, setAllReviews] = useState<Review[]>(reviews);
    const pendingReviews = allReviews.filter((review) => review.status === 'pending');
    const approvedReviews = allReviews.filter((review) => review.status === 'approved');
    const rejectedReviews = allReviews.filter((review) => review.status === 'rejected');

    const handleStatusChange = (updatedReview: Review) => {
        setAllReviews((prevReviews) =>
            prevReviews.map((review) =>
                review.recipe_id === updatedReview.recipe_id
                    ? { ...review, status: updatedReview.status }
                    : review
            )
        );
    };


    return (
        <div className="flex w-full flex-col py-4">
            <Tabs aria-label="Receptek elbírálása" color='warning' radius='full' className='w-full'>
                <Tab key="pending" title="Elbírálatlan">
                    <Card>
                        {pendingReviews.length === 0 ? (
                            <p>Nincsenek elbírálásra váró receptek</p>
                        ) : (
                            pendingReviews.map((review) => (
                                <MyReviews key={review.recipe_id} review={review} handleStatusChange={handleStatusChange} />
                            ))
                        )}
                    </Card>
                </Tab>

                <Tab key="approved" title="Elfogadva">
                    <Card>
                        {approvedReviews.length === 0 ? (
                            <p>Nincsenek elfogadott receptek</p>
                        ) : (
                            approvedReviews.map((review) => (
                                <MyReviews key={review.recipe_id} review={review} handleStatusChange={handleStatusChange} />
                            ))
                        )}
                    </Card>
                </Tab>

                <Tab key="rejected" title="Elutasítva">
                    <Card>
                        {rejectedReviews.length === 0 ? (
                            <p>Nincsenek elutasított receptek</p>
                        ) : (
                            rejectedReviews.map((review) => (
                                <MyReviews key={review.recipe_id} review={review} handleStatusChange={handleStatusChange} />
                            ))
                        )}
                    </Card>
                </Tab>
            </Tabs>
        </div>
    );
};
