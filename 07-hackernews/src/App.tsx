import Container from "react-bootstrap/Container";
import { Routes, Route } from "react-router";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import SearchPage from "./pages/SearchPage";
import "./assets/scss/App.scss";
import useTheme from "./hooks/useTheme";
import clsx from "clsx";
import RandomDogPage from "./pages/RandomDogPage";
import ChuckNorrisPage from "./pages/ChuckNorrisPage";

function App() {

	const { isDarkMode } = useTheme()

	const appCssClasses = clsx({
		"bg-white": !isDarkMode,
		"text-dark": !isDarkMode,
	});

	return (
		<div id="App" className={appCssClasses}>
			<Navigation />

			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/chuck-norris" element={<ChuckNorrisPage />} />
					<Route path="/random-dog" element={<RandomDogPage />} />
					<Route path="/search" element={<SearchPage />} />

					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Container>
		</div>
	)
}

export default App;
