import { useEffect, useState } from "react";
import { getResource } from "./services/JSONPlaceholderAPI";
import { Resource } from "./types/Resource";
import ResourceList from "./components/ResourceList";
import "./assets/scss/App.scss";


function App() {
	const [resource, setResource] = useState(""); //dont fetch data when starting the app
	const [data, setData] = useState<Resource[]>([]);
	const [isLoading, setIsLoading] = useState(false); //loading spinner
	const [error, setError] = useState<string | false>(false);

	// fetch data from json placeholder
	useEffect(() => {
		//old way to fetch
		// fetch(`https://jsonplaceholder.typicode.com/${resource}`)
		// 	.then(res => res.json())
		// 	.then(data => setData(data));

		//new way to fetch
		console.log("Side-effect triggered due to resource changing value to:", resource);


		const fetchData = async () => {
			//handle error to not get an error at the start of the reload
			if (!resource) {
				return;
			};

			// reset state
			setData([]); //remove previous data when fetching for new data
			setError(false);
			setIsLoading(true); //display loading spinner

			try {
				// make the actual request
				const payload = await getResource(resource);

				// set data to payload
				setData(payload);

			} catch (err) {
				setError(err instanceof Error ? err.message : "This should really never ever happen...");
			};

			setIsLoading(false);//when new data is fetched, remove loading spinner
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

			<ResourceList
				data={data}
				error={error}
				isLoading={isLoading}
				resource={resource}
			/>

			<code className="display-1">haxx0r</code>

		</div>
	);
};

export default App;
