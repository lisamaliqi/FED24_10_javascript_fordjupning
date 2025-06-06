export interface Todo {
	id: number;
	title: string;
	completed: boolean;
};


export type NewTodo = Omit<Todo, "id">;
