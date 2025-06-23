import TechCarousel from "../comp/scroll"; // Adjust the import path as necessary
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Signbutton from "../comp/signbutton";
import SplitText from "./splitText";
const App = () => {
  return (
    <div className="relative transition duration-300 flex flex-col gap-1 mt-16 px-4 sm:px-10 py-10">
      <div className="flex flex-col items-start">
        
        <SplitText
          text="Error Logger"
          className="text-2xl md:text-5xl font-semibold text-center"
          delay={200}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />
        <SplitText
          text="one for every language"
          className="text-xl md:text-2xl font-semibold text-center"
          delay={200}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />
        <p></p>
      </div>
      <div className="min-h-[40vh] md:min-h-screen flex flex-col items-center justify-end z-10 text-center">
        <DotLottieReact
          src="https://lottie.host/3b166387-55bb-4dd4-a81f-70dc47653913/c3OusbYJrD.lottie"
          loop
          autoplay
          className="absolute top-0 left-0 w-full h-full object-cover opacity-90 -z-10"
        />

        <Signbutton />
      </div>

      <div className="z-10">
        <TechCarousel />
      </div>
    </div>
  );
};

export default App;
