import { useNavigate } from "react-router-dom";
import { Footer } from "../../userComponents/footer/footer"
import { Navbar } from "../../userComponents/navbar/navbar"
import UserAPIService from "../../../../services/user_service";
import { useState } from "react";
import { LoadingButton } from "../../../../shared/helpers/helper";
import { toast } from "sonner";


export const FPEmail = () => {
    const [formData, setFormData] = useState({
        email: '' 
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); 

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await UserAPIService.FPemailVerify({ email: formData.email });
            navigate('/request-resetpassword/otp', { state: { email: formData.email } });
        } catch (error) {
            toast.error(error.response.data.message || 'Error occurred while signing up');
        } finally {
            setIsLoading(false);
        }

        
    };
    return (
        <>
            <Navbar />

            <div className="container mt-5 text-center">
                <h1>Forget Password ?</h1>
                <form className='p-4 w-50 mx-auto' onSubmit={handleSubmit}>
                    <p className='text-center'>
                        Please enter the email address used to create your account, and we'll send you a link to reset your password.
                    </p>
                    <div className="mb-3">
                        <label htmlFor="email" className="col-md-12 text-start">
                            Email <span className='text-danger'>*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="col-md-12"
                            id="email"
                            value={formData.email}
                            onChange={handleOnChange}
                            required
                        />
                    </div>

                    <LoadingButton  
                    isLoading={isLoading}  
                    type='submit' 
                    className='form_btn mt-2 w-100'>
                        Submit
                    </LoadingButton>
                </form>
            </div>

            <Footer />
        </>
    )
}