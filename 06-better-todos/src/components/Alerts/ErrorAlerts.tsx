import Alert from "react-bootstrap/Alert";

interface ErrorAlertProps {
	children: React.ReactNode; //component that can take other components as children
};


const ErrorAlert: React.FC<ErrorAlertProps> = ({ children }) => {
	return (
		<Alert variant="danger">
			{children}
		</Alert>
	)
};

export default ErrorAlert;
