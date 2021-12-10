//styles
import { Wrapper, Icon } from "./Home.style";
// icon
import HomeIcon from "../../assets/icons/home.png";

const Home = ({ handleClick }) => {
  return (
    <Wrapper>
      <Icon src={HomeIcon} alt="home-icon" onClick={handleClick} />
    </Wrapper>
  );
};

export default Home;
