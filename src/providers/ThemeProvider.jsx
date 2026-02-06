import React, { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({children}) {

    const[darkMode, setDarkMode] = useState(false);
    const handleToggle = () => {
        setDarkMode(!darkMode)
    }

  return (
    <ThemeContext.Provider value={{darkMode, handleToggle}}>
        {children}
    </ThemeContext.Provider>
  )
}

export function useThemeContext(){
    return useContext(ThemeContext);
}


