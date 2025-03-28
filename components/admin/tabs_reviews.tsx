'use client'
import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Card, CardBody } from "@heroui/react";
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
        <div className="flex flex-col py-6 justify-center w-full">
            <Tabs aria-label="Receptek elbírálása" color='primary' radius='full' className='flex w-full flex-col'>
                <Tab key="pending" title="Elbírálatlan">
                    <Card>
                        <CardBody>
                            {pendingReviews.length === 0 ? (
                                <div className='py-4 px-2'>
                                    <Card>
                                        <CardBody>
                                            <p className='py-6'>Nincsenek elbírálásra váró receptek</p>
                                        </CardBody>
                                    </Card>
                                </div>
                            ) : (
                                pendingReviews.map((review) => (
                                    <MyReviews key={review.recipe_id} review={review} handleStatusChange={handleStatusChange} />
                                ))
                            )}
                        </CardBody>
                    </Card>
                </Tab>

                <Tab key="approved" title="Elfogadva">
                    <Card>
                        <CardBody>
                            {approvedReviews.length === 0 ? (
                                <div className='py-4 px-2'>
                                    <Card>
                                        <CardBody>
                                            <p className='py-6'>Nincsenek elfogadott receptek</p>
                                        </CardBody>
                                    </Card>
                                </div>
                            ) : (
                                approvedReviews.map((review) => (
                                    <MyReviews key={review.recipe_id} review={review} handleStatusChange={handleStatusChange} />
                                ))
                            )}
                        </CardBody>
                    </Card>
                </Tab>

                <Tab key="rejected" title="Elutasítva">
                    <Card>
                        <CardBody>
                            {rejectedReviews.length === 0 ? (
                                <div className='py-4 px-2'>
                                    <Card>
                                        <CardBody>
                                            <p className='py-6'>Nincsenek elutasított receptek</p>
                                        </CardBody>
                                    </Card>
                                </div>
                            ) : (
                                rejectedReviews.map((review) => (
                                    <MyReviews key={review.recipe_id} review={review} handleStatusChange={handleStatusChange} />
                                ))
                            )}
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </div>
    );
};
