import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";

interface AutoDismissingAlertProps {
	children: React.ReactNode;
	variant: string;
	hideAfter: number;
}

const AutoDismissingAlert: React.FC<AutoDismissingAlertProps> = ({ children, variant, hideAfter }) => {

	const [ hide, setHide ] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setHide(true);
		}, hideAfter);
	}, [hideAfter]);

	return (
		<Alert show={!hide} variant={variant}>
			{children}
		</Alert>
	)
};

export default AutoDismissingAlert;
