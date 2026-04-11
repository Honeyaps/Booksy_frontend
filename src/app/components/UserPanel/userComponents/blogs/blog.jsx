import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const cardsData = [
  {
    title: "Vibrant and Clear: The Benefits of AMOLED Displays in Smartwatches",
    text: "Discover the advantages of AMOLED Display Smartwatches!",
    date: "27 Sep, 2024",
    readTime: "5 min read",
    image: "image1.jpg", 
    alt: "AMOLED Smartwatch",
  },
  {
    title: "Boosting Productivity with Smartwatches",
    text: "How smartwatches are helping to boost productivity.",
    date: "14 Jun, 2024",
    readTime: "5 min read",
    image: "image2.jpg",
    alt: "Smartwatches Boosting Productivity",
  },
  {
    title: "Gyaan for the Inquisitive boAtheads: How to Save Yourself",
    text: "Issued in boAtheads' interest.",
    date: "13 Jun, 2024",
    readTime: "5 min read",
    image: "image3.jpg", 
    alt: "Gyaan for boAtheads",
  },
];

const Card = ({ card }) => (
  <div className="col-md-4">
    <div className="card h-100">
      <img src={card.image} className="card-img-top" alt={card.alt} />
      <div className="card-body">
        <h5 className="card-title">{card.title}</h5>
        <p className="card-text">{card.text}</p>
      </div>
      <div className="card-footer col-md-12 d-flex justify-content-between">
      <p className="col-md-6">{card.date}</p>
      <p className="text-success  text-end col-md-6">{card.readTime}</p>
      </div>
    </div>
  </div>
);

export const Blog = () => {
  return (
    <div className="container">
      <div className="row">
        {cardsData.map((card, index) => (
          <Card card={card} key={index} />
        ))}
      </div>
    </div>
  );
};

