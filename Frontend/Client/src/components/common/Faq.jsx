import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqData = [
  {
    question: 'What destinations do you offer tours to?',
    answer:
      'We offer tours to various international and domestic destinations, including adventure getaways, cultural explorations, and beach vacations.',
  },
  {
    question: 'How can I book a tour with Tarvil Travels?',
    answer:
      'You can book directly through our website, contact our customer support team, or visit one of our local offices for assistance.',
  },
  {
    question: 'Do you offer group discounts?',
    answer:
      'Yes, we offer discounts for groups of 5 or more. Please contact us for customized group travel packages.',
  },
  {
    question: 'Are your tours suitable for solo travelers?',
    answer:
      'Absolutely! Many of our travelers join solo. We ensure a welcoming and inclusive group experience.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept Visa, MasterCard, PayPal, Apple Pay, and other major payment providers.',
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="bg-gradient-to-b from-[#f8f5f2] mt-12 via-[#f2e8e5] to-[#f8f5f2] text-gray-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 border-b-2 border-red-300 inline-block pb-2">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md border border-red-100 transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-4 focus:outline-none flex items-center justify-between"
              >
                <span className="text-lg font-semibold">{faq.question}</span>
                {activeIndex === index ? (
                  <FaChevronUp className="text-red-500" />
                ) : (
                  <FaChevronDown className="text-red-500" />
                )}
              </button>

              <div
                className={`px-6 pb-4 text-gray-600 transition-all duration-300 ${
                  activeIndex === index ? 'block' : 'hidden'
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
