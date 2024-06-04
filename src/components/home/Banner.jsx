import { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import { useTypewriter } from "react-simple-typewriter";
import CountUp from "react-countup";
import useData from "../../hooks/useData";
import PrimaryButton from "../shared/PrimaryButton";
import SecondaryButton from "../shared/SecondaryButton";

const Banner = () => {
  const slidderImages = [
    {
      id: "1",
      imageUrl: "https://i.ibb.co/1bDmRtv/1-1.jpg",
    },
    {
      id: "2",
      imageUrl: "https://i.ibb.co/HqD8fv9/1-2.jpg",
    },
    {
      id: "3",
      imageUrl: "https://i.ibb.co/jfR3Vfp/1-3.jpg",
    },
    {
      id: "4",
      imageUrl: "https://i.ibb.co/G93pymJ/1-4.png",
    },
    {
      id: "5",
      imageUrl: "https://i.ibb.co/yyKQYV2/1-5.jpg",
    },
  ];

  const [text] = useTypewriter({
    words: [
      "Customer Satisfaction",
      "Employee Engagement",
      "Market Research",
      "Product Feedback",
      "Event Feedback",
      "Brand Awareness",
      "User Experience",
      "Service Quality",
    ],
    loop: 0,
  });

  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}`;
  };

  return (
    <div className="pb-10 relative z-0 max-h-fit">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, EffectFade]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
        effect={"fade"}
      >
        {slidderImages.map((image) => (
          <SwiperSlide key={image.id}>
            <img
              src={image.imageUrl}
              alt={image.title}
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black to-black opacity-30"></div>
          </SwiperSlide>
        ))}
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
      <div className="absolute right-[5%] top-[25%] md:top-[16%]  z-10 flex flex-col gap-8 ">
        <div>
          <h2 className=" inline-block px-2 lg:px-4 py-1 text-gray-100 font-semibold  bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20  text-center">
            <p className="text-sm md:text-xl lg:text-2xl text-gray-900 font-bold">
              <CountUp end={180} duration={4} />+
            </p>
            <p className="text-xs font-normal md:text-lg">Active Surveyors</p>
          </h2>
        </div>
      </div>
      <div className="absolute left-[5%] top-[25%] md:top-[16%]  z-10 flex flex-col gap-8 ">
        <div>
          <h2 className=" inline-block px-2 lg:px-4 py-1 text-gray-100 bg-gray-400 font-semibold   rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20  text-center">
            <p className="text-sm md:text-xl lg:text-2xl text-gray-900 font-bold">
              <CountUp end={1500} duration={4} />+
            </p>
            <p className="text-xs font-normal md:text-lg">Surveys</p>
          </h2>
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col gap-8 lg:gap-16 w-[90%]">
        <div>
          <h2 className="text-xl md:text-4xl lg:text-6xl font-bold text-center text-primary">
            Create & Participate Survey From One Place
          </h2>
        </div>
        <div className="text-center">
          <h1 className=" text-xl md:text-4xl lg:text-6xl  text-gray-100">
            <span className="mr-2">Surveys For</span>
          </h1>
          <h1 className="font-bold text-xl md:text-4xl lg:text-6xl  text-gray-100 mt-3">
            {text}
            <span className="text-transparent">.</span>
          </h1>
        </div>
        <div className="w-[70%] lg:w-3/4 xl:w-1/2 mx-auto flex justify-center">
          <SecondaryButton btntext="Explore" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
