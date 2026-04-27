import React, { useEffect, useState } from "react";
import { Footer } from "../footer/footer";
import { Navbar } from "../navbar/navbar";
import UserAPIService from "../../../../services/user_service";
import { useNavigate } from "react-router-dom";
import { RiArrowRightLine } from "react-icons/ri";

export const Favourites = () => {
    const [cartItems, setCartItems] = useState([]);
    const [saleDate, setSaleDate] = useState("");
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await UserAPIService.getCartItems({ userId });
                const suggestedItems = response.data.product.filter(item => item.status === -9);
                setCartItems(suggestedItems);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        const today = new Date();
        const tenDaysLater = new Date(today.setDate(today.getDate() + 10));

        // Format the date as needed
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = tenDaysLater.toLocaleDateString(undefined, options);

        // Set the sale date in state
        setSaleDate(formattedDate);

        fetchCartItems();
    }, [userId]);

    const handleProductClick = (productId) => {
        navigate(`/product-view/${productId}`);
    };

    return (
        <>
            <Navbar />
            <div className="container-fluid">
                <h1 className="mt-3">Recommended Books Just for You</h1>
                <div className="row mt-3">
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <div
                                key={item.productId}
                                className="col-lg-2 col-md-3 col-sm-4 col-6"
                                style={{ cursor: 'pointer' }}
                            >
                                <div
                                    className="product-card"
                                    onClick={() => handleProductClick(item.productId)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <img
                                        src={item.productDetail?.card_pic}
                                        alt={item.productDetail?.productName}
                                        className="product-img"
                                    />
                                    <h6 className="product-title">
                                        {item.productDetail?.productName}
                                    </h6>
                                    <p className="price">
                                        Rs. {item.productDetail?.price}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center mt-5">
                            <h6 className=" text-muted">
                                The upcoming sale is going to start on <strong>{saleDate}</strong>
                                <br />
                            </h6>

                            <a href="/newin" className="mx-3 text-decoration-none text-dark mt-3">Explore more <RiArrowRightLine /></a>
                        </div>

                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};
