import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { BackButton } from "../../components/BackButton/BackButton";
import { NewsDetails } from "../../components/NewsPage/NewsDetails";
import { LoadingState } from "../../components/PageStates/PageStates";
import { trpc } from "../../utils/trpc";

const NewsDetailsPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const newsId = id as string;
  const { data, isLoading } = trpc.mystat.newsDetails.useQuery({
    id: parseInt(newsId),
  });

  return (
    <>
      <BackButton />
      <LoadingState visible={isLoading} />
      {data?.success && <NewsDetails news={data.data} />}
    </>
  );
};

export default NewsDetailsPage;
