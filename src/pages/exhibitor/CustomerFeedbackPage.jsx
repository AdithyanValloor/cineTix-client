import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { Star } from 'lucide-react';

function CustomerFeedbackPage() {
  const [theaters, setTheaters] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTheaters = async () => {
      try {
        const res = await axiosInstance.get('/theater/list-theaters', {
          withCredentials: true,
        });
        setTheaters(res.data.data);
      } catch (err) {
        console.error('Error fetching theaters:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTheaters();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const allReviews = [];
        for (const theater of theaters) {
          
          const theaterId = theater._id

          console.log(theaterId);
          

          const res = await axiosInstance.get(`/reviews/get-review/${theaterId}`);
  
          console.log("RES : ", res);
  
          allReviews.push(...res.data.data);
        }
        setReviews(allReviews);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };
  
    if (theaters.length > 0) {
      fetchReviews();
    }
  }, [theaters]);
  

  // Calculate the review stats: total, average, positive/negative
  const totalReviews = reviews.length;
  const avgRating = totalReviews
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
    : 0;
  const positiveReviews = reviews.filter((review) => review.rating >= 4).length;
  const negativeReviews = reviews.filter((review) => review.rating < 4).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-base-200 p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold">Customer Feedback</h1>
        <p className="text-base-content/70">See what your customers are saying.</p>
      </div>

      {/* Feedback Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-base-100 p-4 rounded-xl shadow text-center">
          <h2 className="text-lg font-semibold">Total Feedback</h2>
          <p className="text-3xl font-bold mt-2">{totalReviews}</p>
        </div>
        <div className="bg-base-100 p-4 rounded-xl shadow text-center">
          <h2 className="text-lg font-semibold">Avg. Rating</h2>
          <p className="text-3xl font-bold mt-2">{avgRating}</p>
        </div>
        <div className="bg-base-100 p-4 rounded-xl shadow text-center">
          <h2 className="text-lg font-semibold">Positive Reviews</h2>
          <p className="text-3xl font-bold mt-2">{positiveReviews}</p>
        </div>
        <div className="bg-base-100 p-4 rounded-xl shadow text-center">
          <h2 className="text-lg font-semibold">Negative Reviews</h2>
          <p className="text-3xl font-bold mt-2">{negativeReviews}</p>
        </div>
      </div>

      {/* Feedback List */}
      <div className="bg-base-100 p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Feedback</h2>
        <div className="space-y-4">
          {/* Feedback Card */}
          {reviews.slice(0, 3).map((review) => (
            <div key={review._id} className="border border-base-300 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">
                  {review.theater?.name || 'Theater Name'}
                </h3>
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <Star key={i + 5} size={16} />
                  ))}
                </div>
              </div>
              <p className="text-base-content/70">{review.comment}</p>
              <p className="text-sm text-base-content/50 mt-2">
                — {review.user?.name || 'Anonymous'}, {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomerFeedbackPage;
