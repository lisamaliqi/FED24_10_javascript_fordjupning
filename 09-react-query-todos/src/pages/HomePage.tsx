import { Button, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router";
import { toast } from "react-toastify";

const HomePage = () => {
  return (
	<div>
		<>
			<h1>Welcome to better todos!</h1>

			<p>Because when life gives you assignment, you need a <Link to="/todos">todo list</Link>!</p>

			<ButtonGroup>
				<Button variant="primary" onClick={() => toast("Wow 🤩! Such click 🐭, much toast 🍞, very celebrate 🥂!")}>Celebrate 🎉</Button>
			</ButtonGroup>
		</>
	</div>
  )
}

export default HomePage
