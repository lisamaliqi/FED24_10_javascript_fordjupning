import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import useGetRandomDogImage from "../hooks/useGetRandomDogImage";
import { useState } from "react";



const RandomDogPage = () => {
	//new state that lets the user send in just name of the breed
	const [breed, setBreed] = useState<string | undefined>(undefined);
	//destructing
	const { data, error, isError, isLoading, refetch } = useGetRandomDogImage(breed);

	return (
		<>
			<h1>A random little doggi🐶</h1>

			<div className="mb-3">
				<Button
					onClick={() => setBreed(undefined)}
				>Random Doggo</Button>

				<Button className="ms-1"
					onClick={() => setBreed('labrador')}
				>Random labrador doggo</Button>

				<Button className="ms-1"
					onClick={() => setBreed('corgi')}
				>Random corgi doggo</Button>

				<Button className="ms-1"
					onClick={() => refetch()}
				>More doggos!!!</Button>

				<Button
					className="ms-1"
					variant="warning"
					onClick={() => setBreed('lolcats')}
				>Lolcats (break) 💣</Button>
			</div>

			{isError && (
				<Alert variant="warning">
					<Alert.Heading>Error</Alert.Heading>
					{error}
				</Alert>
			)}

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
