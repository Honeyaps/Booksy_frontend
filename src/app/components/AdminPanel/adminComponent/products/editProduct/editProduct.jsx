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
    category: [],
    images: [],
  });
  const [card_pic, setCardPic] = useState(null);
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(true);

  const categoryOptions = [
    { value: "Fiction", label: "Fiction" },
    { value: "Non-Fiction", label: "Non-Fiction" },
    { value: "Academic", label: "Academic" },
    { value: "Children", label: "Children" },
    { value: "Technology", label: "Technology" }
  ];


  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await UserAPIService.getProducts({ productId });

        if (response && response.data && response.data.product.length > 0) {
          const product = response.data.product[0];
          let categoriesArray = [];

if (Array.isArray(product.category)) {
  categoriesArray = product.category;
} else if (typeof product.category === "string") {
  try {
    categoriesArray = JSON.parse(product.category);
  } catch {
    categoriesArray = [product.category]; // fallback
  }
}

          const formattedCategories = categoriesArray.map(cat => ({
            value: cat,
            label: cat
          }));

          // ✅ set updated product details
          setProductDetails({
            ...product,
            category: formattedCategories
          });
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


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", productDetails.productName);
    formData.append("description", productDetails.description);
    formData.append("price", productDetails.price);
    formData.append("category", JSON.stringify(productDetails.category.map(item => item.value)));
    formData.append("id", productId);
    formData.append("card_pic", card_pic);
    formData.append("images", images);

    try {
      const response = await AdminAPIService.updateProduct(formData, { id: productId });
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
          <h3 className="dashboard-title">Edit</h3>
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
                <CustomMultiSelect
                  value={productDetails.category}
                  onChange={(selected) =>
                    setProductDetails((prev) => ({
                      ...prev,
                      category: selected
                    }))
                  }
                  options={categoryOptions}
                  placeholder="Select Categories"
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
                <div className="mb-3">
                  <label className="col-md-12 text-start">
                    Additional Image
                  </label>
                  <input
                    type="file"
                    className="col-md-12 p-2"
                    onChange={(e) => setImages(e.target.files[0])}
                  />
                </div>
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
