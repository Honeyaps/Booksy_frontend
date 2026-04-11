import { useRef, useState } from "react";
import { Footer } from "../../userComponents/footer/footer";
import { Navbar } from "../../userComponents/navbar/navbar";
import { Alert } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import UserAPIService from "../../../../services/user_service";
import { toast } from "sonner";
import { LoadingButton } from "../../../../shared/helpers/helper";

export const FPOtp = () => {
    const [otpValues, setOtpValues] = useState(Array(4).fill(""));
    const navigate = useNavigate();
    const location = useLocation(); 
    const email = location.state?.email;
    const inputRefs = useRef([]);
    const [isLoading, setIsLoading] = useState(false); 

    const handleChange = (e, index) => {
        const newOtpValues = [...otpValues];
        newOtpValues[index] = e.target.value;
        setOtpValues(newOtpValues);

        if (e.target.value && index < otpValues.length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otpValues[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const otp = parseInt(otpValues.join(""), 10);
        try {
            const response = await UserAPIService.FPverifyOtp({ otp, email });
            navigate("/request-resetpassword/otp/reset-password", { state: { email } });
        } catch (error) {
            toast.error(error.response.data.message || "Error occurred while signing up");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <div className="container mt-5 text-center">
                <h1>OTP Verification</h1>
                <Alert variant="success" className="w-25 mx-auto mt-3">
                    We have sent a Verification code to your email -
                    {email}
                </Alert>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 d-flex justify-content-center">
                        {otpValues.map((value, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                className="mx-2 py-2 px-3 text-center"
                                value={value}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                ref={(el) => (inputRefs.current[index] = el)}
                                style={{ width: "50px", textAlign: "center" }}
                            />
                        ))}
                    </div>
                    <LoadingButton
                    isLoading={isLoading}  
                    className="form_btn w-25 mx-auto">
                        Verify OTP
                    </LoadingButton>
                </form>
            </div>

            <Footer />
        </>
    );
};
