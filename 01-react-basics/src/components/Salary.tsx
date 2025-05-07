import { useState } from "react";

const Salary = () => {
	const [salaryCounter, setSalaryCounter] = useState(10);

	const handleSalaryCount = (amount: number) => {
		//salary can never be less than 5 euro
		if(salaryCounter + amount < 5) {
			setSalaryCounter(5);
 			return;
		};

		setSalaryCounter(salaryCounter + amount)
	};

	return (
		<>
			<h2>Salary</h2>

			<p>Salary per hour: {salaryCounter} &euro;</p>

			{/* If salary is less than 10 euro, show this message */}
			{salaryCounter < 10 && (
				<div className="alert alert-warning">
					You might want to change job?
				</div>
			)}

			<div className="buttons">

				<div className="mb-1">
					<button
						onClick={() => handleSalaryCount(1)}
						className="btn btn-primary btn-lg"
					>
						Raise 1 &euro; 🤑
					</button>
					<button
						onClick={() => handleSalaryCount(-1)}
						className="btn btn-warning btn-lg"
					>
						Decrease 1 &euro; 😢
					</button>
				</div>

				<div className="mb-1">
					<button
						onClick={() => handleSalaryCount(5)}
						className="btn btn-primary btn-lg"
					>
						Raise 5 &euro; 🤑🤑🤑
					</button>
					<button
						onClick={() => handleSalaryCount(-5)}
						className="btn btn-warning btn-lg"
					>
						Decrease 5 &euro; 😢😢😢
					</button>
				</div>

			</div>

		</>
	)
};

export default Salary;
