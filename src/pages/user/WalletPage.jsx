import React, { useState } from 'react';

function WalletPage() {
  const [savedCards, setSavedCards] = useState([]); // Add dummy data here to test card layout

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">💳 My Wallet</h1>

      {savedCards.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="Empty Wallet"
            className="w-40 h-40 mb-6 opacity-70"
          />
          <p className="text-lg font-medium">No saved cards found.</p>
          <button className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition">
            Add New Card
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {savedCards.map((card, index) => (
            <div
              key={index}
              className="w-full p-5 bg-gradient-to-r from-slate-900 to-slate-700 rounded-2xl text-white shadow-md"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">{card.cardType}</span>
                <span className="text-sm text-gray-300">••• {card.last4}</span>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-sm text-gray-400">Card Holder</p>
                  <p className="text-base">{card.holderName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Expires</p>
                  <p className="text-base">{card.expiry}</p>
                </div>
              </div>
            </div>
          ))}
          <button className="w-full mt-4 px-5 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition">
            Add New Card
          </button>
        </div>
      )}
    </div>
  );
}

export default WalletPage;
