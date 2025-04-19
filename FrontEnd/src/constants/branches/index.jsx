import algiersBranchBackgroundImage from '../../assets/pexels-keeganjchecks-19199133.jpg';
import oranBranchBackgroundImage from '../../assets/pexels-keeganjchecks-19199133.jpg';
import annabaBranchBackgroundImage from '../../assets/pexels-keeganjchecks-19199133.jpg';

import standardRoomImage from '../../assets/pexels-pixabay-271618.jpg';
import deluxeRoomImage from '../../assets/pexels-cottonbro-6466285.jpg';
import suiteRoomImage from '../../assets/pexels-quang-nguyen-vinh-222549-14917460.jpg';

export const branches = [
  {
    city: 'algiers',
    hero: {
      'background-image': algiersBranchBackgroundImage,
      heading: 'your stay in algiers awaits',
      'sub-heading':
        'In the vibrant city of Algiers, our hotel combines comfort, convenience, and elegance, ensuring every stay is both relaxing and memorable.',
    },
    description: {
      text: 'Our Algiers rooms are thoughtfully designed to provide comfort and style, offering modern amenities, cozy furnishings, and a tranquil atmosphere for a restful stay',
    },
    rooms: [
      {
        type: 'standard',
        image: standardRoomImage,
        price: 80,
        space: 25,
        description:
          'Cozy and functional, the Standard Room offers a comfortable queen-sized bed,private bathroom,and essential amenities like  free Wi-Fi, a flat-screen TV, and a workspace.',
        recommendation:
          'Ideal for solo travelers or couplesseeking affordability and convenience.',
      },
      {
        type: 'delux',
        image: deluxeRoomImage,
        price: 120,
        space: 35,
        description:
          'The Deluxe Room provides  extra space and luxury, featuring a king-sized bed,a seating area, and stunning city views. Guests enjoy premium amenities such as a mini-bar, complimentary toiletries, and 24-hour room service for a truly relaxing experience.',
        recommendation: null,
      },
      {
        type: 'suite',
        image: suiteRoomImage,
        price: 200,
        space: 50,
        description:
          'Perfect for those seeking ultimate comfort, the Suite boasts a separate bedroom and living area, luxurious furnishings, and exclusive features like a private balcony. Guests enjoy access to a complimentary breakfast and personalized concierge service.',
        recommendation: null,
      },
    ],
  },
];
