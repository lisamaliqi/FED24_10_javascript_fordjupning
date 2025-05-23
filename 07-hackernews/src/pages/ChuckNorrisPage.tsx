import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

const ChuckNorrisPage = () => {

	return (
		<>
			<h1>A Chuck Norris fact</h1>

			<div className="d-flex justify-content-center mb-3">
				<Button
					disabled={false}
					onClick={() => {}}
				>
					MOAR!!
				</Button>
			</div>

			{false && <Alert variant="warning">{error}</Alert>}

			<div>
				{false && (
					<p className="display-1 text-center">
						{data.value}
					</p>
				)}
			</div>
		</>
	)
};

export default ChuckNorrisPage;
