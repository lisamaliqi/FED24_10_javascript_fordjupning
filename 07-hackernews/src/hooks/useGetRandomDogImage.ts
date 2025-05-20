import { useEffect, useState } from 'react'
import { RandomDogImage } from '../types/DogAPI.types';
import axios from 'axios';


const useGetRandomDogImage = () => {
	const [ data, setData ] = useState<RandomDogImage | null>(null); //null bc we haven't fetched a dog yet

	//fetch the data
	const getData = async () => {
		//get the data from API
		const res = await axios.get<RandomDogImage>('https://dog.ceo/api/breeds/image/random');
		await new Promise(r => setTimeout(r, 1500))

		//update state with data
		setData(res.data);
	};


	useEffect(() => {
		getData();
	}, []);


	return {
		data: data,
	};
};

export default useGetRandomDogImage;
