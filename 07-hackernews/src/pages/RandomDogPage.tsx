import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import useGetRandomDogImage from "../hooks/useGetRandomDogImage";



const RandomDogPage = () => {
	//new state that lets the user send in just name of the breed
	// const [breed, setBreed] = useState<string | undefined>(undefined);
	// const { data, error, isError, isLoading, refetch } = useGetRandomDogImage(breed);

	//destructing
	const { data, error, getImage, isError, isLoading, refetch } = useGetRandomDogImage();

	return (
		<>
			<h1>A random little doggi🐶</h1>

			<div className="mb-3">
				<Button
					onClick={() => getImage(undefined)}
				>Random Doggo</Button>

				<Button className="ms-1"
					onClick={() => getImage('labrador')}
				>Random labrador doggo</Button>

				<Button className="ms-1"
					onClick={() => getImage('corgi')}
				>Random corgi doggo</Button>

				<Button className="ms-1"
					onClick={() => refetch()}
				>More doggos!!!</Button>

				<Button
					className="ms-1"
					variant="warning"
					onClick={() => getImage('lolcats')}
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
