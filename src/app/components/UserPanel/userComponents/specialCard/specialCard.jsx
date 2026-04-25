import React, { useEffect, useState } from 'react';
import './specialCard.css';
import UserAPIService from '../../../../services/user_service';
import { toast } from 'sonner';
import { LoadingSpinner } from '../../../../shared/helpers/helper';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

 const SpecialCard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const limit = 4;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await UserAPIService.getProducts({ limit , category: "Fiction"});
        setProducts(response.data.product);
      } catch (err) {
        console.error('Error fetching products:', err);
        toast.error('Error fetching products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product-view/${productId}`);
  };

  if (loading) {
    return <div className="loading">
      <LoadingSpinner />
    </div>;
  }

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div
          id="productCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="2000"
        >
          <div className="carousel-inner">

            {/* Slide 1 */}
            <div className="carousel-item active">
              <img
                src="/main_pics/c1.png"
                className="d-block w-100 h-100 cardView_imgs"
                alt="Product 1"
                loading="lazy"
              />
            </div>

            {/* Slide 2 */}
            <div className="carousel-item">
              <img
                src="/main_pics/c2.png"
                className="d-block w-100 h-100 cardView_imgs"
                alt="Product 2"
                loading="lazy"
              />
            </div>

            {/* Slide 3 */}
            <div className="carousel-item">
              <img
                src="/main_pics/c3.png"
                className="d-block w-100 h-100 cardView_imgs"
                alt="Product 3"
                loading="lazy"
              />
            </div>

          </div>

          {/* Previous Button */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#productCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>

          {/* Next Button */}
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#productCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>

      <h1 className='mt-5 text-center'>
        Discover Stories That Inspire, Educate & Transform Your Mind
      </h1>
      <p className="text-center text-muted mt-2">
        Explore our curated collection of bestsellers, timeless classics, and must-read books.
      </p>

      <div className="row mt-4 justify-content-center">
        {products.map((product, index) => (
          <div
            className="col-md-3 mt-5"
            key={index}
            style={{ cursor: 'pointer' }}
            onClick={() => handleProductClick(product._id)}>
            <img
              src={product.card_pic}
              alt={product.name}
              className="card_img w-100 h-100"
            />
            <h6 className='mt-2'>{product.productName}</h6>
            <p className="price">{product.price} RS</p>
          </div>
        ))}

      </div>
      <br />
      <h1 className='mt-5'>
        Explore Our Book Collection
      </h1>
    </div>
  );
};

export default SpecialCard;
