import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { FaStar } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useSearchParams } from "react-router-dom";
import { BackButton } from '../../components/Button/Button';

function ReviewDisplayPage() {
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(0);
  const [userReview, setUserReview] = useState(null);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const { userData } = useSelector((state) => state.user);

  const [searchParams] = useSearchParams();
  const id = searchParams.get("movieId");
  const type = searchParams.get("type");

  const fetchReviews = async () => {
    try {
      const res = await axiosInstance.get(`/reviews/all?${type}Id=${id}&reviewType=${type}`, {
        withCredentials: true,
      });
      setReviews(res.data.data);
    } catch (error) {
      console.error('Error loading reviews', error);
    }
  };

  const fetchAverage = async () => {
    try {
      const res = await axiosInstance.get(`/reviews/average/${type === 'movie' ? id : ''}/${type === 'theater' ? id : ''}`, {
        withCredentials: true,
      });
      setAverage(res.data.data);
    } catch (error) {
      console.error('Error fetching average rating:', error);
    }
  };

  const fetchUserReview = async () => {
    try {
      const res = await axiosInstance.get(`/reviews/${id}?${type}Id=${id}`, { withCredentials: true });
      setUserReview(res.data.data);
      setNewReview({ rating: res.data.data.rating, comment: res.data.data.comment });
    } catch (error) {
      setUserReview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newReview.rating < 1 || newReview.rating > 5) return alert('Rating must be between 1 and 5');

    try {
      const endpoint = userReview ? `/reviews/update-review/${userReview._id}` : `/reviews/add-review`;
      const method = userReview ? 'patch' : 'post';

      const body = {
        rating: newReview.rating,
        comment: newReview.comment,
        reviewType: type,
        ...(type === 'movie' && { movieId: id }),
        ...(type === 'theater' && { theaterId: id }),
      };

      await axiosInstance[method](endpoint, body, { withCredentials: true });
      fetchReviews();
      fetchAverage();
      fetchUserReview();
    } catch (err) {
      console.error('Error submitting review', err);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/reviews/delete-review/${userReview._id}?${type}Id=${id}`, { withCredentials: true });
      setUserReview(null);
      setNewReview({ rating: 0, comment: '' });
      fetchReviews();
      fetchAverage();
    } catch (err) {
      console.error('Error deleting review', err);
    }
  };

  useEffect(() => {
    fetchReviews();
    fetchAverage();
    fetchUserReview();
  }, [id, type]);

  return (
    <div className='pt-20 min-h-lvh'>
      <div className=''>
        <BackButton/>
      </div>
      <div className="p-4 pt-10 md:p-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">User Reviews</h2>

        <div className="mb-6">
          <p className="text-lg">
            <strong>Average Rating:</strong> {average} <FaStar className="inline text-yellow-400" />
          </p>
          <p className="text-sm text-gray-500">{reviews.length} review(s)</p>
        </div>

        <div className="bg-base-200 p-4 rounded shadow mb-6">
          <h3 className="font-semibold mb-2">{userReview ? 'Update Your Review' : 'Write a Review'}</h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Star-based rating */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer text-2xl ${
                    star <= newReview.rating ? 'text-yellow-400' : 'text-gray-400'
                  }`}
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                />
              ))}
            </div>

            {/* Comment box */}
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Your review"
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            ></textarea>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button type="submit" className="btn btn-primary w-full sm:w-auto">
                {userReview ? 'Update' : 'Submit'}
              </button>
              {userReview && (
                <button type="button" className="btn btn-error btn-outline w-full sm:w-auto" onClick={handleDelete}>
                  Delete
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Reviews display */}
        <div className="space-y-4">
          {reviews.map((rev) => (
            <div key={rev._id} className="bg-base-100 p-4 rounded shadow">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm sm:text-base">{rev.user?.name || 'Anonymous'}</h4>
                <span className="text-yellow-500 font-medium flex items-center gap-1">
                  {rev.rating} <FaStar />
                </span>
              </div>
              <p className="text-gray-700 mt-1 text-sm sm:text-base">{rev.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReviewDisplayPage;
