import React, { useState } from "react";
import { ToggleButton } from "@mui/material";

export const Toggle = ({ buttonText = "Button" }) => {
  const [selected, setSelected] = useState(false);

  return (
    <ToggleButton
      value="check"
      selected={selected}
      onChange={() => {
        setSelected(!selected);
      }}
    >
      {buttonText}
    </ToggleButton>
  );
};
