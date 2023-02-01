function DisplayPhotos({ photos }) {
  return (
    <section>
      {photos.length === 0 ? (
        <h2>No photos found!</h2>
      ): (
      <>
        <h2>Photos!</h2>
        <div className="photos">
        {photos.map((photo) => {
          return (
            <div className="photo-container" key={photo.id}>
              <img src={photo.urls.small} alt={photo.alt_description} />
            </div>
          );
        })}
        </div>
      </>
      )}
    </section>
  );
}
export default DisplayPhotos;