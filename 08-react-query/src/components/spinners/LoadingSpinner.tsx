import Spinner from "react-bootstrap/Spinner";

const LoadingSpinner = () => {
	return (
		<div id="loading-spinner">
			<Spinner
				animation="grow"
				role="status"
			>
				<span className="visually-hidden">Loading...</span>
			</Spinner>
		</div>
	)
}

export default LoadingSpinner;
