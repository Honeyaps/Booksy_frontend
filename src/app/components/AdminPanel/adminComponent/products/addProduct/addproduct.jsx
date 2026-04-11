import React, { useState } from 'react';
import { AddConfirmationAlert , CustomMultiSelect, LoadingButton} from "../../../../../shared/helpers/helper";
import AdminAPIService from '../../../../../services/admin_service';
import { toast } from 'sonner';
import { Alert } from 'react-bootstrap';

export const AddProduct = ({ setActiveComponent}) => {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [size, setSize] = useState([]);
    const [card_pic, setCardPic] = useState(null);
    const [images, setImages] = useState(Array(4).fill(null));
    const [isLoading, setIsLoading] = useState(false); 

    const handleInputChange = (e, setter) => setter(e.target.value);

    const handleFileChange = (e, setter) => {
        const file = e.target.files[0];
        if (file) {
            setter(file);
        }
    };

    const validateForm = () => {
        if (!productName || !description || !price || !category || !size || !card_pic || !images) {
            toast.error('Please fill all the required fields');
            return false;
        }
    }

    const handleAddProduct = async (e) => {
        e.preventDefault();

       

        setIsLoading(true);

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('size', size.map(item => item.value).join(','));
        if (card_pic) {
            formData.append('card_pic', card_pic);
        }
        images.forEach((img) => {
            if (img) {
                formData.append('images', img); 
            }
        });

         // 🔥 DEBUG
    console.log([...formData.entries()]);

        try {
            const response = await AdminAPIService.AddProduct(formData);
            console.log(response);
            AddConfirmationAlert('Product added successfully!');
            resetForm();
            setActiveComponent('Products');
        } catch (error) {
             console.error(error);
        toast.error(error?.response?.data?.message || 'Error while adding product');
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setProductName('');
        setDescription('');
        setPrice('');
        setCategory('');
        setSize([]);
        setCardPic(null);
        setImages(Array(4).fill(null));
    };

    return (
        <div className="container-fluid">
            <div className="row mb-2">
                <div className="col-md-12 card rounded-0 shadow p-3">
                    <h3 className="dashboard-title">Add Product</h3>
                </div>
            </div>

            <div className="row card shadow p-3">
                <div className="col-md-12">
                    <form onSubmit={handleAddProduct}>
                        <div className="mb-3">
                            <label htmlFor="productName" className="col-md-12 text-start">
                                Product Name <span className="text-danger">*</span>
                            </label>
                            <input
                                type="text"
                                className="col-md-12"
                                id="productName"
                                value={productName}
                                onChange={(e) => handleInputChange(e, setProductName)}
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
                                value={description}
                                onChange={(e) => handleInputChange(e, setDescription)}
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
                                value={price}
                                onChange={(e) => handleInputChange(e, setPrice)}
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
                                value={category}
                                onChange={(e) => handleInputChange(e, setCategory)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="col-md-12 text-start">
                                Size <span className="text-danger">*</span>
                            </label>
                            <CustomMultiSelect
                                value={size}
                                onChange={setSize}
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
                                required
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
                                        onChange={(e) => {
                                            const updatedImages = [...images];
                                            updatedImages[index] = e.target.files[0];
                                            setImages(updatedImages);
                                        }}
                                        required
                                    />
                                </div>
                            ))}
                        </div>
                        <Alert variant="info"><strong>NOTE :</strong> Please upload images smaller than 500KB.</Alert>

                       <button
  type="submit"
  className="form_btn mt-2 px-5 rounded-0"
  disabled={isLoading}
>
  {isLoading ? "Saving..." : "Save"}
</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
