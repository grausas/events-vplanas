//styles
import { Wrapper, Icon } from "./Home.style";
// icon
import HomeIcon from "../../assets/icons/home.png";

const Home = () => {
  return (
    <Wrapper>
      <Icon src={HomeIcon} alt="home-icon" />
    </Wrapper>
  );
};

export default Home;
