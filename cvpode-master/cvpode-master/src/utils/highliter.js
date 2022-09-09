const highlighter = (searchKey, searchContent) => {
  const startedIndex = keyExists(searchKey, searchContent);
  if (startedIndex === false) return searchContent;

  return (
    searchContent.substr(0, startedIndex) +
    highlightWrapper(searchContent.substr(startedIndex, searchKey.trim().length)) +
    searchContent.substr(startedIndex + searchKey.trim().length)
  );
};

const highlightWrapper = (str) => {
  let styles =
    "border-radius: 4px; background: #ffa822; color: #fff !important; padding: 1px 3px; margin: 0 2px; width: fit-content;";

  return `<span style="${styles}">${str}</span>`;
};

export const keyExists = (search, content) => {
  const key = search.trim().toLowerCase();
  const text = content.trim().toLowerCase();
  return key.length && text.includes(key) ? text.indexOf(key) : false;
};

export default highlighter;
