/**
 * Service for communicating with the json-server backend
 */
import axios from "axios";
import { NewTodo, Todo } from "./Todo.types";

const BASE_URL = import.meta.env.VITE_API_BASEURL || "http://localhost:3000";
const FAKE_DELAY = 1500;

// Create a new axios instance
const instance = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
	headers: {
		"Accept": "application/json",
		"Content-Type": "application/json",
	},
});

/**
 * Execute a HTTP GET request to an endpoint
 *
 * @param endpoint Endpoint to HTTP GET
 * @returns {Promise<T>}
 */

const get = async <T>(endpoint: string) => {
	const res = await instance.get<T>(endpoint);

	if (FAKE_DELAY) {
		await new Promise(r => setTimeout(r, FAKE_DELAY));
	}

	return res.data;
};



/**
 * Execute a HTTP POST request to an endpoint
 *
 * @param endpoint Endpoint to HTTP POST
 * @returns {Promise<T>}
 */

const post = async <TResponse, TPayload>(endpoint: string, payload: TPayload) => {
	const res = await instance.post<TResponse>(endpoint, payload);

	if (FAKE_DELAY) {
		await new Promise(r => setTimeout(r, FAKE_DELAY));
	}
	return res.data;
};



/**
 * Execute a HTTP PATCH request to an endpoint
 *
 * @param endpoint Endpoint to HTTP PATCH
 * @returns {Promise<T>}
 */
const patch = async <TResponse, TPayload>(endpoint: string, payload: TPayload) => {
	const res = await instance.patch<TResponse>(endpoint, payload);

	if (FAKE_DELAY) {
		await new Promise(r => setTimeout(r, FAKE_DELAY));
	}

	return res.data;
}

/**
 * Execute a HTTP DELETE request to an endpoint
 *
 * @param endpoint Endpoint to HTTP DELETE
 * @returns {Promise<T>}
 */
const del = async <T>(endpoint: string) => {
	const res = await instance.delete<T>(endpoint);

	if (FAKE_DELAY) {
		await new Promise(r => setTimeout(r, FAKE_DELAY));
	}

	return res.data;
}

/**
 * Get all todos
 */
export const getTodos = () => {
	return get<Todo[]>("/todos");
}

/**
 * Get a todo
 */
export const getTodo = (todoId: number) => {
	return get<Todo>("/todos/" + todoId);
}


/**
 * Create a new todo
 *
 * @param data Object with properties and values for the new todo
 */
export const postTodo = (todo: NewTodo) => {
	return post<Todo, NewTodo>("/todos", todo);
}

/**
 * Update a todo
 *
 * @param todo_id Todo to update
 * @param data Data to update todo with
 */
export const updateTodo = (todoId: number, payload: Partial<NewTodo>) => {
	return patch<Todo, Partial<NewTodo>>("/todos/" + todoId, payload);
}

/**
 * Delete a todo
 *
 * @param todo_id Todo to delete
 */
export const deleteTodo = async (todoId: number) => {
	return del<Todo>("/todos/" + todoId);
}
