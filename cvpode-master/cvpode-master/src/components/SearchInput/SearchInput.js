import {
  Box,
  Button,
  ClickAwayListener,
  InputBase,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";
import SearchIcon from "../../Icons/SearchIcon";
import CachedItems from "./CachedItems";
import styles from "./SearchInput.module.css";

const SearchInput = ({
  searchKey,
  setSearchKey,
  handleSearchClick,
  clearSearchResult,
  searchItems,
  getItem,
  errorMessage,
  caches,
  handleCachedItem,
}) => {
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <ClickAwayListener onClickAway={clearSearchResult}>
      <div className={styles.root}>
        <div className={styles.container}>
          <div className={styles.inputGroup}>
            <InputBase
                id="input-text-input"
                placeholder="Find CVP code"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
                className={styles.input}
                onKeyDown={handleInputKeyDown}
            />
            <Button variant="contained" disableElevation onClick={handleSearchClick} disableRipple>
              <SearchIcon fontSize="small" />
            </Button>
          </div>
          <CachedItems caches={caches} handleCachedItem={handleCachedItem} />
        </div>
        <p className={styles.error}>{errorMessage}</p>
        {searchItems?.length > 0 && (
          <Paper className={styles.lists}>
            <Box sx={{ borderBottom: "1px solid #eee", padding: 2 }}>
              <Typography fontWeight={600} fontSize={14}>
                Ergebnisse in CPV-codes ({searchItems.length} Treffer)
              </Typography>
            </Box>
            <MenuList open={searchItems.length} className={styles.listItems}>
              {searchItems.map((item) => (
                <MenuItem key={item.code} className={styles.listItem} onClick={() => getItem(item)}>
                  <span>{item.code}</span>
                  <Typography variant="inherit" noWrap>
                    {item.description}
                  </Typography>
                </MenuItem>
              ))}
            </MenuList>
            <div className={styles.listAll} onClick={handleSearchClick}>
              Alle Abteilungen Anzeigen
            </div>
          </Paper>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default SearchInput;
