import forecastBanner from "../assets/images/forecast-banner.png";
import { WeatherReport } from "../services/OWMAPI.types";
import WeatherCondition from "./WeatherCondition";

interface ForecastProps {
	data: WeatherReport;
};


const Forecast: React.FC<ForecastProps> = ({ data }) => {

	//get the timestamp of when the weather updated itself last
	const freshness = new Date(data.dt * 1000);

	console.log('freshness: ', freshness);



	return (
		<div id="forecast">
			<div className="card">
				<img src={forecastBanner} className="card-img-top" alt="Daytime, nighttime, daytime, nighttime" />

				<div className="card-body">
					<h5 className="card-title" id="location">
						<span id="city">{data.name}</span>, <span id="country">{data.sys.country}</span>
					</h5>

					<p className="temp">
						<span id="temperature">{data.main.temp}</span>
						&deg;C
					</p>

					<p className="humidity">
						<span id="humidity">{data.main.humidity}</span> % humidity
					</p>

					<p className="wind">
						<span id="windspeed">{data.wind.speed}</span> m/s
					</p>

					<ul className="conditions">
						{data.weather.map(condition =>
							<WeatherCondition key={condition.id} condition={condition} />
						)}
					</ul>

					<p className="text-muted small">
						<span title={freshness.toString()}> {/* show date when hovering over date */}
							{freshness.toLocaleString()}
						</span>
					</p>

				</div>
			</div>
		</div>
	);
};

export default Forecast;
