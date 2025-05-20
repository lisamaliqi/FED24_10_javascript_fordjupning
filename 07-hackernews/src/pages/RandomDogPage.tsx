import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import useGetRandomDogImage from "../hooks/useGetRandomDogImage";
import { useState } from "react";



const RandomDogPage = () => {
	const [ url, setUrl] = useState<string | null>('https://dog.ceo/api/breeds/image/random');
	//destructing
	const { data, isLoading } = useGetRandomDogImage(url);

	return (
		<>
			<h1>A random little doggi🐶</h1>

			<div className="mb-3">
				<Button
					onClick={() => setUrl('https://dog.ceo/api/breeds/image/random')}
				>Random Doggo</Button>
				<Button
					onClick={() => setUrl('https://dog.ceo/api/breed/mix/images/random')}
				>Random Mix doggo</Button>
			</div>

			{isLoading && <p>fetching doggo...</p>}

			{data && data.status === 'success' && (
				<div>
					<Image src={data.message} alt='a random doggo' fluid/>
				</div>
			)}
		</>
	)
};

export default RandomDogPage;
