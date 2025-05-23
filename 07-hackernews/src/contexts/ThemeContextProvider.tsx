import { ThemeContext } from "./ThemeContext";
import useLocalStorage from "../hooks/useLocalStorage";


//context provider
interface ThemeContextProviderProps {
	children: React.ReactNode;
};


const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {

	const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>("hn_darkmode", true);

	const toggleTheme = () => {
		// set new state
		setIsDarkMode(!isDarkMode); // take the boolean state of isDarkMode and turn it to the other state --> toggle
	};



	return (
		<ThemeContext.Provider value={{ isDarkMode: isDarkMode, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
};


export default ThemeContextProvider;

