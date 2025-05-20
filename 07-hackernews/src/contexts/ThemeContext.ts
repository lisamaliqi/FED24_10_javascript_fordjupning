import { createContext } from "react";



interface ThemeContextType {
	// theme: 'dark' | 'light',
	isDarkMode: boolean,
	toggleTheme: () => void,
};


//this creates the actual context and sets the contexts default/initial value to dark mode
export const ThemeContext = createContext<ThemeContextType | null>(null);
