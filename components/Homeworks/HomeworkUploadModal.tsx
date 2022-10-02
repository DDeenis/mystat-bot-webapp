import clsx from "clsx";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./HomeworkUploadModal.module.css";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (text: string) => void;
};

export const HomeworkUploadModal = ({ isOpen, onClose, onConfirm }: Props) => {
  const [answer, setAnswer] = useState<string>();

  const confirm = () => {
    if (answer) {
      onConfirm(answer);
      onClose();
    }
  };
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setAnswer(e.target.value);

  return isOpen ? (
    <div className={styles.container}>
      <button className={styles.closeBtn} onClick={onClose} />
      <h3 className={styles.title}>Введите текст</h3>
      <textarea onChange={onChange} className={styles.textarea} />
      <div className={styles.buttonsGroup}>
        <button className={clsx(styles.btn, styles.btnSend)} onClick={confirm}>
          Отправить
        </button>
        <button
          className={clsx(styles.btn, styles.btnCancel)}
          onClick={onClose}
        >
          Отмена
        </button>
      </div>
    </div>
  ) : null;
};
