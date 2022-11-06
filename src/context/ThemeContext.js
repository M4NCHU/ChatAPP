import { createContext, useEffect, useState } from 'react'

const getInitialTheme = () => {
    // check if is set local storage 
  if (typeof window !== 'undefined' && window.localStorage) {
    // get item current-theme from local storage
    const storedPref = window.localStorage.getItem("current-theme")
    if (typeof storedPref === "string") {
        return storedPref
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches)  {
        return "dark";
    }
  }
  return "light";
};

// create theme context
export const ThemeContext = createContext();

export const ThemeProvider = ({initialTheme, children}) => {
    const [Theme, setTheme] = useState(getInitialTheme);

    const checkTheme = (existing) => {
        const root = window.document.documentElement;
        const isDark = existing === "dark";
        // check actual theme
        root.classList.remove(isDark ? "light" : "dark")
        root.classList.add(existing)
        // set local storage info about theme
        localStorage.setItem("current-theme", existing)
    }

    if (initialTheme) {
        checkTheme(initialTheme)
    }

    useEffect(() => {
      checkTheme(Theme)
    }, [Theme])
    
    return (
        <ThemeContext.Provider value={{Theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}


