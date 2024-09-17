import React from "react";
import { Switch, FormControlLabel } from "@mui/material";

export const SubmitButton = ({ callback, buttonTitle = "Submit" }) => {
  return (
    <button disabled={false} className="savebutton relative" onClick={callback}>
      {buttonTitle}
    </button>
  );
};

export const ToggleSwitch = ({
  toggleLabel = "Toggle",
  toggleRef,
  onSetPublish,
}) => {
  return (
    <FormControlLabel
      control={<Switch />}
      label={toggleLabel}
      inputRef={toggleRef}
      onChange={() => {
        console.log(toggleRef.current.checked);
      }}
    />
  );
};
