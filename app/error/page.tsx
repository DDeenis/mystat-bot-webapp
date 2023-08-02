import React from "react";

export default async function LoginError() {
  return (
    <div>
      <p>
        Не удалось выполнить вход. Убедитесь что вы выполнили вход в боте.
        <br />
        Другие возможные решения:
      </p>
      <ul>
        <li>Попробовать еще раз через пару минут</li>
      </ul>
      <p>
        Если ошибка продолжает повторяться, смотрите раздел &quot;О боте&quot;
      </p>
    </div>
  );
}
