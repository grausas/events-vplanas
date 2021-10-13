import { NotificationText } from "./Notification.style";

function Notification({ message, type }) {
  return <NotificationText type={type}>{message}</NotificationText>;
}

export default Notification;
