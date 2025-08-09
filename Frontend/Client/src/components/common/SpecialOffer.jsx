import React from "react";
import Img from '../../assets/Hunza Valley.jpg'
import Img1 from '../../assets/Mure.jpg'
import Img2 from '../../assets/Nanga Parbat.jpg'
import Img3 from '../../assets/Kalftin-karachi.jpg'
import Img4 from '../../assets/Swat Valley.jpg'
const offers = [
  {
    title: "Summer in Hunza",
    place: "Hunza Valley, Gilgit-Baltistan",
    image:
   Img,
    price: "₨ 45,000",
    description: "5-day trip with guided tours, hotels, and local cuisine."
  },
  {
    title: "Winter in Murree",
    place: "Murree, Punjab",
    image:
      Img1,
    price: "₨ 18,000",
    description: "3-day snowy escape with cozy cottages and bonfire nights."
  },
  {
    title: "Fairy Meadows Adventure",
    place: "Fairy Meadows, Gilgit-Baltistan",
    image:
      Img2,
    price: "₨ 38,000",
    description:
      "4-day hiking experience with Nanga Parbat views and camping."
  },
  {
    title: "Karachi Beach Weekend",
    place: "Clifton Beach, Karachi",
    image:
            Img3,
    price: "₨ 25,000",
    description: "2-day weekend trip with luxury hotel stay by the sea."
  },
  {
    title: "Neelum Valley Blossom Tour",
    place: "Neelum Valley, Azad Kashmir",
    image:
          Img4,
    price: "₨ 32,000",
    description: "5-day springtime trip with flower valley tours."
  }
];

const SpecialOffer = () => {
  return (
    <div className="py-10 bg-gradient-to-b from-[#fef8f6] via-[#fcefe8] to-[#fef8f6]">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Special Offers & Seasonal Highlights
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {offers.map((offer, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-transform transform hover:-translate-y-1"
            >
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{offer.title}</h3>
                <p className="text-sm text-gray-600">{offer.place}</p>
                <p className="mt-2 text-sm text-gray-700">
                  {offer.description}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-bold text-green-700">
                    {offer.price}
                  </span>
                  <button className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialOffer;
