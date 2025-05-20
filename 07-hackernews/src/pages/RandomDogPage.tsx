import { useEffect, useState } from "react";
import { RandomDogImage } from "../types/DogAPI.types";
import Image from "react-bootstrap/Image";
import axios from 'axios';



const RandomDogPage = () => {

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


	return (
		<>
			<h1>A random little doggi🐶</h1>

			{!data && <p>fetching doggo...</p>}

			{data && data.status === 'success' && (
				<div>
					<Image src={data.message} alt='a random doggo' fluid/>
				</div>
			)}

			image!
		</>
	)
};

export default RandomDogPage;
