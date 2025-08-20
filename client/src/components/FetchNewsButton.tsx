import React from "react";
import { Button } from "@mui/material";
interface FetchNewsButtonProps {
  onClick?: () => void;
}

export const FetchNewsButton: React.FC<FetchNewsButtonProps> = ({
  onClick,
}) => {
  return (
    <div className="submitNewsButtonContainer">
      <Button
        variant="contained"
        onClick={onClick}
        className="submitNewsButton"
        sx={{
          backgroundColor: "#7F56D9",
          width: { xs: "100%", sm: "auto" },
        }}
      >
        Fetch News
      </Button>
    </div>
  );
};
