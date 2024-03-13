import { Swiper, useSwiper } from "swiper/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

const SwiperButtonNext = ({ rightArrowClass, leftArrowClass }) => {
  const swiper = useSwiper();
  return (
    <div className="absolute top-0 flex items-center justify-between w-full h-full">
      <button
        className={`z-50 p-1 border rounded-full bg-white text-black ${leftArrowClass}`}
        onClick={() => swiper.slidePrev()}
      >
        <ArrowLeft />
      </button>
      <button
        className={`z-50 p-1 border rounded-full bg-white text-black ${rightArrowClass}`}
        onClick={() => swiper.slideNext()}
      >
        <ArrowRight />
      </button>
    </div>
  );
};

const ReactSlider = ({
  children,
  slidesPerView,
  spaceBetween,
  className,
  breakPoints,
  loop,
  effect,
  modules,
  pagination,
  showCustomArrow,
  rightArrowClass,
  leftArrowClass,
  swiperRef,
}) => {
  return (
    <>
      <Swiper
        ref={swiperRef}
        slidesPerView={slidesPerView ?? "auto"}
        spaceBetween={spaceBetween ?? 20}
        breakpoints={breakPoints}
        loop={loop ?? false}
        effect={effect}
        modules={modules}
        pagination={pagination}
        className={className}
      >
        {children}
        {showCustomArrow && (
          <SwiperButtonNext
            rightArrowClass={rightArrowClass}
            leftArrowClass={leftArrowClass}
          />
        )}
      </Swiper>
    </>
  );
};

export default ReactSlider;
