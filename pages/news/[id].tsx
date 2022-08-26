import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { BackButton } from "../../components/BackButton/BackButton";
import { NewsDetails } from "../../components/NewsPage/NewsDetails";
import { trpc } from "../../utils/trpc";

const NewsDetailsPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const newsId = id as string;
  const { data } = trpc.useQuery(["mystat.newsDetails", { id: newsId }]);

  return (
    <>
      <BackButton />
      {data?.success && <NewsDetails news={data.data} />}
    </>
  );
};

export default NewsDetailsPage;
