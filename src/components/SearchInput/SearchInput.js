// Styles
import { Input, InputDiv, Icon } from "./SearchInput.style";

// Icon
import Search from "../../assets/icons/search.png";

const SearchInput = ({
  defaultValue,
  placeholder,
  minLength,
  maxLength,
  handleChange,
  handleSearch,
}) => {
  return (
    <InputDiv>
      <Icon src={Search} />
      <Input
        type="text"
        defaultValue={defaultValue}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        onChange={handleChange}
        onKeyPress={handleSearch}
      />
    </InputDiv>
  );
};

export default SearchInput;
