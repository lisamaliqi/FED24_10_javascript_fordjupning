import { createContext, useState } from "react";


interface ThemeContextType {
	theme: 'dark' | 'light',
};


//this creates the actual context and sets the contexts default/initial value to dark mode
export const ThemeContext = createContext<ThemeContextType>({ theme: 'dark' });


//context provider
interface ThemeContextProviderProps {
	children: React.ReactNode;
};


const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {

	const [ theme, setTheme ] = useState<ThemeContextType['theme']>('dark');



	return (
		<ThemeContext.Provider value={{ theme: theme }}>
			{children}
		</ThemeContext.Provider>
	)
};


export default ThemeContextProvider;

