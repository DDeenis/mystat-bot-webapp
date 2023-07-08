import { createClient } from "mystat-api";
import { supabase } from "./database";

type ApiClient = Awaited<ReturnType<typeof createClient>>;

export const getPersistedClient = async (chatId: number) => {
  const res = await supabase
    .from("appStore")
    .select("data")
    .eq("chatId", chatId);
  const data = res.data?.[0]?.data as string | undefined;

  if (!data) return;

  const clientData = JSON.parse(data);

  if (Date.now() >= clientData.tokenExpiresAt) return;

  const apiClient = await createClient(clientData);

  return apiClient;
};

export const persistClient = async (
  chatId: number,
  clientData: ApiClient["clientData"]
) => {
  const res = await supabase.from("appStore").upsert({
    chatId,
    data: clientData,
  });

  if (res.error) console.error(res.error);
};
