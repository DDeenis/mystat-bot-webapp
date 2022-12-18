import { NextPage } from "next";
import React from "react";
import { BackButton } from "../../components/BackButton/BackButton";
import { NewsList } from "../../components/NewsPage/NewsList";
import { trpc } from "../../utils/trpc";

const AllNewsPage: NextPage = () => {
  const { data, isLoading } = trpc.mystat.allNews.useQuery();

  return (
    <>
      <BackButton />
      <NewsList news={data?.data} isLoading={isLoading} />
    </>
  );
};

export default AllNewsPage;
