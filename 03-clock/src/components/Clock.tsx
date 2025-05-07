import * as React from "react";
import { useEffect, useState } from "react";

const Clock = () => {

	const now = new Date();
	const [time, setTime] = useState(() => {
		console.log("🔋 Initializing flux capacitor...");
		return new Date().toLocaleTimeString(); //starting state is the exact time user restart react app (so no 00:00:00 in the beginning)
	});

	// Start clock when component is mounted for the first time
	useEffect(() => {
		console.log("🔫 Starting clock...");

		//interval goes off once and continue its interval but starting clock log goes off just one time
		const tickId = setInterval(() => {
			setTime(new Date().toLocaleTimeString());
			console.log("🕰️ Tick...");
		}, 1000);

		return () => {
			// This clean-up function will be executed when
			// the component is about to be unmounted
			console.log("💣💥 Clock is being unmounted 😰 Stopping timer to prevent paradoxes 🤯");
			clearInterval(tickId);
		};
	}, []); //this is not dependent on another function so it will only start once

	// Update page title with current time
	// but ONLY if the time has changed since last render
	useEffect(() => {
		document.title = time;
	}, [time]);



	return (
		<div className="display-1 font-monospace text-center">
			{time}{" "}
			{now.getHours() === 13 && now.getMinutes() >= 37 && <span>🤓</span>}
		</div>
	);

};

export default Clock;
