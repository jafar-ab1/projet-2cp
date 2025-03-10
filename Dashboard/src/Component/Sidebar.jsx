import "./SideBar.css"
function Sidebar(){
    return(
        <>
        <div className="container">
        <p className="HotelName">Hotel Name</p>
        <div className="elements">
            <div className="element">
            <div className="icon"><img src="#"/></div>
            <div className="Page"><a>Dashboard</a></div>
            </div>
            <div className="element">
            <div className="icon"><img src="#"/></div>
            <div className="Page"><a>Front desk</a></div>
            </div>
            <div className="element">
            <div className="icon"><img src="#"/></div>
            <div className="Page"><a>Guest</a></div>
            </div>
            <div className="element">
            <div className="icon"><img src="#"/></div>
            <div className="Page"><a>Rooms</a></div>
            </div>
            <div className="element">
            <div className="icon"><img src="#"/></div>
            <div className="Page"><a>Deal</a></div>
            </div>
            <div className="element">
            <div className="icon"><img src="#"/></div>
            <div className="Page"><a>Rate</a></div>
            </div>
        </div>
        </div>
        
        
        </>
    )



}
export default Sidebar