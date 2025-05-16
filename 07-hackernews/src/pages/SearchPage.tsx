/* eslint-disable no-constant-binary-expression */
import { useEffect, useRef, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import { HN_SearchResponse } from "../services/HackerNewsAPI.types";
import { searchByDate } from "../services/HackerNewsAPI";
import Pagination from "../components/Pagination";

const SearchPage = () => {
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(false);
	const [inputSearch, setInputSearch] = useState("");
	const [searchResult, setSearchResult] = useState<HN_SearchResponse | null>(null);
	const [page, setPage] = useState(0);

	const queryRef = useRef('');
	const inputSearchQueryRef = useRef<HTMLInputElement | null>(null);



	const searchHackerNews = async (searchQuery: string, searchPage: number) => {
		console.log(`Searching for "${searchQuery}" and page ${searchPage}`);

		// reset state + set loading to true
		setError(false);
		setIsLoading(true);
		setSearchResult(null);

		//save searchQuery to queryRef
		queryRef.current = searchQuery;


		try {
			const data = await searchByDate(searchQuery, searchPage);

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
		setPage(0);
		searchHackerNews(trimmedInputSearch, 0);
	};


	//pagnation with useState
	useEffect(() => {
		if (!queryRef.current) {
			return;
		};

		searchHackerNews(queryRef.current, page);
	}, [page]);


	//autofocus on input field
	useEffect(() => {
		if (!inputSearchQueryRef.current) {
			return;
		};

		inputSearchQueryRef.current.focus();
	}, []);//start once when the page loads



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
						ref={inputSearchQueryRef}
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
					<p>Showing {searchResult.nbHits} search results for "{queryRef.current}"...</p>

					<ListGroup className="mb-3">
						{searchResult.hits.map((hit) => (
							<ListGroup.Item action href={hit.url} key={hit.objectID}>
								<h2 className="h4">{hit.title}</h2>
								<p className="text-muted small mb-0">{hit.points} points by {hit.author} at {hit.created_at}</p>
							</ListGroup.Item>
						))}
					</ListGroup>

					<Pagination
						hasPreviousPage={searchResult.page > 0}
						hasNextPage={searchResult.page + 1 < searchResult.nbPages}
						onPreviousPage={() => setPage(prevValue => prevValue - 1)}
						onNextPage={() => setPage(prevValue => prevValue + 1)}
						page={searchResult.page + 1}
						totalPages={searchResult.nbPages}
					/>

					{/* Change page to not load in all search result in the first page (save storage) */}
					{/* <div className="d-flex justify-content-between align-items-center">
						<div className="prev">
							<Button
								disabled={page <= 0}
								onClick={() => setPage(prevValue => prevValue - 1)}
								variant="primary"
							>
								Previous Page
							</Button>
						</div>

						<div className="page">{searchResult.page + 1} / {searchResult.nbPages}</div>

						<div className="next">
							<Button
								disabled={page + 1 >= searchResult.nbPages}
								onClick={() => setPage(prevValue => prevValue + 1)}
								variant="primary"
							>
								Next Page
							</Button>
						</div>
					</div> */}
				</div>
			)}
		</>
	);
};

export default SearchPage;
