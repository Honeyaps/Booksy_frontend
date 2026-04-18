import { Navbar } from "../navbar/navbar";
import { useEffect, useState } from "react";
import './newin.css';
import { Footer } from "../footer/footer";
import UserAPIService from "../../../../services/user_service";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom"; 
import { LoadingSpinner } from "../../../../shared/helpers/helper";

export const Newin = () => {
    const [activeCategory, setActiveCategory] = useState('All'); 
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [priceRange, setPriceRange] = useState('');
    const navigate = useNavigate();

    const fetchProducts = async (category = activeCategory, priceRangeValue = priceRange) => {
        setLoading(true);
        
        try {
            const response = await UserAPIService.getProducts({
                category: category === 'All' ? '' : category,
                priceRange: priceRangeValue ,
            });
            const products = response.data.product;
            setAllProducts(products); 
            setFilteredProducts(products); 
        } catch (err) {
            console.error('Error fetching products:', err);
            toast.error('Error fetching products. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        fetchProducts(category, priceRange); 
    };

    const handleSortChange = (e) => {
        const selectedPriceRange = e.target.value;
        setPriceRange(selectedPriceRange);
        fetchProducts(activeCategory, selectedPriceRange);
    };



    const handleProductClick = (productId) => {
        navigate(`/product-view/${productId}`); 
    };

    return (
        <>
            <Navbar />
            <div className="container px-5 mt-4">
                {/* Category Filter Buttons */}
                <div className="row">
                    <div className="d-flex text-center justify-content-center flex-wrap gap-5 align-items-center mb-4">
                        {["All", "Fiction", "Non-Fiction", "Academic", "Children","Technology"].map((category) => (
                            <a
                                key={category}
                                href="#"
                                className={`category ${activeCategory === category ? "active" : ""}`}
                                onClick={() => handleCategoryClick(category)} 
                            >
                                {category}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Filter and Sort Options */}
                <div className="row">
                    <div className="col-md-12 d-flex">
                        <p>Sort By :</p>
                        <select className="ms-3 p-2 border filter_box" value={priceRange} onChange={handleSortChange}>
                            <option selected value="">Price</option>
                            <option value="h2l">Price High to Low</option>
                            <option value="l2h">Price Low to High</option>
                        </select>
                    </div>
                </div>

                {/* Display Filtered Products */}
                <div className="row mt-5">
                    {loading ? (
                        <LoadingSpinner />
                    ) : filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div 
                                key={product._id} 
                                className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4"
                                onClick={() => handleProductClick(product._id)} 
                                style={{ cursor: 'pointer' }} 
                            >
                                <img
                                    src={product.card_pic}
                                    alt={product.productName} 
                                    className="card_img img-fluid"
                                />
                                <h6>{product.productName}</h6>
                                <p className="price">RS {product.price}</p>
                            </div>
                        ))
                    ) : (
                        <p>No products found for this category.</p>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
};
