import { useEffect, useState } from "react";
import "./App.css";

import DisplayPhotos from "./components/DisplayPhotos";
import Form from "./components/Form";

function App() {
	const [photos, setPhotos] = useState([]);
	const [filteredPhotos, setFilteredPhotos] = useState([]);

	// hook into the initial/first render of App to fetch puppy photos
	useEffect(() => {

		// query the API
		const fetchData = async () => {
			const url = new URL('https://api.unsplash.com/search/photos');
			url.search = new URLSearchParams({
				client_id: "Qi9SDpY5MEDJMQvbKtLUlhrGYl4F5a_zSjRWn4e01z8",
				query: 'puppies',
				per_page: 30,
			});

			try {
				const data =	await fetch(url);
				const response = await data.json();
	
				// photo orientation calculation
				const photosWithOrientation = response.results.map(photo => {
					const ratio = photo.width / photo.height;

					let orientation = 'square';

					if (ratio < 0.75) {
						orientation = 'portrait';
					} else if (ratio > 1.35) {
						orientation = 'landscape';
					}

					// update each photo object to now include a orientation property
					return {
						...photo,
						orientation: orientation
						// orientation
					}
				})

				setPhotos(photosWithOrientation);

			} catch (error) {
				// error handle
			}
		}

		fetchData();
	}, []);

	const getPhotos = (userChoice) => {
		const newFilteredPhotos = photos.filter(photo => photo.orientation === userChoice);
		setFilteredPhotos(newFilteredPhotos);
	};

	return (
		<div className="App">
			<h1>View The Pups!</h1>
			<Form getPhotos={getPhotos} />
			<DisplayPhotos photos={filteredPhotos} />
		</div>
	);
}

export default App;

