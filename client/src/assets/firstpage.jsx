import TechCarousel from "../comp/scroll"; // Adjust the import path as necessary
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Signbutton from "../comp/signbutton";
import SplitText from "./splitText";
import { dark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useState } from "react";
const App = () => {
  return (
    <main className="pt-10">
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Left Column - Typography */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="relative">
                <SplitText
                  text="ERROR"
                  className="text-6xl md:text-8xl font-bold tracking-tight "
                  delay={200}
                  duration={0.6}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                />
              </div>

              <div className="relative inline-block">
                <div className="absolute inset-0 border-2  rounded-full transform rotate-12"></div>
                <SplitText
                  text="LOGGER"
                  className="text-6xl md:text-8xl font-bold tracking-tight relative z-10 px-8 py-4"
                  delay={400}
                  duration={0.6}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                />
              </div>
            </div>

            <div className="text-sm font-medium text-gray-500 tracking-wider">
              ONE FOR EVERY LANGUAGE
            </div>
          </div>

          {/* Right Column - Description */}
          <div className="space-y-8 lg:pl-16">
            <div className="relative min-h-[50vh]  flex items-end  justify-center overflow-hidden ">
              <DotLottieReact
                src="https://lottie.host/3b166387-55bb-4dd4-a81f-70dc47653913/c3OusbYJrD.lottie"
                loop
                autoplay
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              <div className="relative  z-10 text-center ">
                <h2 className="text-3xl md:text-3xl font-bold  ">
                  Track Errors Across All Languages
                </h2>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-gray-500 leading-relaxed">
                We, as developers, have made it our priority to put error
                tracking at the highest regard to provide only the best
                monitoring experience, and bend the boundaries of the ordinary.
                We are all a group of engineers - vivid imagination,
                free-spirited.
              </p>
              <div className="items-center justify-center flex">

            <Signbutton/>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lottie Animation Background */}

      {/* Tech Carousel Section */}
      <div className="py-1 ">
        <TechCarousel />
      </div>
    </main>
  );
};

export default App;
