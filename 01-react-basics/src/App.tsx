import "./App.css";
import { useState } from "react";

function App() {
	// let counter = 0;  // stateless
	const [counter, setCounter] = useState(0); //counter is 0 when starting the page
	const [msg, setMsg] = useState("Hi mom!");

	//function that adds +1 to counter when user press "click me" button
	const handleBtnClick = () => {
		console.log("Counter before update:", counter);
		setCounter(counter + 1);
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
		</div>
	);
};

export default App;
