import algiersImage from '../../assets/pexels-karlsolano-2883048.jpg';
import oranImage from '../../assets/pexels-quark-studio-1159039-2507010.jpg';
import annabaImage from '../../assets/Anaba.jpg';

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
        to: '/branches/?city=algiers',
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
        to: '/branches/?city=oran',
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
        to: '/branches/?city=annaba',
      },
    ],
  },
];
