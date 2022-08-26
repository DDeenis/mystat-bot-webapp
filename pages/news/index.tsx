import { NextPage } from "next";
import React from "react";
import { BackButton } from "../../components/BackButton/BackButton";
import { NewsList } from "../../components/NewsPage/NewsList";
import { trpc } from "../../utils/trpc";

const AllNewsPage: NextPage = () => {
  const { data } = trpc.useQuery(["mystat.allNews"]);

  return (
    <>
      <BackButton />
      {data?.success && <NewsList news={data.data} />}
    </>
  );
};

export default AllNewsPage;
