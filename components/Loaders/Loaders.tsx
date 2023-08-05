import styles from "./Loaders.module.css";

export const LoadingRoller = () => {
  return (
    <div className={styles["lds-roller"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export const LoadingGrid = () => {
  return (
    <div className={styles["lds-grid"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export const LoadingEllipsis = () => {
  return (
    <div className={styles["lds-ellipsis"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
