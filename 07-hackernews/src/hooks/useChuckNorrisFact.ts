import { RandomJokeResponse } from "../types/ChuckNorrisAPI.types";
import useGetData from "./useGetData";

const useChuckNorrisFact = () => {
	return useGetData<RandomJokeResponse>("https://api.chucknorris.io/jokes/random");
};

export default useChuckNorrisFact;
