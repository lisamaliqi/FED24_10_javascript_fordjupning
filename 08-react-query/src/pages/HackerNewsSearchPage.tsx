import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Pagination from "../components/Pagination";
import { searchByDate } from "../services/HackerNewsAPI";
import { useSearchParams } from "react-router";

const HackerNewsSearchPage = () => {
	const [page, setPage] = useState(0);
	const [inputSearch, setInputSearch] = useState("");
	const inputSearchEl = useRef<HTMLInputElement>(null);
	const [searchParams, setSearchParams] = useSearchParams();

	// get `query` from search params
	const query = searchParams.get("query") ?? "";

	const { data: searchResult, error, isError, isFetching, isPlaceholderData } = useQuery({
		queryKey: ["search-hn", { query, page }],
		queryFn: () => searchByDate(query, page),
		enabled: !!query,  // convert query (string) to a boolean value
		placeholderData: keepPreviousData,
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// 🧹
		const trimmedSearchInput = inputSearch.trim();

		// prevent smol searches
		if (trimmedSearchInput.length < 2) {
			alert("Too short search query!");
			return;
		}

		// search for haxx0rs 🕵🏻‍♂️
		setPage(0);

		// save query in SearchParams
		setSearchParams({ query: trimmedSearchInput });
	}

	const handleReset = () => {
		setPage(0);
		setInputSearch("");
		setSearchParams();
	}

	useEffect(() => {
		// update search field with current query from URLSearchParams
		setInputSearch(query);
	}, [query]);

	useEffect(() => {
		if (!inputSearchEl.current) {
			return;
		}

		// 👀
		inputSearchEl.current.focus();
	}, []);

	return (
		<>
			<h1>🔎🔦👀</h1>

			<Form className="mb-4" onReset={handleReset} onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="searchQuery">
					<Form.Label>Search Query</Form.Label>
					<Form.Control
						onChange={e => setInputSearch(e.target.value)}
						placeholder="Enter your search query"
						type="text"
						value={inputSearch}
						ref={inputSearchEl}
						required
					/>
				</Form.Group>

				<div className="d-flex justify-content-end">
					<Button
						type="reset"
						variant="warning"
					>
						Clear
					</Button>
					<Button
						disabled={inputSearch.trim().length < 2 || isFetching}
						type="submit"
						variant="success"
					>
						Search
					</Button>
				</div>
			</Form>

			{isError && <Alert variant="warning">{error.message}</Alert>}

			{searchResult && (
				<div id="search-result">
					<p>Showing {searchResult.nbHits} search results for "{searchResult.query}"...</p>

					<ListGroup className="mb-3">
						{searchResult.hits.map((hit) => (
							<ListGroup.Item action href={hit.url} key={hit.objectID}>
								<h2 className="h4">{hit.title}</h2>
								<p className="text-muted small mb-0">{hit.points} points by {hit.author} at {hit.created_at}</p>
							</ListGroup.Item>
						))}
					</ListGroup>

					<Pagination
						hasPreviousPage={!isPlaceholderData && page > 0}
						hasNextPage={!isPlaceholderData && page + 1 < searchResult.nbPages}
						onPreviousPage={() => setPage(prevValue => prevValue - 1)}
						onNextPage={() => setPage(prevValue => prevValue + 1)}
						page={searchResult.page + 1}
						totalPages={searchResult.nbPages}
					/>
				</div>
			)}
		</>
	)
}

export default HackerNewsSearchPage;
