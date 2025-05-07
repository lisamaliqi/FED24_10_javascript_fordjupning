import { useEffect, useState } from "react";
import "./assets/scss/App.scss";

function App() {

	const now = new Date();
	const [time, setTime] = useState(() => {
		console.log("🔋 Initializing flux capacitor...");
		return new Date().toLocaleTimeString(); //starting state is the exact time user restart react app (so no 00:00:00 in the beginning)
	});

	// Start clock when component is mounted for the first time
	useEffect(() => {
		console.log("🔫 Starting clock...");

		//interval goes off once and continue its interval but starting clock log goes off just one time
		setInterval(() => {
			setTime(new Date().toLocaleTimeString());
			console.log("🕰️ Tick...");
		}, 1000);
	}, []); //this is not dependent on another function so it will only start once


	// Update page title with current time
	// but ONLY if the time has changed since last render
	useEffect(() => {
		document.title = time;
	}, [time]);




	return (
		<div className="container">
			<div className="display-1 font-monospace text-center">
				{time}{" "}
				{now.getHours() === 19 && now.getMinutes() >= 11 && <span>🤓</span>}
			</div>
		</div>
	);
};

export default App;
