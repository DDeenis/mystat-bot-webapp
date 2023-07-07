import { NextPage } from "next";
import React from "react";
import { BackButton } from "../../components/BackButton/BackButton";
import { EmptyState } from "../../components/PageStates/PageStates";
import { ReviewsList } from "../../components/Reviews/ReviewsList";
import { getReviews } from "../../server/actions";

export default async function ReviewsPage() {
  const reviews = await getReviews();
  const reviewsData = reviews ?? [];
  // From newer reviews to older
  reviewsData.reverse();

  return (
    <>
      <BackButton />
      <EmptyState visible={reviewsData.length === 0}>Нет отзывов</EmptyState>
      {reviews && <ReviewsList reviews={reviewsData} />}
    </>
  );
}
