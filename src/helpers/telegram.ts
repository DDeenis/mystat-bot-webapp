// @ts-ignore
const tg = window.Telegram.WebApp;

export const expand = () => tg.expand();
export const setButtonText = (text: string) => (tg.MainButton.text = text);

// tg.MainButton.setText("Changed Text1");
// tg.MainButton.textColor = "#F55353";
// tg.MainButton.color = "#143F6B";
// tg.MainButton.setParams({ color: "#143F6B" });
