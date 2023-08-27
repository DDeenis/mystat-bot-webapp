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
        Произошла неожиданная ошибка. Свяжитесь с разработчиками через контакты
        в разделе &quot;Информация о сайте&quot;.
      </p>
      <p>
        Так же ошибка могла быть вызвана долгим ответом со стороны mystat, в
        таком случае можно попробовать перезагрузить страницу.
      </p>
      <button onClick={() => reset()}>Попробовать еще раз</button>
      <button onClick={() => push("/home")}>На главную</button>
    </div>
  );
}
