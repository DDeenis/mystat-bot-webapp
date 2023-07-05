"use client";
import clsx from "clsx";
import React from "react";
import styles from "./Multiselect.module.css";

interface Variant<T> {
  title: string;
  value: T;
}

type Props<TValue> = {
  variants: Variant<TValue>[];
  selectedVariant?: TValue;
  onSelect: (selectedVariant: TValue) => void;
  variantsAsTabs?: boolean;
};

export function Multiselect<TValue>({
  variants,
  selectedVariant,
  onSelect,
  variantsAsTabs,
}: Props<TValue>) {
  const createOnClick = (variant: TValue) => () => onSelect(variant);

  return (
    <div
      className={clsx(styles.container, {
        [styles.container_withTabs]: variantsAsTabs,
      })}
    >
      {variants.map((variant) => (
        <div
          className={clsx(styles.variant, {
            [styles.variant__selected]: variant.value === selectedVariant,
            [styles.variant__asTabs]: variantsAsTabs,
          })}
          onClick={createOnClick(variant.value)}
          key={variant.title}
        >
          {variant.title}
        </div>
      ))}
    </div>
  );
}
