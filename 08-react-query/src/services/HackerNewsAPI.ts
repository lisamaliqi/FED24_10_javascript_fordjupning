/**
 * Hacker News API service
 *
 * <https://hn.algolia.com/api>
 */

import axios from "axios";
import type { HN_SearchResponse } from "./HackerNews.types";


const instance = axios.create({
	baseURL: "https://hn.algolia.com/api/v1",
	timeout: 10000,
	headers: {
		"Accept": "application/json",
		"Content-Type": "application/json",
	},
});

/**
 * Execute a HTTP GET request to an endpoint
 *
 * @param endpoint Endpoint to GET
 */
const get = async <T>(endpoint: string) => {
	const res = await instance.get<T>(endpoint);
	return res.data;
}

/**
 * Search Hacker News Stories
 *
 * @param query Query to search for
 * @param page Page of search results to get
 */
export const search = (query: string, page = 0) => {
	return get<HN_SearchResponse>(`/search?query=${query}&tags=story&page=${page}`);
}

/**
 * Search Hacker News Stories by date
 *
 * @param query Query to search for
 * @param page Page of search results to get
 */
export const searchByDate = async (query: string, page = 0) => {
	return get<HN_SearchResponse>(`/search_by_date?query=${query}&tags=story&page=${page}`);
}
