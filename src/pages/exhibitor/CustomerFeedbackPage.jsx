import React from 'react';
import { Star } from 'lucide-react';

function CustomerFeedbackPage() {
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
          <p className="text-3xl font-bold mt-2">325</p>
        </div>
        <div className="bg-base-100 p-4 rounded-xl shadow text-center">
          <h2 className="text-lg font-semibold">Avg. Rating</h2>
          <p className="text-3xl font-bold mt-2">4.3</p>
        </div>
        <div className="bg-base-100 p-4 rounded-xl shadow text-center">
          <h2 className="text-lg font-semibold">Positive Reviews</h2>
          <p className="text-3xl font-bold mt-2">278</p>
        </div>
        <div className="bg-base-100 p-4 rounded-xl shadow text-center">
          <h2 className="text-lg font-semibold">Negative Reviews</h2>
          <p className="text-3xl font-bold mt-2">47</p>
        </div>
      </div>

      {/* Feedback List */}
      <div className="bg-base-100 p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Feedback</h2>
        <div className="space-y-4">
          {/* Feedback Card */}
          {[1, 2, 3].map((item) => (
            <div key={item} className="border border-base-300 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Sunshine Cinema - Chennai</h3>
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                  <Star size={16} />
                </div>
              </div>
              <p className="text-base-content/70">
                Great experience overall. Clean seats, good sound. Will definitely come again!
              </p>
              <p className="text-sm text-base-content/50 mt-2">— Riya, 2025-04-06</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomerFeedbackPage;
