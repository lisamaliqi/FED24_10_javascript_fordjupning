/**
 * Hacker News API service
 *
 * <https://hn.algolia.com/api>
 */

import axios from "axios";
import { HN_SearchResponse } from "./HackerNewsAPI.Types";

const BASE_URL = "https://hn.algolia.com/api/v1";

/**
 * Search Hacker News Stories (relevance)
 *
 * @param query Query to search for
 * @param page Page of search results to get
 */
export const search = async (query: string, page = 0) => {
	// https://hn.algolia.com/api/v1/search?query=tesla&tags=story&page=0
	const res = await axios.get<HN_SearchResponse>(BASE_URL + `/search?query=${query}&tags=story&page=${page}`);
	return res.data;
};



/**
 * Search Hacker News Stories by date (date)
 *
 * @param query Query to search for
 * @param page Page of search results to get
 */
export const searchByDate = async (query: string, page = 0) => {
	// https://hn.algolia.com/api/v1/search?query=tesla&tags=story&page=0
	const res = await axios.get<HN_SearchResponse>(BASE_URL + `/search_by_date?query=${query}&tags=story&page=${page}`);
	return res.data;
};



