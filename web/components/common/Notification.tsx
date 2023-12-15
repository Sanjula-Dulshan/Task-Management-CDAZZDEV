import {
  Store,
  iNotification as ReactNotification,
} from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { NOTIFICATION_TYPE } from "../../libs/types";

export const notification = async (title: string, type: NOTIFICATION_TYPE) => {
  const isMobile = window.innerWidth <= 768; // Adjust the breakpoint as needed

  const notificationOptions: ReactNotification = {
    title: title,
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    type: type,
    insert: "top",
    container: "top-right",

    dismiss: {
      duration: 2000,
      onScreen: true,
      showIcon: true,
    },
    width: isMobile ? 350 : 400,
  };

  Store.addNotification(notificationOptions);
};
