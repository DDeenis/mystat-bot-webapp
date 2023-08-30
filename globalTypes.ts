declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string;
        initDataUnsafe: any;
      };
      Utils: {
        urlParseQueryString: (value: string) => any;
      };
    };
  }
}

window.Telegram = window.Telegram || {};

export {};
