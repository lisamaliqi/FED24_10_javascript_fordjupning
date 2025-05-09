import "./assets/scss/App.scss";
import  Container  from "react-bootstrap/Container";
import { Routes, Route } from 'react-router';
import TodosPage from "./pages/TodosPage";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";


function App() {
	return (
		<div id="app">
			<Navigation />

			<Container className="container py-2">
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/todos' element={<TodosPage />} />
				</Routes>
			</Container>
		</div>
	);
};

export default App;
