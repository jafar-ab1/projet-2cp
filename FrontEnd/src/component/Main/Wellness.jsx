
import Image1 from '../../assets/pexels-breakingpic-3188.jpg'
import Image2 from '../../assets/danielle-cerullo-CQfNt66ttZM-unsplash.jpeg'
import './Hotels/Hotels.css'

function Wellness(){
    return(<>
<div className="container">
    <div className="head">
        <p className="par3">
        Our hotel is the ideal destination for wellness, offering a serene and luxurious atmosphere to help you relax and recharge. From rejuvenating spa treatments to holistic retreats, we provide everything needed to nourish your mind and body.</p>
    </div>
    <section className="Perfect-Stay-Container">
        <div>
        <div className="LeftSide Details">
            <p className="Room"><b> SPA</b></p>
            <p className="Details" >Our spa offers a serene escape, featuring a <br/>range of treatments designed to relax,<br/> rejuvenate, and refresh. With a tranquil<br/> atmosphere, skilled therapists, and premium <br/>products, every visit promises a soothing <br/>experience tailored to your needs. Whether <br/>you're seeking a calming massage or a <br/>revitalizing facial, our spa is your perfect retreat<br/> for total well-being.</p>
            <button className="Book1">Make a reservation</button>
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
            <p className="Room"> <b>Fitness House</b></p>
            <p className="Details" >Our fitness house is equipped with state-<br/>of-the-art equipment and offers a range<br/> of workout options to suit all fitness<br/> levels. Whether you prefer strength<br/> training, cardio, or yoga, our space is<br/> designed to help you stay active and <br/>energized. With a modern and<br/> motivating atmosphere, it's the perfect<br/> place to maintain your fitness goals <br/>during your stay.</p>
            <button className="Book1">Make a reservation</button>
                
            </div>
            </div>
            </section>
</div>
</>

)}
export default Wellness