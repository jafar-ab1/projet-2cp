import gourmetSpotImage from '../../assets/pexels-elevate-1267320.jpg';
import goldenPlateImage from '../../assets/pexels-edwardeyer-687824.jpg';
import coffeeNookImage from '../../assets/pexels-lina-1813466.jpg';

export const spots = [
  {
    image: gourmetSpotImage,
    text: 'the gourmet spot',
    links: [
      {
        text: 'learn more',
        to: '/dinning/?spot=gourmet-spot',
      },
      {
        text: 'menu',
        to: '#',
      },
    ],
  },
  {
    image: goldenPlateImage,
    text: 'the golden plate',
    links: [
      {
        text: 'learn more',
        to: '/dinning/?spot=golden-plate',
      },
      {
        text: 'menu',
        to: '#',
      },
    ],
  },
  {
    image: coffeeNookImage,
    text: 'the coffee nook',
    links: [
      {
        to: '/dinning/?spot=coffee-nook',
        to: '/',
      },
      {
        text: 'menu',
        to: '#',
      },
    ],
  },
];
