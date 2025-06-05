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

				<Button variant="success" onClick={() => toast.success("Wow, such success, very influencer, much money! 💰")}>Click me 🤑</Button>

				<Button variant="warning" onClick={() => toast.warn("Wow, such WARNING, very ALERT!")}>Call da police 👮🏻</Button>

				<Button variant="danger" onClick={() => toast.error("Wow, such ERROR, very DANGEROUS!")}>Blow shit up 💣</Button>

				<Button variant="info" onClick={() => toast.info("LIKE && SUBSCRIBE")}>Fire that ship 🔥</Button>
			</ButtonGroup>
		</>
	</div>
  )
}

export default HomePage
