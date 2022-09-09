import styles from "./ResultsList.module.css";
import highlighter from "../../utils/highliter";

const DroppInfo = ({ open, content, searchKey }) => {
  var itemCount = 0;
  return (
    <div className={styles.dropperWraper} onClick={(e) => e.stopPropagation()}>
      <div className={styles.dropContent + " " + (open ? styles.dropContentOpen : "")}>
        {Object.keys(content)
          .filter((key) => (key === "hinwise" || key === "synonyme") && content[key]?.length > 0)
          .map((key) => {
            itemCount++;
            return (
              <div key={key}>
                {itemCount > 1 && <br />}
                <strong>{key}</strong>
                <br />
                <span dangerouslySetInnerHTML={{ __html: highlighter(searchKey, content[key]) }} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DroppInfo;
