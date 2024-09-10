import * as React from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

export const TooltipDark = styled(({ className, textSize = 16, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme, textSize }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    // backgroundColor: theme.palette.common.white,
    // color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: textSize,
  },
}));
