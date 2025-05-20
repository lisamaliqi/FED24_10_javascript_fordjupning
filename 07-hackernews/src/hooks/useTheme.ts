import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const useTheme = () => {
	const themeContext = useContext(ThemeContext);

	if (!themeContext) {
		throw new Error("Trying to use ThemeContext outside of its provider, SRSLY?!!111");
	};

	return themeContext;
};

export default useTheme;
