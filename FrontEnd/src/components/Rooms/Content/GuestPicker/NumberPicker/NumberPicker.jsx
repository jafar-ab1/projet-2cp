import styles from './NumberPicker.module.css';

// interface NumberPickerProps {
//     count: number;
//     setCounter: () => void;
// }

export default function NumberPicker({ count, setCounter }) {
  const onIncrement = () => setCounter(count + 1);
  const onDecrement = () => setCounter(count > 0 ? count - 1 : 0);

  const clickHandler = (e, handler) => {
    console.log('button clicked');
    e.stopPropagation();
    return handler();
  };

  return (
    <div className={styles.container}>
      <p>{count}</p>
      <div>
        <button onClick={(e) => clickHandler(e, onIncrement())}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
        <button onClick={(e) => clickHandler(e, onDecrement())}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </button>
      </div>
    </div>
  );
}
