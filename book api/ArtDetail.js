import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ArtDetail = () => {
  const { id } = useParams();
  const [artDetail, setArtDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtDetail = async () => {
      try {
        const response = await fetch(`https://api.artic.edu/api/v1/artworks/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setArtDetail({
          title: data.data.title,
          image_id: data.data.image_id, 
          description: data.data.exhibition_history || 'No description available',
        });
      } catch (error) {
        setError('Failed to fetch artwork details');
      } finally {
        setLoading(false);
      }
    };

    fetchArtDetail();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>{artDetail?.title}</h2>
      {artDetail?.image_id && (
        <img
          src={`https://www.artic.edu/iiif/2/${artDetail.image_id}/full/843,/0/default.jpg`} 
          alt={artDetail.title}
          className="card-img-top"
        />
      )}
      <p>{artDetail?.description}</p>
      
      <h1>{artDetail?.place_of_origin}</h1>

    </div>
  );
}

export default ArtDetail;
