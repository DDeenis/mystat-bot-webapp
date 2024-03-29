import React from "react";
import styles from "./Skeleton.module.css";
import clsx from "clsx";

interface SkeletonProps {
  width?: string;
  height?: string;
  rounding?: "none" | "sm" | "full";
  style?: React.CSSProperties;
}

export function SkeletonBlock(props: SkeletonProps) {
  const width = props.width ?? "100%";
  const height = props.height ?? "30px";

  return (
    <div
      style={{ width, height, ...(props.style ?? {}) }}
      className={clsx(styles.skeleton, {
        [styles.roundedSm]: props.rounding === "sm",
        [styles.roundedFull]: props.rounding === "full",
      })}
    />
  );
}
