export interface Theme {
  primary: string;
  secondary: string;
  tertiary: string;
  quaternary: string;
  quinary: string;
  bgDefault: string;
  bgMain: string;
  bgError: string;
  bgDisabled: string;
  colorPrimary: string;
  colorSecondary: string;
  colorTertiary: string;
  colorLight: string;
}

export interface ThemeInfo {
  id: number;
  theme: Theme;
}

const themeCookieKey = "theme";
const defaultThemeId = 1;
export const defaultTheme = {
  primary: "76, 139, 245",
  secondary: "56, 192, 93",
  tertiary: "255, 182, 0",
  quaternary: "237, 237, 237",
  quinary: "253, 252, 255",
  bgDefault: "255, 255, 255",
  bgMain: "38, 50, 56",
  bgError: "234, 67, 53",
  bgDisabled: "38, 50, 56",
  colorPrimary: "255, 255, 255",
  colorSecondary: "0, 0, 0",
  colorTertiary: "172, 172, 172",
  colorLight: "38, 50, 56",
};

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

export const getCurrentThemeId = () => {
  const id = getCookie(themeCookieKey);
  return id ? parseInt(id) : defaultThemeId;
};

export const applyTheme = (theme: Theme) => {
  document.documentElement.style.setProperty("--primary", theme.primary);
  document.documentElement.style.setProperty("--secondary", theme.secondary);
  document.documentElement.style.setProperty("--tertiary", theme.tertiary);
  document.documentElement.style.setProperty("--quaternary", theme.quaternary);
  document.documentElement.style.setProperty("--quinary", theme.quinary);
  document.documentElement.style.setProperty("--default", theme.bgDefault);
  document.documentElement.style.setProperty("--main", theme.bgMain);
  document.documentElement.style.setProperty("--error", theme.bgError);
  document.documentElement.style.setProperty("--disabled", theme.bgDisabled);
  document.documentElement.style.setProperty("--c-primary", theme.colorPrimary);
  document.documentElement.style.setProperty(
    "--c-secondary",
    theme.colorSecondary
  );
  document.documentElement.style.setProperty(
    "--c-tertiary",
    theme.colorTertiary
  );
  document.documentElement.style.setProperty("--c-light", theme.colorLight);
};

export const setLocalTheme = (id?: number) => {
  if (!id) return;

  document.cookie = `${themeCookieKey}=${id}`;
};
