import { useState } from "react";
import { ThemeContext } from "./ThemeContext";


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

