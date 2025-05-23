import Spinner from "react-bootstrap/Spinner";

const BorderSpinner = () => {
	return (
		<Spinner
			animation="border"
			as="span"
			role="status"
			size="sm"
		>
			<span className="visually-hidden">Loading...</span>
		</Spinner>
	)
};

export default BorderSpinner
