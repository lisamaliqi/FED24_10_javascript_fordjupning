import { WeatherCondition as OWMAPO_WeatherCondition } from "../services/OWMAPI.types";


interface WeatherConditionProps {
	condition: OWMAPO_WeatherCondition;
};

const WeatherCondition: React.FC<WeatherConditionProps> = ({ condition}) => {

	console.log('condition: ', condition);


	return (
		<li>
			<img src={`https://openweathermap.org/img/wn/${condition.icon}@2x.png`} title={condition.main} alt={condition.main} />
			{condition.description}
		</li>
	)
};

export default WeatherCondition;
