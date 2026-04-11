import { useNavigate, useLocation } from "react-router-dom";
import { Footer } from "../../userComponents/footer/footer";
import { Navbar } from "../../userComponents/navbar/navbar";
import UserAPIService from "../../../../services/user_service";
import { useState } from "react";
import { toast } from "sonner";
import { LoadingButton } from "../../../../shared/helpers/helper";

export const FPresetPass = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false); 
    const email = location.state?.email;  

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
           toast.error('Passwords do not match');
            return;
        }

        try {
            const response = await UserAPIService.FPpassReset({ email, password });
            toast.success(response.data.message || 'Password reset successfully');
            navigate('/');
        } catch (error) {
            toast.error(error.response.data.message || 'Error occurred while resetting password');
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5 text-center">
                <h1>Reset Password</h1>
                <form className='p-4 w-50 mx-auto' onSubmit={handleSubmit}>
                    <p className='text-center'>
                        Enter your new password to ensure the security of your account.
                    </p>
                    <div className="mb-3">
                        <label htmlFor="newPassword" className="col-md-12 text-start">
                            New Password <span className='text-danger'>*</span>
                        </label>
                        <input
                            type="password"
                            name="newPassword"
                            className="col-md-12"
                            id="newPassword"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="col-md-12 text-start">
                            Confirm Password <span className='text-danger'>*</span>
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="col-md-12"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <LoadingButton
                    isLoading={isLoading} 
                    type='submit' 
                    className='form_btn mt-2 w-100'>
                        Save
                    </LoadingButton>
                </form>
            </div>
            <Footer />
        </>
    );
}
