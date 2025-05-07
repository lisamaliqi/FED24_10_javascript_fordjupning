import { useEffect, useState } from "react";
import "./assets/scss/App.scss";

function App() {

	const [time, setTime] = useState("00:00:00");

	useEffect(() => {
		console.log("🔫 Starting clock...");

		//interval goes off once and continue its interval but starting clock log goes off just one time
		setInterval(() => {
			setTime(new Date().toLocaleTimeString());
			console.log("🕰️ Tick...");
		}, 1000);
	}, []); //this is not dependent on another function so it will only start once



	return (
		<div className="container">
			<div className="display-1 font-monospace text-center">
				{time}
			</div>
		</div>
	);
};

export default App;
