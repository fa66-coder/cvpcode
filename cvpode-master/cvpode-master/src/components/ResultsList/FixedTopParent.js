import Sticky from "react-stickynode";
import styles from "./ResultsList.module.css";

const FixedTopParent = ({ isParent, parentRef, children }) => {
  if (isParent)
    return (
      <Sticky enabled={true} activeClass={styles.fixedTopParent} onClick={(e) => e.stopPropagation()}>
        {children}
      </Sticky>
    );

  return <>{children}</>;
};

export default FixedTopParent;
