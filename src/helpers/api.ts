import { writable } from "svelte/store";

export const useFetch = <T = any>(url: string) => {
  const isLoading = writable(false);
  const isError = writable(false);
  const data = writable<T | undefined>();

  isLoading.set(true);
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      isLoading.set(false);
      isError.set(false);
      data.set(res);
    })
    .catch(() => {
      isLoading.set(false);
      isError.set(true);
    });

  return {
    isLoading,
    isError,
    data,
  };
};
