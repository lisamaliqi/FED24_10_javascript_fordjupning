import { useEffect, useState } from "react";
import Clock from "./components/Clock";
import "./assets/scss/App.scss";

function App() {

	const [showClock, setShowClock] = useState(false);


	return (
		<div className="container">
			<button
				className="btn btn-primary"
				onClick={() => setShowClock(!showClock)}
			>
				{showClock ? "🕵 clock" : "👀 clock"}
			</button>

			{showClock && <Clock />}
		</div>
	);
};

export default App;
