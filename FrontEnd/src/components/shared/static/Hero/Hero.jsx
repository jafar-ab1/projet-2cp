import NavBar from '../NavBar/NavBar';
import HeroContent from './HeroContent/HeroContent';
import HeroWrapper from './HeroWrapper/HeroWrapper';

// interface HeroProps {
//   backgroundImage: string;
//   heading: string;
//   subHeading: string;
//   hasButtons: boolean;
// }

export default function Hero({
  backgroundImage,
  heading,
  subHeading,
  hasButtons,
}) {
  return (
    <HeroWrapper backgroundImage={backgroundImage}>
      <NavBar />
      <HeroContent
        heading={heading}
        subHeading={subHeading}
        hasButtons={hasButtons}
      />
    </HeroWrapper>
  );
}
