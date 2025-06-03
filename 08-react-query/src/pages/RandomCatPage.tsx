import { useQuery } from "@tanstack/react-query";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import { BREEDS, getRandomCatImage } from "../services/TheCatAPI";
import { Button, Form } from "react-bootstrap";
import CatSpinner from "../components/spinners/CatSpinner";
import { useState } from "react";

const RandomCatPage = () => {
	const [breed, setBreed] = useState("");  // ragd, sibe, beng, pers, norw, sphy


	const { data, error, isError, refetch, isFetching } = useQuery({
		queryKey: ["random-cat", breed],
		queryFn: () => getRandomCatImage(breed),
		staleTime: 1000 * 45, // 45 seconds
		gcTime: Infinity, // ✋🏻🗑️🐱🚚
	});

	return (
		<>
			<h1>I ❤️ Random Cats</h1>

			<p>A cats behaviour is random so here's a random cat for you! Such random, very catlike, much hairball.</p>

			{isError && (
				<Alert variant="warning">
					{error.message}
				</Alert>
			)}

			{isFetching && <CatSpinner />}

			<div className="mb-3">
				<Button
					onClick={() => refetch({ throwOnError: true })}
					variant="primary"
					disabled={isFetching}
				>
					{isFetching && "Loading"} New random cat!!
				</Button>
			</div>

			<Form.Select
				aria-label="Select breed"
				className="mb-3"
				onChange={e => setBreed(e.target.value)}
			>
				<option value="">Any</option>
				{BREEDS.map(breed => (
					<option key={breed.id} value={breed.id}>{breed.name}</option>
				))}
			</Form.Select>


			{data && (
				<div className="d-flex justify-content-center">
					<Image src={data.url} fluid />
				</div>
			)}
		</>
	)
}

export default RandomCatPage;
