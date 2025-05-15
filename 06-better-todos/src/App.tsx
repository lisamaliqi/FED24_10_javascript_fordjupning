import "./assets/scss/App.scss";
import  Container  from "react-bootstrap/Container";
import { Routes, Route } from 'react-router';
import TodosPage from "./pages/TodosPage";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import NotFoundPage from "./pages/NotFoundPage";
import TodoPage from "./pages/TodoPage";
import CreateTodoPage from "./pages/CreateTodoPage";
import EditTodoPage from "./pages/EditTodoPage";


function App() {
	return (
		<div id="app">
			<Navigation />

			<Container className="container py-2">
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/todos' element={<TodosPage />} />
					<Route path="/todos/create" element={<CreateTodoPage />} />
					<Route path="/todos/:id" element={<TodoPage />} />
					<Route path="/todos/:id/edit" element={<EditTodoPage />} />

					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Container>
		</div>
	);
};

export default App;
