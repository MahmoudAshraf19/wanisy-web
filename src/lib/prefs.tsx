import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { dict, type Lang } from "./i18n";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (typeof dict)["en"];
  theme: "light" | "dark";
  toggleTheme: () => void;
};

const PrefsContext = createContext<Ctx | null>(null);

export const prefsBootScript = `(function(){try{var t=localStorage.getItem('waneesi-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}if(t==='dark')document.documentElement.classList.add('dark');var l=localStorage.getItem('waneesi-lang')||'en';document.documentElement.lang=l;document.documentElement.dir=l==='ar'?'rtl':'ltr'}catch(e){}})();`;

export function PrefsProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const l = localStorage.getItem("waneesi-lang");
    if (l === "ar" || l === "en") setLangState(l);
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("waneesi-lang", l);
  };
  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("waneesi-theme", next);
  };

  return (
    <PrefsContext.Provider value={{ lang, setLang, t: dict[lang], theme, toggleTheme }}>
      {children}
    </PrefsContext.Provider>
  );
}

export function usePrefs() {
  const c = useContext(PrefsContext);
  if (!c) throw new Error("usePrefs outside provider");
  return c;
}
