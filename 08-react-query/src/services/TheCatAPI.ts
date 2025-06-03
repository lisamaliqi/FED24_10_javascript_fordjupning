/**
 * API Client for The Cat API
 *
 * Docs: https://docs.thecatapi.com/
 * API: https://api.thecatapi.com/v1/
 */
import axios from "axios";
import type { CatImage } from "./TheCatAPI.types";

const API_KEY = import.meta.env.VITE_CATAPI_KEY;
const FAKE_DELAY = 1500;

// Create a new axios instance
const instance = axios.create({
	baseURL: "https://api.thecatapi.com/v1",
	timeout: 10000,
	headers: {
		"Accept": "application/json",
		"x-api-key": API_KEY,
	},
});

/**
 * Execute a HTTP GET request to an endpoint
 *
 * @param endpoint Endpoint to GET
 */
const get = async <T>(endpoint: string) => {
	if (!API_KEY) {
		throw new Error("VITE_CATAPI_KEY missing in environment");
	}

	const res = await instance.get<T>(endpoint);

	// Fake slow API if FAKE_DELAY is truthy
	if (FAKE_DELAY) {
		await new Promise(r => setTimeout(r, FAKE_DELAY));
	}

	return res.data;
};



/**
 * Get a random cat image
 *
 * @param breed _(optional)_ Breed ID to get
 */
export const getRandomCatImage = async (breed_id = "") => { //default breed_id = empty string
	const data = await get<CatImage[]>("/images/search?breed_ids=" + breed_id);
	return data[0];
};
