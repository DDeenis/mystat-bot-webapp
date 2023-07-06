import React from "react";
import { NewsDetails } from "../../../components/NewsPage/NewsDetails";
import { getNewsDetails } from "../../../utils/actions";

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
      {newsData?.success ? (
        <NewsDetails news={newsData.data} />
      ) : (
        <div>Не удалось загрузить новость &quot;{id}&quot;</div>
      )}
    </>
  );
}
