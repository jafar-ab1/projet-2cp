
import Image1 from '../../assets/pexels-pixabay-271618.jpg'
import Image2 from '../../assets/pexels-cottonbro-6466285.jpg'
import Image3 from '../../assets/pexels-quang-nguyen-vinh-222549-14917460.jpg'
import './Hotels.css';
function Hotels(){
    return(<>
<div className="container">
    <div className="head">
        <p className="par3">
        Welcome to our booking platform, where comfort meets <br/> convenience.Discover stays from cozy retreats to luxurious <br/>escapes.Whether for business, romance, or family, <br/>book your stay today!
        </p>
    </div>
    <section className="Perfect-Stay-Container">
        <div>
        <div className="LeftSide Details">

            <p className="Algiers">Algiers hotel</p>
            <p className="Room"><b> Standard Room</b></p>
            <p className="Details" ><b>Price :</b>Price: Starting at $80 per night </p>
            <p className="Details" > <b>Space:</b>  25 m² </p>
            <p className="Details" ><b>Description: </b>Cozy and functional, the Standard <br/> Room offers a comfortable queen-sized bed,<br/> private bathroom,and essential amenities like <br/>free Wi-Fi, a flat-screen TV, and a workspace. </p>
            <p className="Details"><b>Ideal for solo travelers or couplesseeking<br/> affordability and convenience.</b></p>
            <button className="Book1">Book Now</button>
        </div>

        <div className="RightSide">
            <div className="RightSideImg">
                <img src={Image1} />

            </div>
            <div className="BackColor"></div>

            

                 


        </div>
        
        

    </div>
    </section>
    
          <section className="DelightContainer">
            <div>
          <div className="LeftSide2">
                <div className="LeftSideImg">
                    <img src={Image2} />
    
                </div>
                <div className="BackColor" />
    
                     
    
    
            </div>
            <div className="RightSide2 Details">
            <p className="Algiers">Algiers hotel</p>
            <p className="Room"> Deluxe Room</p>
            <p className="Details" ><b>Price:</b> Starting at $120 per night<br/>
                                    <b>Space:</b>  35 m² <br/>
                                    <b>Description:</b> The Deluxe Room <br/>provides  extra space and luxury, <br/>featuring a king-sized bed,a seating area,<br/> and stunning city views. Guests enjoy <br/>premium amenities such as a mini-bar,<br/> complimentary toiletries, and 24-hour<br/> room service for a truly relaxing<br/> experience.</p>
            <button className="Book1">Book Now</button>
                
            </div>
            </div>
            </section>


            <section className="Perfect-Stay-Container">
        <div>
        <div className="LeftSide Details">

            <p className="Algiers">Algiers hotel</p>
            <p className="Room"> Suite</p>
            <p className="Details" ><b>Price :</b>Price: Starting at $200 per night <br/>
                                    <b>Space:</b>  50 m² <br/>
                                    <b>Description:</b> Perfect for those seeking<br/> ultimate comfort, the Suite boasts a separate<br/> bedroom and living area, luxurious<br/> furnishings, and exclusive features like a<br/> private balcony. Guests enjoy access to a<br/> complimentary breakfast and personalized<br/> concierge service.</p>
            <button className="Book1">Book Now</button>
        </div>

        <div className="RightSide">
            <div className="RightSideImg">
                <img src={Image3} />

            </div>
            <div className="BackColor"></div>

            

                 


        </div>
        
        

    </div>
    </section>


    </div>
    </>
    )
}
export default Hotels