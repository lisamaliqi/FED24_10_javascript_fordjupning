import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import BorderSpinner from "../components/spinners/BorderSpinner";
import useChuckNorrisFact from "../hooks/useChuckNorrisFact";

const ChuckNorrisPage = () => {

	const { data, error, isError, isLoading, refetch } = useChuckNorrisFact();


	return (
		<>
			<h1>A Chuck Norris fact</h1>

			<div className="d-flex justify-content-center mb-3">
				<Button
					disabled={isLoading}
					onClick={refetch}
				>
					{isLoading && <BorderSpinner />} MOAR!!
				</Button>
			</div>

			{isError && <Alert variant="warning">{error}</Alert>}

			<div>
				{data && (
					<p className="h2 text-center">
						{data.value}
					</p>
				)}
			</div>
		</>
	)
};

export default ChuckNorrisPage;
