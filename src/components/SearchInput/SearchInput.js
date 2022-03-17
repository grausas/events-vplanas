// Styles
import {
  Input,
  InputDiv,
  Icon,
  SuggestDiv,
  SuggestItem,
} from "./SearchInput.style";

// Icon
import Search from "../../assets/icons/search.png";

const SearchInput = ({
  defaultValue,
  placeholder,
  minLength,
  maxLength,
  handleChange,
  handleSearch,
  suggestions,
}) => {
  return (
    <>
      <InputDiv>
        <Icon src={Search} alt="search_icon" />
        <Input
          type="text"
          defaultValue={defaultValue}
          placeholder={placeholder}
          minLength={minLength}
          maxLength={maxLength}
          onChange={handleChange}
          onKeyDown={handleSearch}
        />
      </InputDiv>
      {suggestions && suggestions.length > 0 && (
        <SuggestDiv>
          {suggestions.map((item, index) => {
            return <SuggestItem key={index}>{item.text}</SuggestItem>;
          })}
        </SuggestDiv>
      )}
    </>
  );
};

export default SearchInput;
