import { Alert } from "react-bootstrap";
import UserAPIService from "../../../../../services/user_service";
import AdminAPIService from "../../../../../services/admin_service";
import { useEffect, useState } from "react";
import { toast } from 'sonner';
import { AddConfirmationAlert, CustomMultiSelect, LoadingSpinner } from "../../../../../shared/helpers/helper";

export const EditProduct = ({ productId, setActiveComponent }) => {
  const [productDetails, setProductDetails] = useState({
    productName: '',
    description: '',
    price: 0,
    category: '',
    size: [],
    images: [],
  });
  const [card_pic, setCardPic] = useState(null);
  const [images, setImages] = useState(Array(4).fill(null)); 
  const [loading, setLoading] = useState(true);
  const [selectedSizes, setSelectedSizes] = useState([]);


  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await UserAPIService.getProducts({ productId });
        if (response && response.data && response.data.product.length > 0) {
          const product = response.data.product[0];
          console.log("Product:",product);

          setProductDetails(product);

          const sizesArray = product.size.map(size => ({
            value: size,
            label: size
          }));
          setSelectedSizes(sizesArray); 
        } else {
          toast.error('Product not found.');
        }
      } catch (err) {
        console.error('Error fetching product details:', err);
        toast.error('Failed to load product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFileChange = (e, setter) => {
    const file = e.target.files[0];
    if (file) {
      setter(file);
    }
  };

  const handleAdditionalImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedImages = [...images];
      updatedImages[index] = file;
      setImages(updatedImages);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("productName", productDetails.productName);
    formData.append("description", productDetails.description);
    formData.append("price", productDetails.price);
    formData.append("category", productDetails.category);
    formData.append("size", selectedSizes.map(option => option.value));
    formData.append("id", productId);
  
    // Append the images if any
    if (card_pic) {
      formData.append("card_pic", card_pic);
    }
    images.forEach((img) => {
      if (img) {
        formData.append("images", img); 
      }
    });

    console.log("Form data:", formData);
  
    try {
      const response = await AdminAPIService.updateProduct(formData, {id:productId}); 
      if (response.status === 1) {
        AddConfirmationAlert('Product updated successfully!');
        setActiveComponent("Products");
      } else {
        toast.error("Failed to update product.");
      }
    } catch (err) {
      console.error("Error updating product:", err);
      toast.error("Error updating product. Please try again later.");
    }
  };
  

  return (
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-md-12 card rounded-0 shadow p-3">
          <h3 className="dashboard-title">Edit Product</h3>
        </div>
      </div>

      <div className="row card shadow p-3">
        <div className="col-md-12">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="productName" className="col-md-12 text-start">
                  Product Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="col-md-12"
                  id="productName"
                  name="productName"
                  value={productDetails.productName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="col-md-12 text-start">
                  Description <span className="text-danger">*</span>
                </label>
                <textarea
                  className="col-md-12"
                  id="description"
                  name="description"
                  value={productDetails.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="price" className="col-md-12 text-start">
                  Price <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="col-md-12"
                  id="price"
                  name="price"
                  value={productDetails.price}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="category" className="col-md-12 text-start">
                  Category <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="col-md-12"
                  id="category"
                  name="category"
                  value={productDetails.category}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="col-md-12 text-start">
                  Size <span className="text-danger">*</span>
                </label>
                <CustomMultiSelect
                  value={selectedSizes} 
                  onChange={setSelectedSizes}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="card_pic" className="col-md-12 text-start">
                  Product Image <span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  className="col-md-12 p-2"
                  id="card_pic"
                  onChange={(e) => handleFileChange(e, setCardPic)}
                />
              </div>

              <div className="row">
                {Array(4).fill().map((_, index) => (
                  <div className="mb-3 col-md-6" key={index}>
                    <label className="col-md-12 text-start">
                      Additional Image {index + 1} <span className="text-danger">*</span>
                    </label>
                    <input
                      type="file"
                      className="col-md-12 p-2"
                      onChange={(e) => handleAdditionalImageChange(e, index)}
                    />
                  </div>
                ))}
              </div>

              <Alert variant="info">
                <strong>NOTE :</strong> Please upload images smaller than 500KB.
              </Alert>

              <button type="submit" className="form_btn mt-2 px-5">
                Save
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
