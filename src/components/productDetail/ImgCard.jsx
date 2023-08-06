import { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Box } from '@mui/material';

const photos = [
    {
        id: 1,
        img:'../assets/elon.png',
    },
    {
        id: 2,
        img:'../assets/takaasi.png',
    },
    {
        id: 3,
        img:'../assets/elon.png',
    },
    {
        id: 4,
        img:'../assets/takaasi.png',
    },
];


const ImgCard = ({ images }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 560,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    initialSlide: 0,
    afterChange: current => setActiveSlide(current)
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', width:"600px",mt:2}}>
      <Box sx={{ width: '20%', display: 'flex', flexDirection: 'column' }}>
        {photos.map((img) => (
          <img
            key={img.id}
            src={img.img}
            alt={`thumbnail-${img.id}`}
            style={{ width: '100%', cursor: 'pointer', marginBottom: 10 }}
            onClick={() => setActiveSlide(img.id)}
          />
        ))}
      </Box>

      <Box sx={{pl:5, width: '500px' }}>
        <Slider {...settings} initialSlide={activeSlide}>
          {photos.map((img) => (
            <div key={img.id}>
              <img src={img.img} alt={`slide-${img.id}`} style={{ width: '100%' }} />
            </div>
          ))}
        </Slider>
      </Box>
    </Box>
  );
}

export default ImgCard;
