import { useCallback, useEffect, useState } from 'react'
import { RandomDogImage } from '../types/DogAPI.types';
import axios from 'axios';


const useGetRandomDogImage = (url: string | null = null) => {
	const [ data, setData ] = useState<RandomDogImage | null>(null); //null bc we haven't fetched a dog yet
	const [ isLoading, setIsLoading ] = useState(false);
	const [ error, setError ] = useState<string | null>(null); //error message
	// const [ isError, setIsError ] = useState(false); //if error exist
	// const isError = error != null;



	//fetch the data
	const getData = async (resource: string) => {
		//reset state
		setData(null);
		setError(null);
		setIsLoading(true);
		// setIsError(false);


		//get the data from API

		try {
			const res = await axios.get<RandomDogImage>(resource);
			await new Promise(r => setTimeout(r, 1500))

			//update state with data
			setData(res.data);
		} catch (err) {
			console.error('useGetRandomImage threw an errro: ', err);
			setError(err instanceof Error ? err.message : 'Something went wrong');
			// setIsError(true);
		};

		//update state with data
		setIsLoading(false);
	};

	/* const refetch = () => {
		if (!url) {
			return;
		};

		getData(url);
	}; */

	//useCallback hook version of the function over
	const refetch = useCallback(() => {
		if (!url) {
			return;
		};

		getData(url);
	}, [url]); //if url does not change it will keep the same function, but if the url changes THEN the function runs again


	/* useEffect(() => {
		if (!url) {
			return;
		};

		getData(url);
	}, [url]); */

	useEffect(() => {
		refetch();
	}, [refetch]);


	return {
		data: data,
		isLoading: isLoading,
		refetch: refetch,
		error: error,
		isError: error !== null, //isError = if error actually exist (only exist if error state is = null)
	};
};

export default useGetRandomDogImage;
