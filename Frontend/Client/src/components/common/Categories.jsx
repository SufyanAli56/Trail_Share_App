import React from 'react';

const categories = [
  {
    name: 'Beaches',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80'
  },
  {
    name: 'Mountains',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=500&q=80'
  },
  {
    name: 'Cities',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=500&q=80'
  },
  {
    name: 'Adventure',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=80'
  },
  {
    name: 'Cultural',
    image: 'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=500&q=80'
  },
  {
    name: 'Wildlife',
    image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=500&q=80'
  }
];

const Categories = ({ onCategorySelect }) => {
  return (
    <div className="py-8 bg-gradient-to-b from-[#f8f5f2] via-[#f2e8e5] to-[#f8f5f2]">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Categories</h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => onCategorySelect?.(cat.name)}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-xl transition-transform duration-300 cursor-pointer focus:outline-none flex flex-col"
            >
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-40 object-cover"
              />
              {/* Text */}
              <div className="p-4 flex-1 flex items-center justify-center">
                <p className="font-semibold text-gray-800 text-lg">{cat.name}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
