import { useState } from "react";

interface SearchCityProps {
	onSearch: (location: string) => void
};

const SearchCity: React.FC<SearchCityProps> = ({ onSearch }) => {

	const [ city, setCity ] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		//Pass 'city' to parent component (app)
		//trim to remove whitespace before and after input
		onSearch(city.trim());

		// clear 'city' state
		setCity('');
	};

	return (
		<div id="search-wrapper">
			<form onSubmit={handleSubmit} id="search-form">
				<div className="input-group">
					<input
						type="text"
						className="form-control"
						placeholder="Enter city to search for"
						aria-label="City"
						aria-details="Search for city to show current weather for."
						onChange={e => setCity(e.target.value)}
						value={city}
						required
					/>

					<button
						type="submit"
						className="btn btn-success"
						disabled={city.trim().length < 3} //if input has less than 3 chars, button is disabled
					>
						🔍
					</button>
				</div>
			</form>
		</div>
	);
};

export default SearchCity;
