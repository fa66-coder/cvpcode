import { SvgIcon } from "@mui/material";

const CheckedMark = () => {
  return (
    <SvgIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-3 -3 14 14"
      sx={{
        background: "#0a717c",
        borderRadius: "2px",
        margin: "3px",
        width: "18px",
        height: "18px",
      }}
    >
      <path fill="#fff" d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z" />
    </SvgIcon>
  );
};

export default CheckedMark;
