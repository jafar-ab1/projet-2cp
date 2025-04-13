import Image2 from '../../../assets/pexels-mat-brown-150387-1395967.jpg';
import Image3 from '../../../assets/pexels-alfred-binne-bin-646217215-27138849.jpg';
import Image4 from '../../../assets/pexels-mark-angelo-sampan-738078-1587927.jpg';
import Image5 from '../../../assets/pexels-gabby-k-6781117.jpg';
import Image6 from '../../../assets/pexels-reneterp-2504911.jpg';

import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="container">
        <div className="head">
          <p className="par3">
            Welcome to our booking platform, where comfort meets <br />{' '}
            convenience.Discover stays from cozy retreats to luxurious <br />
            escapes.Whether for business, romance, or family, <br />
            book your stay today!
          </p>
        </div>
        <section className="Perfect-Stay-Container">
          <div>
            <div className="LeftSide">
              <p className="Title">Find Your Perfect Stay</p>
              <p>The Hotel In Algiers</p>

              <ul className="list">
                <li>
                  <p className="Hotels">The Hotel In Algiers</p>
                </li>

                <li>
                  <p className="Hotels">The Hotel In Oran</p>
                </li>

                <li>
                  <p className="Hotels">The Hotel In Annaba</p>
                </li>
              </ul>
              <button
                className="link"
                onClick={() => navigate('/Accommodation')}
              >
                Accommodation
              </button>
            </div>
            <div className="RightSide">
              <div className="RightSideImg">
                <img src={Image1} />
              </div>
              <div className="BackColor"></div>
            </div>
          </div>
        </section>
        <div className="OEW">
          <div
            className="Occasions"
            style={{ backgroundImage: `url(${Image3})` }}
          >
            <p>Occasions</p>
            <button onClick={() => navigate('/Occasions')}>Learn More</button>
          </div>

          <div className="Events" style={{ backgroundImage: `url(${Image4})` }}>
            <p>Events</p>
            <button onClick={() => navigate('/Events')}>Learn More</button>
          </div>
          <div
            className="Wellness"
            style={{ backgroundImage: `url(${Image5})` }}
          >
            <p>Wellness</p>
            <button onClick={() => navigate('/Wellness')}>Learn More</button>
          </div>
        </div>
        <section className="DelightContainer">
          <div>
            <div className="LeftSide2">
              <div className="LeftSideImg">
                <img src={Image2} />
              </div>
              <div className="BackColor" />
            </div>
            <div className="RightSide2">
              <p className="Title">Delight in Every Bite</p>
              <p>The Hotel In Algiers</p>
              <ul className="list">
                <li>
                  <p className="Gourmet">The Gourmet Spot</p>
                </li>
                <li>
                  <p className="Gourmet">The Gourmet Plate</p>
                </li>
                <li>
                  <p className="Gourmet">The Coffe Nook</p>
                </li>
              </ul>
              <button className="link" onClick={() => navigate('/Dining')}>
                Dining
              </button>
            </div>
          </div>
        </section>
        <div className="containerWrapper">
          <div className="BackColor3" />
          <section
            className="containerBottom"
            style={{ backgroundImage: `url(${Image6})` }}
          >
            <div className="overlay"></div>
            <p className="feedback">
              "Had an amazing stay! The rooms were clean and <br />
              cozy, and the staff was super friendly. <br />
              Would love to come back again!"
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
export default HomePage;
