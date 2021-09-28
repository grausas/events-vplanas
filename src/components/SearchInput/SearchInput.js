// Styles
import { Input, InputDiv, Icon } from "./SearchInput.style";

const SearchInput = ({
  defaultValue,
  placeholder,
  minLength,
  maxLength,
  handleChange,
}) => {
  return (
    <InputDiv>
      <Icon />
      <Input
        type="text"
        defaultValue={defaultValue}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        onChange={handleChange}
      />
    </InputDiv>
  );
};

export default SearchInput;
