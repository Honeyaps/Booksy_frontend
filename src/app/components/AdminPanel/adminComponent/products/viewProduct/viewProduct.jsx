import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PiBag } from "react-icons/pi";
import { CiTimer } from "react-icons/ci";
import "./viewProduct.css";
import { CiDeliveryTruck } from "react-icons/ci";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserAPIService from "../../../../../services/user_service";

export const ViewProduct = ({productId}) => {
  const [product, setProduct] = useState(null);

  const settings = {
    vertical: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserAPIService.getProducts({productId});
        setProduct(response.data.product[0]);
        console.log(response.data.product[0]);
      } catch (error) {
        console.error(error);
      }
      
    }
    
    fetchData();
  }, [ productId ]);
  


  

  return (
    <>
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-7 product_imgs">
           {product?.images?.length > 0 && (
              <img
                src={product.images[0]}
                alt="Product"
                className="cardView_imgs"
              />
            )}
          </div>

          <div className="col-md-5 about_product">
            <div>
              <h1>{product?.productName}</h1>
              <h6 className="price">Rs. {product?.price}</h6>
              <img
                src={product?.card_pic}
                alt=""
                className="img-fluid border border-dark my-3"
                style={{ width: "13%" }}
              />
              <h6 className="mt-3">DESCRIPTION</h6>
              <p>
                {product?.description}
              </p>
              <h6 className="mt-4">
                <CiTimer className="nav-icon fs-4" /> Delivery within 2-7 days
              </h6>
              <h6 className="mt-4">
                <CiDeliveryTruck className="nav-icon fs-4" /> Free shipping
              </h6>
              <button className="bg-transparent form_btn text-black border border-black w-100 mt-3">
                BUY NOW
              </button>
              <button className="form_btn w-100 mt-3">
                <PiBag className="nav-icon" /> Add to Cart
              </button>
              
            </div>

            {/* <div class="col-md-12 mt-5">
              <fieldset>
                <legend>Comments</legend>
                <div className="row mx-0">

                  <div className="col-md-12">
                    <form className="">
                      <div className="mb-3">
                        <label for="addComment" className="col-md-12">Add a comment</label>
                        <textarea className="col-md-12" id="addComment"></textarea>
                        <div className="d-flex justify-content-end">
                          <button type="submit" className="form_btn col-md-12 mt-3 w-25">Post</button>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label for="name" className="col-md-12">@Name</label>
                        <div>ljkldbvalbvldb</div>
                      </div>
                    </form>
                  </div>

                </div>
              </fieldset>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
