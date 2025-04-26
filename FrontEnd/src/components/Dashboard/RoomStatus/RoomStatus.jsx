import { useEffect, useState } from "react";
import "./RoomStatus.css";
import { countRoomStatus1, countRoomByStatus0AndStatus1 } from "../../../api/index.js";

const RoomStatus = () => {
  const [occupied, setOccupied] = useState(0);
  const [available, setAvailable] = useState(0);

  const [cleanOccupied, setCleanOccupied] = useState(0);
  const [dirtyOccupied, setDirtyOccupied] = useState(0);
  const [inspectedOccupied, setInspectedOccupied] = useState(0);

  const [cleanAvailable, setCleanAvailable] = useState(0);
  const [dirtyAvailable, setDirtyAvailable] = useState(0);
  const [inspectedAvailable, setInspectedAvailable] = useState(0);
//status 0: Maked up, Not Maked up
//status1: Available or Occupied
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const occupiedCount = await countRoomStatus1("Occupied");
        const availableCount = await countRoomStatus1("Available");

        const cleanOcc = await countRoomByStatus0AndStatus1("Maked up", "Occupied");
        const dirtyOcc = await countRoomByStatus0AndStatus1("Not Maked up", "Occupied");
       // const inspectedOcc = await countRoomByStatus0AndStatus1("Inspected", "Occupied");

        const cleanAvail = await countRoomByStatus0AndStatus1("Maked up", "Available");
        const dirtyAvail = await countRoomByStatus0AndStatus1("Not Maked up", "Available");
       // const inspectedAvail = await countRoomByStatus0AndStatus1("Inspected", "Available");

        setOccupied(occupiedCount);
        setAvailable(availableCount);

        setCleanOccupied(cleanOcc);
        setDirtyOccupied(dirtyOcc);
        //setInspectedOccupied(inspectedOcc);

        setCleanAvailable(cleanAvail);
        setDirtyAvailable(dirtyAvail);
        //setInspectedAvailable(inspectedAvail);
      } catch (error) {
        console.error("Error fetching room status data:", error);
      }
    };

    fetchStatus();
  }, []);

  return (
    <section className="room-status">
      <h3>Rooms status</h3>
      <div className="room-columns">
        <div className="room-column">
          <div className="room-header">
            <span>occupied room</span>
            <strong>{occupied}</strong>
          </div>
          <div className="room-detail">
            <span>Maked up</span>
            <strong>{cleanOccupied}</strong>
          </div>
          <div className="room-detail">
            <span>Not Maked up</span>
            <strong>{dirtyOccupied}</strong>
          </div>
          {/*<div className="room-detail">
            <span>Inspected</span>
            <strong>{inspectedOccupied}</strong>
          </div>*/}
        </div>
        <div className="room-column">
          <div className="room-header">
            <span>available room</span>
            <strong>{available}</strong>
          </div>
          <div className="room-detail">
            <span>Maked up</span>
            <strong>{cleanAvailable}</strong>
          </div>
          <div className="room-detail">
            <span>Not Maked up</span>
            <strong>{dirtyAvailable}</strong>
          </div>
          {/*<div className="room-detail">
            <span>Inspected</span>
            <strong>{inspectedAvailable}</strong>
          </div>*/}
        </div>
      </div>
    </section>
  );
};

export default RoomStatus;
