import "./App.css";
import { useState } from "react";
import Counter from "./components/Counter";
import Salary from "./components/Salary";

interface Post {
	id: number;
	title: string;
	likes: number;
}

function App() {
	const [msg, setMsg] = useState("Hi mom!"); //message is "hi mom!" when starting the page
	const [posts, setPosts] = useState<Post[]>([
		{ id: 1, title: "React Rocks 🎸!", likes: 1337 },
		{ id: 2, title: "JSX Rocks Even Moar 🤘🏻!", likes: 42 },
		{ id: 3, title: "Got state?", likes: 3 },
	]);


	const [showSalaryCounter, setShowSalaryCounter] = useState(false);
	const [inputPostTitle, setInputPostTitle] = useState("");


	const handleAddLike = (post: Post) => {
		post.likes++; //increase likes by +1 each time you press the like button
		setPosts([...posts]); //update post by giving it a new array with the same items as posts has
	};

	const handleDeletePost = (postToDelete: Post) => {
		//filter out the post that are NOT postToDelete and create a new array with those post
		setPosts(posts.filter(post => post !== postToDelete));
	};

	const handleFormSubmit = (e: React.FormEvent) => {
		// Stop form from submitting
		e.preventDefault();

		// Create a new post
		const newPost: Post = {
			id: Math.max(0, ...posts.map(post => post.id)) + 1, //0 is safety fallback, if array is empty, return 0
			//map over all the posts, take the ids from the posts and return them as a new array, highest value of the ids + 1 is the newPost id
			title: inputPostTitle,
			likes: 0,
		};

		//add the new post to the old posts
		setPosts([...posts, newPost]);

		// Clear input field
		setInputPostTitle("");
	};


	console.log("App is being rendered...");








	return (
		<div className="container">
			<h1>01-react-basics</h1>

			<p>{msg}</p>
				{/*
				onClick = when user clicks the event
				in this case, when user clicks button, do anonymous function that setMsg to hi dad
				*/}
			<button onClick={ () => setMsg("Hi dad!") } className="btn btn-warning">Hi dad?</button>
			<hr />


			{/* Counter start */}
			<Counter />
 			{/* Counter end */}
			<Counter />
			<hr />


			{/* If this button is pressed, toggle between true/false when showing counter */}
			<button
 				// className="btn btn-primary"
				className={showSalaryCounter ? "btn btn-success mb-3" : "btn btn-danger mb-3"}
 				onClick={() => setShowSalaryCounter(!showSalaryCounter)}
 			>
 				{/* Show/hide salary */}
				{showSalaryCounter ? "Hide salary" : "Show salary"}
 			</button>

			{/* if its true, show the code */}
 			{showSalaryCounter && <Salary />}
			 <hr />

			<h2>Posts</h2>

			{/* Form that lets the user create a post */}
			<form onSubmit={handleFormSubmit} className="mb-3">
				<div className="input-group">
					<input
						aria-label="Post title"
						className="form-control"
						onChange={(e) => setInputPostTitle(e.target.value)}
						placeholder="Fun with forms!"
						type="text"
						value={inputPostTitle}
						required
					/>

					<button
						className="btn btn-success"
						type="submit"
					>
						Create
					</button>
				</div>
			</form>

			{/* render out the list in the DOM */}
			{posts.length > 0 ? ( //only render it out if there are posts in the array
				<ul>
					{posts.map(post =>
						<li key={post.id}>
								{post.title} {/* display title and likes */}
								({post.likes} likes)
							<button
								className="btn btn-primary btn-sm ms-1"
								onClick={() => handleAddLike(post)} //does the function by sending the current post youn pressed like on
							>
								❤️
							</button>
							<button
								className="btn btn-warning btn-sm ms-1"
								onClick={() => handleDeletePost(post)}
							>
								🗑️
							</button>
						</li>
					)}
				</ul>
			) : (
				/* Show message if post array is empty by using ternary operator*/
				<p>These are not the posts you are looking for.</p>
			)}

		</div>
	);
};

export default App;
