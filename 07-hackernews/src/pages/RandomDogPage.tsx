import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import useGetRandomDogImage from "../hooks/useGetRandomDogImage";
import { useState } from "react";



const RandomDogPage = () => {
	const [ url, setUrl] = useState<string | null>('https://dog.ceo/api/breeds/image/random');
	//destructing
	const { data, isLoading, refetch, error } = useGetRandomDogImage(url);

	return (
		<>
			<h1>A random little doggi🐶</h1>

			<div className="mb-3">
				<Button
					onClick={() => setUrl('https://dog.ceo/api/breeds/image/random')}
				>Random Doggo</Button>

				<Button className="ms-1"
					onClick={() => setUrl('https://dog.ceo/api/breed/labrador/images/random')}
				>Random labrador doggo</Button>

				<Button className="ms-1"
					onClick={() => refetch()}
				>More doggos!!!</Button>

				<Button
					className="ms-1"
					variant="warning"
					onClick={() => setUrl("https://dog.ceo/api/breed/lolcat/images/random")}
				>Make things go 💣</Button>

				<Button
					className="ms-1"
					variant="warning"
					onClick={() => setUrl("https://oprmtvpnpycdurgmobvmcrd.com")}
				>Break stuff 💣</Button>
			</div>

			{error && <Alert variant="warning">{error}</Alert>}

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
