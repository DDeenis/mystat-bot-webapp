import React from "react";
import { NewsList } from "../../components/NewsPage/NewsList";
import { getAllNews } from "../../server/actions";

export const revalidate = false;

export default async function AllNewsPage() {
  const news = await getAllNews();

  return <NewsList news={news ?? []} />;
}
