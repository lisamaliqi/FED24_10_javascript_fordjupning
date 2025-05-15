/* eslint-disable no-constant-binary-expression */
import { useEffect, useRef, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import { HN_SearchResponse } from "../services/HackerNewsAPI.Types";
import { searchByDate } from "../services/HackerNewsAPI";

const SearchPage = () => {
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(false);
	const [inputSearch, setInputSearch] = useState("");
	const [searchResult, setSearchResult] = useState<HN_SearchResponse | null>(null);


	const searchHackerNews = async (searchQuery: string) => {
		// reset state + set loading to true
		setError(false);
		setIsLoading(true);
		setSearchResult(null);


		try {
			const data = await searchByDate(searchQuery);

			//update state with search result
			setSearchResult(data);
		} catch (err) {
			//handle any errors
			console.error(`Error thrown when searching for "${searchQuery}":`, err);
			setError(err instanceof Error
				? err.message
				: "Aouch, stop throwing things that are not Errors at me"
			);
		};

		//set loading to false
		setIsLoading(false);
	};


	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const trimmedInputSearch = inputSearch.trim();

		// prevent smol searches
		if (trimmedInputSearch.length < 2) {
			alert("Too short search query!");
			return;
		};

		// search for haxx0rs 🕵🏻‍♂️
		console.log('WOuld search for ' + inputSearch + ' in HN API');
		searchHackerNews(trimmedInputSearch);
	};




	return (
		<>
			<h1>🔎🔦👀</h1>

			<Form className="mb-4" onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="searchQuery">
					<Form.Label>Search Query</Form.Label>
					<Form.Control
						onChange={e => setInputSearch(e.target.value)}
						value={inputSearch}
						type="text"
						placeholder="Enter your search query"
						required
					/>
				</Form.Group>

				<div className="d-flex justify-content-end">
					<Button
						disabled={inputSearch.trim().length < 2}
						variant="success"
						type="submit"
					>
						Search
					</Button>
				</div>
			</Form>

			{/* {false && <Alert variant='warning'>DIS MY ERROR</Alert>} */}
			{error && <Alert variant="warning">{error}</Alert>}

			{/* {false && <p>🤔 Loading...</p>} */}
			{isLoading && <p>🤔 Loading...</p>}

			{searchResult && (
				<div id="search-result">
					<p>Showing {searchResult.nbHits} search results for "{inputSearch}"...</p>

					<ListGroup className="mb-3">
						{searchResult.hits.map((hit) => (
							<ListGroup.Item action href={hit.url} key={hit.objectID}>
								<h2 className="h4">{hit.title}</h2>
								<p className="text-muted small mb-0">{hit.points} points by {hit.author} at {hit.created_at}</p>
							</ListGroup.Item>
						))}
					</ListGroup>

					{/* Change page to not load in all search result in the first page (save storage) */}
					<div className="d-flex justify-content-between align-items-center">
						<div className="prev">
							<Button variant="primary">Previous Page</Button>
						</div>

						<div className="page">PAGE</div>

						<div className="next">
							<Button variant="primary">Next Page</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default SearchPage;
