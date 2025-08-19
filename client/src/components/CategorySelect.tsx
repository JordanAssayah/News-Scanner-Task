import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Option {
  displayName: string;
  value: string;
}

interface SelectProps {
  options?: Option[];
  onChange?: any;
  selectedOptions?: string;
}

export const CategorySelect = ({
  options = [],
  onChange,
  selectedOptions = "",
}: SelectProps) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    onChange?.(value);
  };

  return (
    <div className={"select"}>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel
          id="category-label"
          sx={{
            "&.Mui-focused": {
              color: "#7F56D9",
            },
          }}
        >
          <div>Category</div>
        </InputLabel>
        <Select
          labelId="category-label"
         
          value={selectedOptions}
          onChange={handleChange}
          input={<OutlinedInput label="Category" />}
          MenuProps={MenuProps}
          sx={{
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#7F56D9",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#7F56D9",
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.displayName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
