import { useState } from "react";
import { ThemeContext } from "./ThemeContext";


//context provider
interface ThemeContextProviderProps {
	children: React.ReactNode;
};


const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {

	const [isDarkMode, setIsDarkMode] = useState(() => {
		// This will only be executed on the FIRST render when no state exist.
		// The return value will be used as the initial value for the state.

		console.log("Getting initialState for `isDarkMode` from localStorage `hn_darkmode`...");
		const localStorage_hn_darkmode = window.localStorage.getItem("hn_darkmode") || "true";

		return localStorage_hn_darkmode === "true";
	});

	const toggleTheme = () => {
		// set new state
		setIsDarkMode(!isDarkMode); // take the boolean state of isDarkMode and turn it to the other state --> toggle

		// save new value to localStorage
		// N.B! isDarkMode hasn't changed yet as React batches updating of states!
		console.log("Saving theme to localStorage");
		window.localStorage.setItem("hn_darkmode", String(!isDarkMode));
	};



	return (
		<ThemeContext.Provider value={{ isDarkMode: isDarkMode, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
};


export default ThemeContextProvider;

