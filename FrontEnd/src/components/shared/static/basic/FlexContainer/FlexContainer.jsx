import styles from './FlexContainer.module.css';

// interface FlexContainerProps {
//    children: React.ReactNode;
//    reverse: boolean;
//    className: string;
// }

export default function FlexContainer({ children, reverse, className = '' }) {
  return (
    <div
      className={`${className} ${styles.container} ${reverse ? styles.reverse : ''}`}
    >
      {children}
    </div>
  );
}
