import "./App.css";
import { useState } from "react";

interface Post {
	id: number;
	title: string;
	likes: number;
}

function App() {
	// let counter = 0;  // stateless
	const [counter, setCounter] = useState(1); //counter is 0 when starting the page
	const [msg, setMsg] = useState("Hi mom!"); //message is "hi mom!" when starting the page
	const [posts, setPosts] = useState<Post[]>([
		{ id: 1, title: "React Rocks 🎸!", likes: 1337 },
		{ id: 2, title: "JSX Rocks Even Moar 🤘🏻!", likes: 42 },
		{ id: 3, title: "Got state?", likes: 3 },
	]);


	//workshop:
	const [salaryCounter, setSalaryCounter] = useState(10);
	const [showSalaryCounter, setShowSalaryCounter] = useState(false);

	const handleSalaryCount = (amount: number) => {
		//salary can never be less than 5 euro
		if(salaryCounter + amount < 5) {
			setSalaryCounter(5);
 			return;
		};

		setSalaryCounter(salaryCounter + amount)
	};




	//function that adds +1 to counter when user press "click me" button
	const handleBtnClick = () => {
		console.log("Counter before update:", counter);
		// setCounter(counter + 1);
		setCounter((prevCounter) => prevCounter + 1);  // prevCounter = 1, return 2

 		console.log("Counter between updates:", counter);

 		setCounter((prevCounter) => prevCounter + 1);  // prevCounter = 2, return 3
		console.log("Counter after update:", counter);
	};

	console.log("App is being rendered, counter is:", counter);

	return (
		<div className="container">
			<h1>01-react-basics</h1>

			<p>{msg}</p>
			<p>Counter: {counter}</p>

			{/*
				onClick = when user clicks the event
				in this case, when user clicks button, do handleBtnClick function
				*/}
			<button onClick={handleBtnClick} className="btn btn-primary">Click me</button>

			{/*
				when clicking the button, the "hi mom" text changes to "hi dad"
			*/}
			<button onClick={ () => setMsg("Hi dad!") } className="btn btn-warning">Hi dad?</button>

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
 			{showSalaryCounter &&
 				<>
 					<h2>Salary</h2>

					<p>Salary per hour: {salaryCounter} &euro;</p>

					{/* If salary is less than 10 euro, show this message */}
					{salaryCounter < 10 && (
						<div className="alert alert-warning">
							You might want to change job?
						</div>
					)}

					<div className="buttons">
						<div className="mb-1">
							<button
								onClick={() => handleSalaryCount(1)}
								className="btn btn-primary btn-lg"
							>
								Raise 1 &euro; 🤑
							</button>
							<button
								onClick={() => handleSalaryCount(-1)}
								className="btn btn-warning btn-lg"
							>
								Decrease 1 &euro; 😢
							</button>
						</div>

						<div className="mb-1">
							<button
								onClick={() => handleSalaryCount(5)}
								className="btn btn-primary btn-lg"
							>
								Raise 5 &euro; 🤑🤑🤑
							</button>
							<button
								onClick={() => handleSalaryCount(-5)}
								className="btn btn-warning btn-lg"
							>
								Decrease 5 &euro; 😢😢😢
							</button>
						</div>
					</div>

				</>
 			}
			 <hr />

			{/* render out the list in the DOM */}
			<ul>
 				{posts.map(post =>
 					<li key={post.id}>{post.title} ({post.likes} likes)</li>
 				)}
 			</ul>

		</div>
	);
};

export default App;
