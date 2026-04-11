import { Footer } from "../footer/footer"
import { Navbar } from "../navbar/navbar"

export const Customer = () => {
    return (
        <>
            <Navbar />

            <div className="container mt-5 text-center">
                <h1>Customer Service</h1>
                <form className='p-4 border rounded w-50 mx-auto'>
                    <p className='text-center'> We’re here to help with any questions, feedback, or support you may need.</p>
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
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="message" className="col-md-12 text-start">
                            Message <span className='text-danger'>*</span>
                        </label>
                        <textarea
                            name="message" className="col-md-12 p-2" id="message" rows="5" placeholder="Enter your message" required 
                        ></textarea>
                    </div>

                    <button type='submit' className='form_btn mt-2 w-100'>
                        Sign in
                    </button>
                </form>
                <p className="mt-5">For questions regarding your personal data, and instructions on how to access or delete your stored information, please visit our Privacy Notice.</p>

            </div>

            <Footer />
        </>
    )
}