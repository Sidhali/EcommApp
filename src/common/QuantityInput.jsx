import { TextField } from "@mui/material";
import { useState, useEffect } from "react";

function QuantityInput({ quantity, min, max, onUpdate }) {
  const [inputQty, setInputQty] = useState(quantity);
  useEffect(() => {
    setInputQty(quantity);
  }, [quantity]);

  const handleUpdate = () => {
    let value = Number(inputQty);

    if (!value) value = min;
    if (value < min) value = min;
    if (value > max) value = max;

    onUpdate(value);
    setInputQty(value);
  };

  return (
    <TextField
      type="number"
      value={inputQty}
      onChange={(e) => {
        const value = e.target.value;

        if (value === "") {
          setInputQty("");
          onUpdate(min);
          return;
        }

        if (isNaN(value)) return;

        setInputQty(value);
      }}
      onBlur={handleUpdate}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleUpdate();
          e.target.blur();
        }
      }}
      inputProps={{
        min,
        max,
      }}
      sx={{
        width: "190px",
        mx: 1,
        "& input": {
          textAlign: "center",
          fontWeight: 600,
          padding: "6px",
        },
      }}
    />
  );
}

export default QuantityInput;
