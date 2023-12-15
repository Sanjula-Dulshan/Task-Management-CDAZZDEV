import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <ReactNotifications />

      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
