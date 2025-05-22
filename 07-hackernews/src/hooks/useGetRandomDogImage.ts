import { RandomDogImage } from '../types/DogAPI.types';
import useGetData from './useGetData';


const useGetRandomDogImage = (url: string | null = null) => {
	//moved everything from here to useGetData and make it reusable
	return useGetData<RandomDogImage>(url);
};

export default useGetRandomDogImage;
