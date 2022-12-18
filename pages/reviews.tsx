import { NextPage } from "next";
import React from "react";
import { BackButton } from "../components/BackButton/BackButton";
import { EmptyState, LoadingState } from "../components/PageStates/PageStates";
import { ReviewsList } from "../components/Reviews/ReviewsList";
import { trpc } from "../utils/trpc";

const ReviewsPage: NextPage = () => {
  const { data, isLoading } = trpc.mystat.reviews.useQuery();

  return (
    <>
      <BackButton />
      <LoadingState visible={isLoading} />
      <EmptyState visible={!data?.data && !isLoading}>Нет отзывов</EmptyState>
      {data?.success && <ReviewsList reviews={data.data} />}
    </>
  );
};

export default ReviewsPage;
