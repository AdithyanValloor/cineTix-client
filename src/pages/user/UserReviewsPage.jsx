import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import StarRating from '../../components/StartRating';

function UserReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(null); // review._id
  const [editedReview, setEditedReview] = useState({ comment: '', rating: 0 });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axiosInstance.get('/reviews/all', { withCredentials: true });
      
      console.log("RES : ", res);
      

      setReviews(res.data.data);
    } catch (err) {
      setError('Failed to load reviews');
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (review) => {
    setEditMode(review._id);
    setEditedReview({ comment: review.comment || '', rating: review.rating });
  };

  const handleUpdateReview = async (id, reviewType, movie, theater) => {
    try {
      const payload = {
        comment: editedReview.comment,
        rating: editedReview.rating,
        reviewType,
        ...(reviewType === 'movie' && { movieId: movie?._id }),
        ...(reviewType === 'theater' && { theaterId: theater?._id }),
      };

      await axiosInstance.patch(`/reviews/update-review/${id}`, payload, {
        withCredentials: true,
      });

      setEditMode(null);
      fetchReviews();
    } catch (err) {
      console.error('Error updating review:', err);
    }
  };

  const handleDeleteReview = async (id, movie, theater) => {
    try {
      await axiosInstance.delete(`/reviews/delete-review/${id}`, {
        withCredentials: true,
        params: {
          ...(movie?._id && { movieId: movie._id }),
          ...(theater?._id && { theaterId: theater._id }),
        },
      });

      fetchReviews();
    } catch (err) {
      console.error('Error deleting review:', err);
    }
  };

  return (
    <div className="pt-36 md:pt-24 px-4 sm:px-6 lg:px-10 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        User Reviews
      </h1>

      {loading ? (
        <div className="text-lg text-gray-500 text-center">Loading reviews...</div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : reviews.length === 0 ? (
        <div className="text-gray-600 text-center">No reviews available.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => {
            const isMovieReview = review.reviewType === 'movie';
            const associatedItem = isMovieReview ? review.movie : review.theater;
            const associatedName = isMovieReview ? review.movie?.title : review.theater?.name;
            const associatedPoster = isMovieReview ? review.movie?.posterUrl : null;

            return (
              <div key={review._id} className="p-4 bg-base-100 rounded-lg shadow-md relative">
                {editMode === review._id ? (
                  <>
                    <textarea
                      className="w-full border rounded p-2 mb-2"
                      rows="3"
                      value={editedReview.comment}
                      onChange={(e) =>
                        setEditedReview({ ...editedReview, comment: e.target.value })
                      }
                    />
                    <input
                      type="number"
                      min={1}
                      max={5}
                      className="w-full border rounded p-2 mb-2"
                      value={editedReview.rating}
                      onChange={(e) =>
                        setEditedReview({ ...editedReview, rating: e.target.value })
                      }
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() =>
                          handleUpdateReview(
                            review._id,
                            review.reviewType,
                            review.movie,
                            review.theater
                          )
                        }
                        className="btn btn-sm btn-success"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditMode(null)}
                        className="btn btn-sm btn-ghost"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {associatedPoster && (
                      <img
                        src={associatedPoster}
                        alt={associatedName}
                        className="w-full h-40 object-cover rounded mb-2"
                      />
                    )}
                    <h3 className="font-semibold text-lg">
                      {isMovieReview ? 'Movie:' : 'Theater:'} {associatedName || 'N/A'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      By {`${review.user?.firstName} ${review.user?.lastName}` || 'Anonymous'}
                    </p>
                    <p className="mt-1 text-gray-800">{review.comment}</p>
                    <div className="mt-2">
                      <StarRating rating={review.rating}/>
                    </div>

                    <div className="flex justify-end gap-2 mt-3">
                      <button
                        onClick={() => handleEditClick(review)}
                        className="btn btn-sm btn-outline btn-primary"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteReview(
                            review._id,
                            review.movie,
                            review.theater
                          )
                        }
                        className="btn btn-sm btn-outline btn-error"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default UserReviewsPage;
