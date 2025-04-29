import "./RoomCard.css";
import PropTypes from 'prop-types';

const RoomCard = ({ title, deals, booked, total, price }) => {
  return (
    <div className="room-card">
      {deals > 0 && <span className="deals">{deals} Deals</span>}
      <h4>{title}</h4>
      <p>{booked}/{total}</p>
      <p>Dzd {typeof price === 'number' ? price.toLocaleString() : 'N/A'}/day</p>
    </div>
  );
};

export default RoomCard;