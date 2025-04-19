import algiersImage from '../../assets/pexels-karlsolano-2883048.jpg';
import oranImage from '../../assets/pexels-quark-studio-1159039-2507010.jpg';
import annabaImage from '../../assets/pexels-pixabay-53577 (1).jpg';

export const accomodationPageBranches = [
  {
    image: algiersImage,
    text: 'algiers',
    links: [
      {
        text: 'book now',
        to: '/book',
      },
      {
        text: 'learn more',
        to: '/',
      },
    ],
  },
  {
    image: oranImage,
    text: 'oran',
    links: [
      {
        text: 'book now',
        to: '/book',
      },
      {
        text: 'learn more',
        to: '/',
      },
    ],
  },
  {
    image: annabaImage,
    text: 'annaba',
    links: [
      {
        text: 'book now',
        to: '/book',
      },
      {
        text: 'learn more',
        to: '/',
      },
    ],
  },
];
