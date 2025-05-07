import { useEffect, useState } from "react";
import { Resource } from "./types/Resource";
import "./assets/scss/App.scss";


function App() {
	const [resource, setResource] = useState(""); //dont fetch data when starting the app
	const [data, setData] = useState<Resource[]>([]);

	// fetch data from json placeholder
	useEffect(() => {
		//old way to fetch
		// fetch(`https://jsonplaceholder.typicode.com/${resource}`)
		// 	.then(res => res.json())
		// 	.then(data => setData(data));

		//new way to fetch
		console.log("Side-effect triggered due to resource changing value to:", resource);

		//don't get an error at the start of the reload
		if (!resource) {
			return;
		};

		const fetchData = async () => {
			console.log("Fetching resource", resource);
			const res = await fetch(`https://jsonplaceholder.typicode.com/${resource}`)
			const payload = await res.json();
			await new Promise(r => setTimeout(r, 2500)); //adding delay on all requests
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
				<button onClick={() => setResource("memes")} className="btn btn-info">Memes</button> {/* button that leads to error automatically (no meme resource) */}
			</div>

			<hr />

			{resource && (
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
