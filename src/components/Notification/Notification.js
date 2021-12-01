import { useState, useEffect } from "react";
// Style
import { NotificationText, IconDiv } from "./Notification.style";
// Icons
import OkIcon from "../../assets/icons/ok.png";
import ImportantIcon from "../../assets/icons/important.png";

function Notification({ message, type }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, 5000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  return (
    <div>
      {show && (
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
      )}
    </div>
  );
}

export default Notification;
