import { Link } from "react-router";

const HomePage = () => {
  return (
	<div>
		<>
			<h1>Welcome to better todos!</h1>

			<p>Because when life gives you assignment, you need a <Link to="/todos">todo list</Link>!</p>
		</>
	</div>
  )
}

export default HomePage
