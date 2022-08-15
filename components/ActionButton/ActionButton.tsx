import clsx from "clsx";
import React from "react";

type Props = {
  path: string;
  isDanger: boolean;
  onClick: () => void;
};

export const ActionButton = ({ path, isDanger, onClick }: Props) => {
  return (
    <a href={path}>
      <button
        className={clsx("button", {
          "button-danger": isDanger,
        })}
        onClick={onClick}
      >
        <slot />
      </button>
    </a>
  );
};
