import { Footer } from "../footer/footer"
import { Navbar } from "../navbar/navbar"

export const FindStore = () => {
    return (
        <>
            <Navbar />
            <div className="container mt-5">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.318350080037!2d75.7606030752237!3d26.893389976658636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db46062462eaf%3A0xb61843c9a5b21455!2sH%26K%20Exports%20(Leather%20Products)!5e0!3m2!1sen!2sin!4v1727887285927!5m2!1sen!2sin" width="1300" height="500"></iframe>
            </div>
            <Footer/>
        </>
    )

}

