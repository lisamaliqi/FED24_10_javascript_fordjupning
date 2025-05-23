/**
 * Open Weather Map API
 *
 * <https://openweathermap.org/current>
 */

import { WeatherReport } from "./OWMAPI.types";

const API_KEY = import.meta.env.VITE_OWM_APIKEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const FAKE_SLOW_API = true;
const FAKE_SLOW_API_DELAY = 2000;

export const getCurrentWeather = async (city: string) => {
	// Query API for current weather conditions in `city`
	const response = await fetch(`${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`);

	// Check if we got an OK response
	if (!response.ok) {
		throw new Error(`${response.status} ${response.statusText}`); // 404 Not Found
	}

	// Convert response from JSON
	const data: WeatherReport = await response.json();

	// Fake slow API
	if (FAKE_SLOW_API) {
		await new Promise((r) => setTimeout(r, FAKE_SLOW_API_DELAY));
	}

	// Return current weather conditions
	return data;
};
