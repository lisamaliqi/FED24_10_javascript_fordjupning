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
	const [ error, setError ] = useState<string | false>(false);

	const handleSearch = async (location: string) => {
		// console.log('Someone wants the weather for...: ', location);
		//show the loading airplane and remove previous location data if there is any
		//set error to false when doing a new request
		setIsLoading(true);
		setCurrentWeather(null);
		setError(false);

		//handle error in try catch
		try {
			//call API and ask for weather in 'location'
			const data = await getCurrentWeather(location);

			//update current weather state with the weather in 'location'
			setCurrentWeather(data);

		} catch (err){
			if(err instanceof Error) {
				setError(err.message);
			} else {
				setError('something unexpected happened.');
			};

			//you could also do this instead of if statement
			//setError(err instanceof Error ? err.message : 'Somehting unexpected happened.');
		};

		//remove it when data is found
		setIsLoading(false);
	};



	return (
		<div id="app" className="container">
			<SearchCity onSearch={handleSearch}/>

			{error && (
				<div className="alert alert-warning">{error}</div>
			)}

			{isLoading && <img src={imgAirplane} className="img-fluid py-5 w-75" />}

			{currentWeather && <Forecast data={currentWeather}/>}
		</div>
	);
};

export default App;
