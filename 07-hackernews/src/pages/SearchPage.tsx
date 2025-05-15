/* eslint-disable no-constant-binary-expression */
import { useEffect, useRef, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";

const SearchPage = () => {
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(false);
	const [inputSearch, setInputSearch] = useState("");
	const [searchResult, setSearchResult] = useState(null);  // fix me


	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// prevent smol searches
		if (inputSearch.trim().length < 2) {
			alert("Too short search query!");
			return;
		};

		// search for haxx0rs 🕵🏻‍♂️
		console.log('WOuld search for ' + inputSearch + ' in HN API');

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

			{true && (
				<div id="search-result">
					<p>Showing HITS search results for QUERY...</p>

					<ListGroup className="mb-3">
						{[{}].map((hit) => (
							<ListGroup.Item action href={"/"} key={""}>
								<h2 className="h3">TITLE</h2>
								<p className="text-muted small mb-0">POINTS points by AUTHOR at CREATED_AT</p>
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
