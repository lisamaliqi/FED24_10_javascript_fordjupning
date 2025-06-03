import { useQuery } from "@tanstack/react-query";
import { getRandomDadJoke } from "../services/DadJokeAPI";
import { Alert } from "react-bootstrap";

const ICanHazDadJokePage = () => {

	//don't really know what this does
	const {
		data,
		error,
		isError,
		isFetching,
		isLoading,
		isPending,
		isRefetching,
		isStale,
		isSuccess,
		status,
	} = useQuery({
		queryKey: ["dadjoke"],
		queryFn: getRandomDadJoke,
	});

	return (
		<>
			<h1>Random Dad Joke 🧔🏻‍♂️</h1>

			<pre className="bg-light py-2 px-3">
				isError: {String(isError)}<br />
				isFetching: {String(isFetching)}<br />
				isLoading: {String(isLoading)}<br />
				isPending: {String(isPending)}<br />
				isRefetching: {String(isRefetching)}<br />
				isStale: {String(isStale)}<br />
				isSuccess: {String(isSuccess)}<br />
				status: {String(status)}
			</pre>


			{isError && <Alert variant="warning">Error: {error.message}</Alert>}

			{data && (
				<div>
					<p className="display-5 text-center my-5">{data.joke}</p>
				</div>
			)}
		</>
	);
};

export default ICanHazDadJokePage;
