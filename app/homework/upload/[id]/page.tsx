"use client";
import clsx from "clsx";
import styles from "../../../../components/Homeworks/HomeworkUploadModal.module.css";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UploadHomeworkPage({
  params,
}: {
  params: { id: string };
}) {
  const [answer, setAnswer] = React.useState<string>();
  const [file, setFile] = React.useState<File>();
  const { back } = useRouter();

  const uploadHomework = (obj: {
    id: string;
    answerText?: string;
    file?: File;
  }) => {
    const formData = new FormData();
    formData.append("id", obj.id);
    obj.answerText && formData.append("answerText", obj.answerText);
    obj.file && formData.append("file", obj.file);

    return fetch("/api/homework", {
      body: formData,
      method: "POST",
    });
  };

  const confirm = () => {
    if (answer || file) {
      uploadHomework({ id: params.id, answerText: answer, file }).then((r) => {
        if (r.ok) {
          back();
        }
      });
    }
  };

  const onAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setAnswer(e.target.value);
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFile(e.target.files?.[0]);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Введите текст</h3>
      <textarea onChange={onAnswerChange} className={styles.textarea} />
      <input type="file" className={styles.fileInput} onChange={onFileChange} />
      <div className={styles.buttonsGroup}>
        <button className={clsx(styles.btn, styles.btnSend)} onClick={confirm}>
          Отправить
        </button>
        <Link className={clsx(styles.btn, styles.btnCancel)} href="/homework">
          Отмена
        </Link>
      </div>
    </div>
  );
}
