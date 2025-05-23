import { useState } from 'react';
import { RandomDogImage } from '../types/DogAPI.types';
import useGetData from './useGetData';


/**
 * Dog API URLs
 *
 * Random breed: https://dog.ceo/api/breeds/image/random
 * Specific breed: https://dog.ceo/api/breed/{BREED}/images/random
 */


//function im calling for in this file
const getImageUrl = (breed?: string) => {
	return breed
		? `https://dog.ceo/api/breed/${breed}/images/random` //get the specific breed if a breed is chosen
		: "https://dog.ceo/api/breeds/image/random"; //otherwise, get any random breed
	//moved everything from here to useGetData and make it reusable
	// return useGetData<RandomDogImage>(url);
};


//the function im calling for in other files
const useGetRandomDogImage = (breed?: string) => {
	//based on the breed i search for, set that url as the return from getImageUrl function
	const [url, setUrl] = useState(getImageUrl(breed));

	const getImage = (breed?: string) => {
		setUrl(getImageUrl(breed));
	};

	const query = useGetData<RandomDogImage>(url);

	return {
		getImage,
		...query,
	}
}

export default useGetRandomDogImage;
