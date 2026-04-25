import { useEffect, useState } from "react";
import UserAPIService from "../../../../services/user_service";
import { IoArrowForwardSharp } from "react-icons/io5";
import './card.css';
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

 const Card = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const limit = 12;

    useEffect(() => {
        const fetchProducts = async () => {
          setLoading(true);
          try {
            const response = await UserAPIService.getProducts({ limit });
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

    return (
        <div className="container-fluid">
            <div className="row">
                {products.map((product) => (
                    <div 
                    className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4 mt-4"
                    key={product._id} 
                    onClick={() => handleProductClick(product._id)} 
                    style={{ cursor: 'pointer' }} 
                    >
                    <img
                        src={product.card_pic}
                        alt="styles"
                        className="card_img img-fluid w-100 h-100"
                    />
                    <h6>{product.productName}</h6>
                    <p className="price">₹ {product.price}</p>
                </div>
                    
                ))}
                <div className="text-end col-md-12 mt-4">
                <a href="/newin" className="ext-decoration-none text-dark">
                    View All <IoArrowForwardSharp className="mb-1 mx-1 nav-icon" />
                </a>
                </div>
                
            </div>
        </div>
    );
};

export default Card;
