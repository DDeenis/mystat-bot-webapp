"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const { push } = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Ошибка</h2>
      <p>
        Произошла неожиданная ошибка. Свяжитесь с разработчиками черз контакты в
        разделе &quot;Информация о сайте&quot;.
      </p>
      <button onClick={() => reset()}>Попробовать еще раз</button>
      <button onClick={() => push("/homw")}>На главную</button>
    </div>
  );
}
