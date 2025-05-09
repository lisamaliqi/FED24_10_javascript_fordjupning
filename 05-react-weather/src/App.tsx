import Forecast from "./components/Forecast";
import SearchCity from "./components/SearchCity";
import "./assets/scss/App.scss";
import { useState } from "react";
import { WeatherReport } from "./services/OWMAPI.types";
import { getCurrentWeather } from "./services/OWMAPI";
import imgAirplane from './assets/images/747.svg';

function App() {

	const [ currentWeather, setCurrentWeather ] = useState<WeatherReport | null>(null);
	const [ isLoading, setIsLoading ] = useState(false);

	const handleSearch = async (location: string) => {
		// console.log('Someone wants the weather for...: ', location);
		//show the loading airplane and remove previous location data if there is any
		setIsLoading(true);
		setCurrentWeather(null);

		//call API and ask for weather in 'location'
		const data = await getCurrentWeather(location);

		//update current weather state with the weather in 'location'
		setCurrentWeather(data);
		setIsLoading(false); //remove it when data is found
	};



	return (
		<div id="app" className="container">
			<SearchCity onSearch={handleSearch}/>

			{isLoading && <img src={imgAirplane} className="img-fluid py-5 w-75" />}

			{currentWeather && <Forecast data={currentWeather}/>}
		</div>
	);
};

export default App;
