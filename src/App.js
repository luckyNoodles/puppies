import { useEffect, useState } from 'react';
import './App.css';
import DisplayPhotos from './components/DisplayPhotos';
import Form from './components/Form';

function App() {
  // my state item
  const [photos, setPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([])
  // hook into the intial/first render of the app to fetch puppy photos
  useEffect(() => {
    //query the API
    const fetchData = async () => {
      const url = new URL('https://api.unsplash.com/search/photos');
      url.search = new URLSearchParams({
        client_id: 'G0P0rpuCMR-kLYf67ps8z2vBQOd3e3zZ_xxiVddSDXQ',
        query: 'puppies',
        per_page: 30,
      })
      // console.log(url);

      try {
        const data = await fetch(url);
        const response = await data.json();
        // console.log(response.results);

        // photo orientation calculation
                const photosWithOrientation = response.results.map(photo => {
                  const ratio = photo.width / photo.height;
                  // console.log(ratio);
                  let orientation = 'square';

                  if (ratio < 0.75) {
                    orientation = 'portrait';
                  } else if (ratio > 1.35) {
                    orientation = 'landscape';
                  }
                  // console.log(orientation);

                  // update each photo obeject with a NEW property called "orientation"
                  // this is still looping inside the map function from above
                  return {
                    ...photo,
                    orientation: orientation
                  }
              }) 
            // console.log(photosWithOrientation);
              setPhotos(photosWithOrientation);

      } catch (error) {

        }

    }
    // console.log(photos);
    fetchData();

  }, [])

      // this is actually an event handler that could be called "handleSubmit"
    const getPhotos = (userChoice) => {
        
        // console.log(userChoice)

        const filteredPhotos = photos.filter(photo => photo.orientation === userChoice);
          setFilteredPhotos(filteredPhotos);
          console.log(filteredPhotos);
    }

    // Update DisplayPhoto with images now based on sa specific orientation
    // filter photos based on userChoice
    // 

  return (
    <div className="App">
      <h1>Look at pups! 🐶</h1>
      <Form getPhotos={getPhotos} />
      <DisplayPhotos photos={filteredPhotos} />
    </div>
  );
}

export default App;


// G0P0rpuCMR-kLYf67ps8z2vBQOd3e3zZ_xxiVddSDXQ