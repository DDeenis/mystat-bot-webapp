import clsx from "clsx";
import React from "react";
import styles from "./Multiselect.module.css";

type Props = {
  variants: string[];
  selectedVariant?: string;
  onSelect: (selectedVariant: string) => void;
};

export const Multiselect = ({ variants, selectedVariant, onSelect }: Props) => {
  const createOnClick = (variant: string) => () => onSelect(variant);

  return (
    <div className={styles.container}>
      {variants.map((variant) => (
        <div
          className={clsx(styles.variant, {
            [styles.variant__selected]: variant === selectedVariant,
          })}
          onClick={createOnClick(variant)}
          key={variant}
        >
          {variant}
        </div>
      ))}
    </div>
  );
};
