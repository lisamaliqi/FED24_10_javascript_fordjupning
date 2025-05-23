import { RandomDogImage } from '../types/DogAPI.types';
import useGetData from './useGetData';


/**
 * Dog API URLs
 *
 * Random breed: https://dog.ceo/api/breeds/image/random
 * Specific breed: https://dog.ceo/api/breed/{BREED}/images/random
 */


const useGetRandomDogImage = (breed?: string) => {
	const url = breed
		? `https://dog.ceo/api/breed/${breed}/images/random` //get the specific breed if a breed is chosen
		: "https://dog.ceo/api/breeds/image/random"; //otherwise, get any random breed
	//moved everything from here to useGetData and make it reusable
	return useGetData<RandomDogImage>(url);
};

export default useGetRandomDogImage;
