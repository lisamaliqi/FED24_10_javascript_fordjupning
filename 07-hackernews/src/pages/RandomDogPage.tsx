import Image from "react-bootstrap/Image";
import useGetRandomDogImage from "../hooks/useGetRandomDogImage";



const RandomDogPage = () => {

	//destructing
	const { data } = useGetRandomDogImage();

	return (
		<>
			<h1>A random little doggi🐶</h1>

			{!data && <p>fetching doggo...</p>}

			{data && data.status === 'success' && (
				<div>
					<Image src={data.message} alt='a random doggo' fluid/>
				</div>
			)}
		</>
	)
};

export default RandomDogPage;
