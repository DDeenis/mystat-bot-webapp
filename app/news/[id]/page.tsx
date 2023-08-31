import React from "react";
import { NewsDetails } from "../../../components/NewsPage/NewsDetails";
import { getNewsDetails } from "../../../server/actions";

export const revalidate = false;

export default async function NewsDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const newsId = id as string;
  const newsData = await getNewsDetails(parseInt(newsId));

  return (
    <>
      {newsData ? (
        <NewsDetails news={newsData} />
      ) : (
        <div>Не удалось загрузить новость &quot;{id}&quot;</div>
      )}
    </>
  );
}
