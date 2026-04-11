import React, { useEffect, useState } from 'react';
import './specialCard.css';
import UserAPIService from '../../../../services/user_service';
import { toast } from 'sonner';
import { LoadingSpinner } from '../../../../shared/helpers/helper';
import { useNavigate } from 'react-router-dom';

export const SpecialCard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const limit = 4;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await UserAPIService.getProducts({ limit });
        const filteredProducts = response.data.product.filter(
          (product) => product.category === 'Homecard'
        );
        setProducts(filteredProducts);
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
        <div className="col-md-12 ">
          <img
            src="/main_pics/crousel_pic1.jpg"
            alt="styles"
            className="img-fluid crousel_pic"
          />
        </div>
      </div>

      <h1 className='mt-5 text-center'>
        Discover Stories That Inspire, Educate & Transform Your Mind 📚
      </h1>
      <p className="text-center text-muted mt-2">
        Explore our curated collection of bestsellers, timeless classics, and must-read books.
      </p>

      <div className="row mt-4 justify-content-center">
        {products.map((product, index) => (
          <div
            className="col-md-6 mt-5"
            key={index}
            style={{ cursor: 'pointer' }}
            onClick={() => handleProductClick(product._id)}>
            <img
              src={product.card_pic}
              alt={product.name}
              className="img-fluid"
            />
            <h6>{product.productName}</h6>
            <p className="price">{product.price} RS</p>
          </div>
        ))}

      </div>
    </div>
  );
};
