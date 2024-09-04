import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ArtList = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [artworksPerPage] = useState(10);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${currentPage}&limit=${artworksPerPage}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const artworksWithImages = data.data.map((art) => ({
          id: art.id,
          title: art.title,
          image_id: art.image_id,
        }));
        setArtworks(artworksWithImages);
      } catch (error) {
        setError('Failed to fetch artworks');
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, [currentPage, artworksPerPage]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

const totalArtworks = 12606; 
  const totalPages = Math.ceil(totalArtworks / artworksPerPage);

  return (
    <div>
      <h2>Artworks</h2>
      <div className="art-list">
        {artworks.map((art) => (
          <div key={art.id} className="art-card">
            <Link to={`/art/${art.id}`}>
              <img
                src={`https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`} 
                alt={art.title}
                className="card-img-top"
              />
              <h3>{art.title}</h3>
            </Link>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button 
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
            Next
        </button>
      </div>
    </div>
  );
}

export default ArtList;
