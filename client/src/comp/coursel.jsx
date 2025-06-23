import { useState, useEffect } from "react";
import x1 from "../assets/img/x1.jpg";
import Wallpaper from "../assets/img/Wallpaper.jpeg";
import abc from "../assets/img/abc.jpeg";
import right from "../assets/svgs/right.svg";
import left from "../assets/svgs/left.svg";
import cart from "../assets/svgs/cart.svg";
import { Link } from "react-router";

function Coursel({ slide }) {
  {
    /* pending ma data taken from user baki hai*/
  }
  const data = [
    {
      title: "Begin Your Coding Adventure",
      name: "Join Our Coding Community",
      description:
        "Launch your development career by creating real-world projects and mastering the basics.",
      img: x1,
    },
    {
      title: "Building and Deploying Applications,",
      name: "Full-Stack Application Projects,",
      description:
        "Learn to develop full-stack applications using the latest technologies such as React, Node.js, and MongoDB.",
      img: Wallpaper,
    },
    {
      title: "Join a Community",
      name: "Collaborate and Grow",
      description:
        "Connect with fellow developers, participate in hackathons, and grow together through coding.",
      img: abc,
    },
  ];

  const [current, setCurrent] = useState(0);

  const [ishover, setHover] = useState(0);

  //slide automatation
  useEffect(() => {
    if (ishover) return;

    const interval = setInterval(() => {
      next();
    }, 4000);

    return () => clearInterval(interval);
  }, [current, ishover]);

  const next = () => {
    setCurrent((prev) => (prev === slide.length - 1 ? 0 : prev + 1));
  };

  const prevs = () => {
    setCurrent((prev) => (prev === 0 ? slide.length - 1 : prev - 1));
  };
  const slideData = data[current]; // Get the current slide data
  {
    /*side setting idhar hai */
  }
  return (
    <>
      <div className="mt-10 mb-10 bg-transparent shadow-2xl rounded-2xl md:mx-6 px-4 py-6">
  {/* Title */}
  <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">
    {slideData.title}
  </h1>

  {/* Name */}
  <h2 className="text-xl md:text-2xl font-medium text-center  mb-6">
    {slideData.name}
  </h2>

  {/* Image Container */}
  <div className="flex items-center justify-center ">
    <div className="relative w-full max-w-4xl">
      <img
        src={slide[current]}
        alt="slide"
        className="w-full h-[210px] md:h-[500px] object-cover rounded-2xl shadow-lg transition duration-300"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />
    

            {/* Text and buttons on the image */}
           <div className="w-full flex flex-col md:flex-row mt-4 justify-between items-center md:items-end rounded-xl p-6 bg-white/80 shadow-lg gap-6 md:gap-0">
  
  {/* Left Description */}
  <p className="hidden md:block w-1/2 text-gray-700 text-base leading-relaxed">
    {slideData.description}
  </p>

  {/* Button Section (Desktop only) */}
  <div className="hidden md:flex items-center gap-4 md:w-[300px] justify-end">
    <button >
     <Link to='/docs' className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-400 to-blue-300 px-5 py-3 text-black font-medium transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"> <img src={cart} alt="Cart icon" className="w-6 h-6" />
      <span>Read the docs</span></Link>
     
    </button>
  </div>
</div>


            {/* Mobile view description and buttons */}

            <div className="md:hidden bg-white/20 backdrop-blur-md border border-white/30  my-2 rounded-xl p-3 w-full flex flex-col items-start gap-2 shadow">
              <div className=" ">{slideData.description}</div>

              {/* Price + Checkout buttons */}
              <div className="flex items-center flex-wrap">
                <div className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-300 to-blue-200 px-3 py-1 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                  <button >
                    <Link to='docs' className="flex items-center gap-2">   <img src={cart} alt="cart-icon" className="w-5 h-5" />
                    <span className="text-black">Read docs </span> </Link>
                   
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation buttons left aur right ka liya*/}
            <button
              onClick={prevs}
              className="absolute top-1/2 left-4 md:left-20 transform -translate-y-1/2 bg-white/70 rounded-full p-2 shadow-md hover:bg-white w-8 md:w-9 transition-all duration-300 ease-in-out hover:scale-120"
            >
              <img src={left} alt="" />
            </button>
            <button
              onClick={next}
              className="absolute text-black top-1/2   right-3 md:right-20 transform -translate-y-1/2 bg-white/70 rounded-full w-8 p-2 md:w-9 transition-all duration-300 ease-in-out hover:scale-120 shadow-md hover:bg-white "
            >
              <img src={right} alt="" />{" "}
            </button>
            {/* end for navigation buttons */}
          </div>
        </div>
      </div>
    </>
  );
}
{
  /* Carousel component ,yeh component import hota hai har jagh */
}
const Carousel = () => {
  const images = [x1, Wallpaper, abc];

  return (
    <div className="pt-20">
      <Coursel slide={images} />
    </div>
  );
};

export default Carousel;
