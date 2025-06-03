import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import "./assets/scss/App.scss";
import ICanHazDadJokePage from "./pages/DadJokePage";
import RandomCatPage from "./pages/RandomCatPage";
import GlobalFetchingSpinner from "./components/spinners/GlobalFetchingSpinner";
import HackerNewsSearchPage from "./pages/HackerNewsSearchPage";

function App() {
	return (
		<div id="App">
			<Navigation />

			<Container className="py-3">
				<GlobalFetchingSpinner />

				<Routes>
					<Route path="/" element={<HomePage />} />

					<Route path="/dad-joke" element={<ICanHazDadJokePage />} />
					<Route path="/random-cat" element={<RandomCatPage />} />
					<Route path="/search-hn" element={<HackerNewsSearchPage />} />

					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Container>

			<ReactQueryDevtools />
		</div>
	);
}

export default App;
