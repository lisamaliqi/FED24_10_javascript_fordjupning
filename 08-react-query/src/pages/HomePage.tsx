/* import { getRandomDadJoke } from "../services/DadJokeAPI";
import { useQuery } from "@tanstack/react-query"; */

const HomePage = () => {
/*
	//this demonstrates that the joke inside dadjoke page is the same as this joke, it doesn't refetch all the time
	const { data } = useQuery({
		queryKey: ["dadjoke"],
		queryFn: getRandomDadJoke,
	}); */

	return (
		<>
			<h1>I ❤️ React Query</h1>
			<p>Welcome to my homepage. Please write in the guestbook.</p>

			{/* <div>
				<p className="display-5 text-center my-5">{data && data.joke}</p>
			</div> */}
		</>
	);
};

export default HomePage;
