import { useEffect, useState } from "react";
import { getAllFeedbacks } from "../../../api/index"; // 👈 Adjust the path if needed
import "./CustomerFeedback.css";

const CustomerFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const data = await getAllFeedbacks();
        setFeedback(data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <section className="customer-feedback">
      <h3>Customers feedback</h3>

      {isLoading ? (
        <p>Loading feedback...</p>
      ) : feedback.length === 0 ? (
        <p>No feedback available yet.</p>
      ) : (
        <ul>
          {feedback.map((item, index) => (
            <li key={index}>
              <strong>{item.userId?.name || "Anonymous"}</strong>
              <span>{item.comment}</span>
              <em>{item.roomId?.number || "Unknown Room"}</em>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default CustomerFeedback;
