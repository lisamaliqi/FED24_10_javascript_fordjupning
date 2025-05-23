import { useState } from "react";

/**
 * useLocalStorage("hn_darkmode", true)
 */
const useLocalStorage = <T>(key: string, defaultValue: T) => {
	const [storedValue, setStoredValue] = useState<T>(() => {
		// get inital state value from localStorage
		const value = window.localStorage.getItem(key);

		return value !== null
			? JSON.parse(value)
			: defaultValue;
	});

	const setValue = (newValue: T) => {
		// set new state
		setStoredValue(newValue);

		// save value to localStorage
		window.localStorage.setItem(key, JSON.stringify(newValue));
	}

	return [
		storedValue,
		setValue,
	] as const;
};

export default useLocalStorage;
