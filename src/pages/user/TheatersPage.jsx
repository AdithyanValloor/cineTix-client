import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';

function TheatersPage() {
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const response = await axiosInstance.get('/theater/all-theaters',  {
          withCredentials: true, 
        }); 
        
        setTheaters(response.data.data);
      } catch (err) {
        console.error('Failed to fetch theaters:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTheaters();
  }, []);

  console.log("Theater : ", theaters);
  

  return (
    <div className="min-h-screen pt-24 px-4 md:px-20 bg-base-200">
      <h1 className="text-2xl md:text-4xl font-bold mb-6">Top Theaters</h1>

      {loading ? (
        <p className="text-lg text-gray-500">Loading theaters...</p>
      ) : theaters.length === 0 ? (
        <p className="text-lg text-gray-500">No theaters available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {theaters.map((theater) => (
            <Link
              to={`/theater-details/${theater._id}`}
              key={theater._id}
              className="border border-base-300 rounded-lg p-4 bg-base-100 shadow hover:shadow-lg transition cursor-pointer"
            >
              <h2 className="text-lg font-semibold">{theater.name}</h2>
              <p className="text-sm text-gray-600">
                {theater.location}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default TheatersPage;
