import { NextPage } from "next";
import React from "react";

const LoginError: NextPage = () => {
  return (
    <div>
      <p>
        Не удалось выполнить вход. Убедитесь что вы выполнили вход в боте.
        <br />
        Другие возможные решения:
      </p>
      <ul>
        <li>Попробовать еще раз через пару минут</li>
        <li>Не использовать web версию telegram</li>
      </ul>
      <p>
        Если ошибка продолжает повторятся, смотрите раздел &quot;О боте&quot;
      </p>
    </div>
  );
};

export default LoginError;
