function DisplayPhotos({ photos }) {
	return (
		<section>
			{
				photos.length === 0
					? <h2>No photos found!</h2> 
					: (
					<>
						<h2>Puppy Photos!</h2>
						<div className="photos">
							{
								photos.map(photo => {
									return (
										<div key={photo.id} className="photo-container">
											<img src={photo.urls.small} alt={photo.alt_description} />
										</div>
									)
								})
							}
						</div>
					</>
				)
			}
		</section>
	)
}

export default DisplayPhotos;