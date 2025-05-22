import { useCallback, useEffect, useState } from 'react'
import axios from 'axios';


// type Status = "idle" | "loading" | "error" | "success";

const useGetData = <T>(url: string | null = null) => {
	const [ data, setData ] = useState<T | null>(null); //null bc we haven't fetched a dog yet
	const [ isLoading, setIsLoading ] = useState(false);
	const [ error, setError ] = useState<string | null>(null); //error message
	// const [ isError, setIsError ] = useState(false); //if error exist
	// const isError = error != null;
	// const [status, setStatus] = useState<Status>("idle");



	//fetch the data
	const getData = useCallback(async (resource: string) => {
		//reset state
		setData(null);
		setError(null);
		// setStatus('loading');
		setIsLoading(true);
		// setIsError(false);


		//get the data from API

		try {
			const res = await axios.get<T>(resource);
			await new Promise(r => setTimeout(r, 1500))

			//update state with data
			setData(res.data);
			// setStatus('success');
		} catch (err) {
			console.error('useGetRandomImage threw an errro: ', err);
			setError(err instanceof Error ? err.message : 'Something went wrong');
			// setIsError(true);
			// setStatus('error');
		};

		//update state with data
		setIsLoading(false);
	}, []);

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
	}, [getData, url]); //if url does not change it will keep the same function, but if the url changes THEN the function runs again


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
		// isLoading: status === 'loading',
		refetch: refetch,
		error: error,
		isError: error !== null, //isError = if error actually exist (only exist if error state is = null)
		// isError: status === 'error',
	};
};

export default useGetData;
