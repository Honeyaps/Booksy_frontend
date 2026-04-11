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
          <Slider {...settings}>
              {product?.images.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`Product image ${index + 1}`} 
                    className="cardView_imgs"
                  />
                </div>
              ))}
            </Slider>
          </div>

          <div className="col-md-5 about_product">
            <div>
              <h1>{product?.productName}</h1>
              <h6 className="price">RS. {product?.price}.00</h6>
              <img
                src={product?.card_pic}
                alt=""
                className="img-fluid border border-dark my-3"
                style={{ width: "13%" }}
              />
              <h6>SIZES</h6>
              <div className="row d-flex gap-2 my-3 mx-1">
                <button className="col-md-2 border border-dark p-2 text-center bg-transparent">
                  XXS
                </button>
                <button className="col-md-2 border border-dark p-2 text-center bg-transparent">
                  XS
                </button>
                <button className="col-md-2 border border-dark p-2 text-center bg-transparent">
                  S
                </button>
                <button className="col-md-2 border border-dark p-2 text-center bg-transparent">
                  M
                </button>
                <button className="col-md-2 border border-dark p-2 text-center bg-transparent">
                  L
                </button>
                <button className="col-md-2 border border-dark p-2 text-center bg-transparent">
                  XL
                </button>
                <button className="col-md-2 border border-dark p-2 text-center bg-transparent">
                  XXL
                </button>
                <button className="col-md-2 border border-dark p-2 text-center bg-transparent">
                  XXXL
                </button>
              </div>
              <h6 className="mt-3">DESCRIPTION</h6>
              <p>
                {product?.description}
              </p>
              <button className="bg-transparent form_btn text-black border border-black w-100">
                BUY NOW
              </button>
              <button className="form_btn w-100 mt-3">
                <PiBag className="nav-icon" /> Add
              </button>
              <h6 className="mt-4">
                <CiTimer className="nav-icon fs-4" /> Delivery within 2-7 days
              </h6>
              <h6 className="mt-4">
                <CiDeliveryTruck className="nav-icon fs-4" /> Free shipping above
                1999
              </h6>
              <h6 className="mt-4">Materials</h6>
              <p>
                Composition <br />
                Polyester 60%, Viscose 35%, Elastane 5% Additional material
                information The total weight of this product contains: 70%
                Recycled polyester 25% LENZING™ ECOVERO™ viscose We exclude the
                weight of minor components such as, but not exclusively: threads,
                buttons, zippers, embellishments and prints. The total weight of
                the product is calculated by adding the weight of all layers and
                main components together. Based on that, we calculate how much of
                that weight is made out by each material. For sets & multipacks
                all pieces are counted together as one product in calculations.
              </p>
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
