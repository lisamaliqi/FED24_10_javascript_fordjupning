import Forecast from "./components/Forecast";
import SearchCity from "./components/SearchCity";
import "./assets/scss/App.scss";
import { useState } from "react";
import { WeatherReport } from "./services/OWMAPI.types";
import { getCurrentWeather } from "./services/OWMAPI";

function App() {

	const [ currentWeather, setCurrentWeather ] = useState<WeatherReport | null>(null);

	const handleSearch = async (location: string) => {
		console.log('Someone wants the weather for...: ', location);

		//call API and ask for weather in 'location'
		const data = await getCurrentWeather(location);

		//update current weather state with the weather in 'location'
		setCurrentWeather(data);
	};

	return (
		<div id="app" className="container">
			<SearchCity onSearch={handleSearch}/>

			{currentWeather && <Forecast data={currentWeather}/>}
		</div>
	);
};

export default App;
