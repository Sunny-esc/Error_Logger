import Carousel from "../comp/coursel";

import Cardw from "../comp/card";
import SimplePaper from "../comp/contact";
import Header from "../assets/header";
import Footer from "../assets/footer";
import App from "../assets/firstpage";
import { Toaster } from "react-hot-toast";

export default function Main() {
  return (
    <>
    
        <Header/>
      <div>
        <App />
        <Carousel />
      </div>
      <div className="">
        <SimplePaper />
      </div>

      <div className=" mx-18">
      </div>
      <div>
        <Toaster/>
      </div>
       <Footer/>
    </>
  );
}


