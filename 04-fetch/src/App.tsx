import { useEffect, useState } from "react";
import { Resource } from "./types/Resource";
import "./assets/scss/App.scss";


function App() {
	const [resource, setResource] = useState("posts");
	const [data, setData] = useState<Resource[]>([]);

	// fetch data from json placeholder
	useEffect(() => {
		//old way to fetch
		// fetch(`https://jsonplaceholder.typicode.com/${resource}`)
		// 	.then(res => res.json())
		// 	.then(data => setData(data));

		//new way to fetch
		console.log("Side-effect triggered due to resource changing value to:", resource);

		const fetchData = async () => {
			const res = await fetch(`https://jsonplaceholder.typicode.com/${resource}`)
			const payload = await res.json();
			setData(payload);
		};

		fetchData();
	}, [resource]); //when resource state changes -> fetch data



	console.log("App is rendering... Resource is:", resource);

	return (
		<div className="container py-2">
			<h1>Fetch</h1>

			<div className="buttons">
				<button onClick={() => setResource("albums")} className="btn btn-primary">Albums</button>
				<button onClick={() => setResource("photos")} className="btn btn-success">Photos</button>
				<button onClick={() => setResource("posts")} className="btn btn-warning">Posts</button>
				<button onClick={() => setResource("todos")} className="btn btn-danger">Todos</button>
			</div>

			<hr />

			{data && (
				<>
					<h2>{resource}</h2>
					<p>There are {data.length} {resource}.</p>

					<ol>
						{data.map(item => (
							<li key={item.id}>{item.title}</li>
						))}
					</ol>
				</>
			)}
		</div>
	);
};

export default App;
