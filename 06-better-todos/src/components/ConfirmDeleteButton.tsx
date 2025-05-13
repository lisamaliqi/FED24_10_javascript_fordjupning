import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface ConfirmDeleteButtonProps {
	onConfirm: () => void; //receive a prop that is a function
};


export default function ConfirmDeleteButton({onConfirm}: ConfirmDeleteButtonProps) {

	const [showConfirmDelete, setShowConfirmDelete] = useState(false);

	//function that handles the delete button in confirm modal (also hides the modal)
	const handleConfirm = () => {
		onConfirm();
		setShowConfirmDelete(false);
	};


	return (
		<>
			{/* First delete button the user sees */}
			<Button variant="danger" onClick={() => setShowConfirmDelete(true)}>Delete</Button>

			{/* The modal that ask for confirmation */}
			<Modal show={showConfirmDelete} onHide={() => setShowConfirmDelete(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Confirm Deletion</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<p>U sure u wanna delete?</p>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowConfirmDelete(false)}>
						No plz don't delete i pressed wrong button
					</Button>
					<Button variant="danger" onClick={handleConfirm}>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>
		</>

	)
};
