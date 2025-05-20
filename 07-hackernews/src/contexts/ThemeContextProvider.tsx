import { createContext, useState } from "react";


interface ThemeContextType {
	// theme: 'dark' | 'light',
	isDarkMode: boolean,
	toggleTheme: () => void,
};


//this creates the actual context and sets the contexts default/initial value to dark mode
export const ThemeContext = createContext<ThemeContextType | null>(null);


//context provider
interface ThemeContextProviderProps {
	children: React.ReactNode;
};


const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {

	const [ isDarkMode, setIsDarkMode ] = useState(true);

	const toggleTheme = () => {
		setIsDarkMode(!isDarkMode); // take the boolean state of isDarkMode and turn it to the other state --> toggle
	};



	return (
		<ThemeContext.Provider value={{ isDarkMode: isDarkMode, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
};


export default ThemeContextProvider;

