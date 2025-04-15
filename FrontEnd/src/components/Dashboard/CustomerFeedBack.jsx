import "./CustomerFeedback.css"

const CustomerFeedback = () => {
  const feedback = [
    { name: "Ahmed", comment: "Food could be better", room: "A101" },
    { name: "Mohammed", comment: "Cleaning could be better", room: "A90" },
    { name: "Asmaa", comment: "I loved the SPA", room: "A104" },
  ]

  return (
    <section className="customer-feedback">
      <h3>Customers feedback</h3>
      <ul>
        {feedback.map((item, index) => (
          <li key={index}>
            <strong>{item.name}</strong>
            <span>{item.comment}</span>
            <em>{item.room}</em>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default CustomerFeedback
