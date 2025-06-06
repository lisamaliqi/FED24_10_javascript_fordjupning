import "./assets/scss/App.scss";
import  Container  from "react-bootstrap/Container";
import { Routes, Route } from 'react-router';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import TodosPage from "./pages/TodosPage";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import NotFoundPage from "./pages/NotFoundPage";
import TodoPage from "./pages/TodoPage";
import CreateTodoPage from "./pages/CreateTodoPage";
import EditTodoPage from "./pages/EditTodoPage";
import GlobalLoadingSpinner from "./components/Spinners/GlobalLoadingSpinner";
import { ToastContainer } from "react-toastify";


function App() {
	return (
		<div id="app">
			<Navigation />
			<GlobalLoadingSpinner />

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

			<ReactQueryDevtools />
			<ToastContainer
				// position="bottom-right"
				// autoClose={3000}  // close automatically after 3 seconds instead of 5
				// autoClose={false}
				// pauseOnFocusLoss={false}  // continue to autoclose even if the user has lost focus
				closeOnClick
				theme="colored"
				limit={5}
				stacked
			/>
		</div>
	);
};

export default App;
