import { useState } from "react";

const Counter = () => {
	// let counter = 0;  // stateless
	const [ counter, setCounter ] = useState(1); //counter is 0 when starting the page

	//function that adds +1 to counter when user press "click me" button
	const handleBtnClick = () => {
		console.log("Counter before update:", counter);
		// setCounter(counter + 1);
		setCounter((prevCounter) => prevCounter + 1);  // prevCounter = 1, return 2

 		console.log("Counter between updates:", counter);

 		setCounter((prevCounter) => prevCounter + 1);  // prevCounter = 2, return 3
		console.log("Counter after update:", counter);
	};

	console.log("Counter is being rendered...");



	return (
		<div className="counter">
			<h2>Counter</h2>

			<p>You have clicked the button {counter} times.</p>

			<button onClick={handleBtnClick} className="btn btn-primary">👆🏻 Click meee!</button>
		</div>
	)
};

export default Counter;
