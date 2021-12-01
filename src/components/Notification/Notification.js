// Style
import { NotificationText, IconDiv } from "./Notification.style";
// Icons
import OkIcon from "../../assets/icons/ok.png";
import ImportantIcon from "../../assets/icons/important.png";

function Notification({ message, type }) {
  return (
    <NotificationText type={type}>
      {type === "error" ? (
        <IconDiv>
          <img src={ImportantIcon} alt="error" />
        </IconDiv>
      ) : (
        <IconDiv>
          <img src={OkIcon} alt="Okay" />
        </IconDiv>
      )}
      {message}
    </NotificationText>
  );
}

export default Notification;
