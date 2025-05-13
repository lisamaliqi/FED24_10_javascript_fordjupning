import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface ConfirmDeleteButtonProps {
	onConfirm: () => void;
};


export default function ConfirmDeleteButton({onConfirm}: ConfirmDeleteButtonProps) {

	const [showConfirmDelete, setShowConfirmDelete] = useState(false);

	const handleClose = () => setShowConfirmDelete(false);
	const handleShow = () => setShowConfirmDelete(true);
	const handleConfirm = () => {
		onConfirm();
		setShowConfirmDelete(false);
	};


	return (
		<>
			{/* First delete button the user sees */}
			<Button variant="danger" onClick={handleShow}>Delete</Button>

			{/* The modal that ask for confirmation */}
			<Modal show={showConfirmDelete} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Confirm Deletion</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<p>U sure u wanna delete?</p>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
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
