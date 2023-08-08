import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material";
import { useRef } from "react";
const photos = [
  {
    id: 1,
    img: "../assets/elon.png",
  },
  {
    id: 2,
    img: "../assets/takaasi.png",
  },
  {
    id: 3,
    img: "../assets/elon.png",
  },
  {
    id: 4,
    img: "../assets/takaasi.png",
  },
];

const ImgCard = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef(null); // Sliderへの参照を作成

  const settings = {
    dots: false,
    infinite: true,
    speed: 560,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    initialSlide: 0,
    afterChange: (current) => setActiveSlide(current),
  };

  const handleThumbnailClick = (index) => {
    setActiveSlide(index);
    sliderRef.current.slickGoTo(index); // ここでスライドを変更
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "900px",
      }}
    >
      <Box
        sx={{
          width: "15%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {photos.map((img, index) => (
          <img
            key={img.id}
            src={img.img}
            alt={`thumbnail-${img.id}`}
            style={{ width: "100%", cursor: "pointer", marginBottom: 10 }}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </Box>

      <Box
        sx={{
          pl: 5,
          width: "600px",
          height: "600px",
          objectFit: "cover",
        }}
      >
        <Slider {...settings} ref={sliderRef}>
          {photos.map((slider) => (
            <div key={slider.id}>
              <img
                src={slider.img}
                alt={`slide-${slider.id}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default ImgCard;
