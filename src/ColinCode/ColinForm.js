import { useState } from "react";

function Form({getPhotos}) {
	const [userChoice, setUserChoice] = useState('');

	const handleChange = (event) => {
		setUserChoice(event.target.value);
	}

	return (
		<form onSubmit={(event) => {
			event.preventDefault();
			getPhotos(userChoice);
		}}>
			<label htmlFor="orientationPicker">Choose photo orientation:</label>
			<select 
				value={userChoice} 
				id="orientationPicker" 
				onChange={handleChange}
			>
				<option value="" disabled>Please Select:</option>
				<option value="square">Square</option>
				<option value="landscape">Landscape</option>
				<option value="portrait">Portrait</option>
			</select>

			<button>Get the photos!</button>
		</form>
	)
}

export default Form;