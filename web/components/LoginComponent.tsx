import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { ThreeCircles } from "react-loader-spinner";
import { notification } from "./common/Notification";
import { IInputs, NOTIFICATION_TYPE } from "../libs/types";
import Link from "next/link";

export default function LoginComponent() {
  const [inputs, setInputs] = useState<IInputs>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const validateFields = () => {
    // Check if required fields are filled
    if (!inputs.email || !inputs.password) {
      notification(t("alert.error.required"), NOTIFICATION_TYPE.WARNING);
      return false;
    }

    // Validate email pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.email)) {
      notification(t("alert.error.email"), NOTIFICATION_TYPE.WARNING);
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateFields()) {
      return;
    }
    setIsLoading(true);
    //   try {
    //     const response = await login(inputs);

    //     if (response?.status === 200) {
    //       localStorage.setItem("token", response.data.token);
    //       localStorage.setItem("userId", response.data.userId);

    //       router.push("/home");
    //     } else {
    //       notification(response.response.data, NOTIFICATION_TYPE.ERROR);
    //     }
    //   } catch (error) {
    //     // Handle error
    //     console.error("Login error:", error);
    //   } finally {
    //     setIsLoading(false);
    //     setInputs({});
    //   }
  };

  return (
    <div>
      {isLoading ? (
        <ThreeCircles
          height={100}
          width={100}
          color="#ff9900"
          wrapperClass="loader"
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor=""
          innerCircleColor=""
          middleCircleColor=""
        />
      ) : (
        <>
          <h1>{t("login.title")}</h1>
          <div className="login-wrapper">
            <div className="login-form">
              <div className="login-input-item">
                <label>{t("login.email")}</label>
                <input
                  type="email"
                  name="email"
                  value={inputs.email || ""}
                  onChange={handleChange}
                  placeholder={t("login.email-placeholder")}
                />
              </div>
              <div className="login-input-item">
                <label>{t("login.password")}</label>
                <input
                  type="password"
                  name="password"
                  value={inputs.password || ""}
                  onChange={handleChange}
                  placeholder={t("login.password-placeholder")}
                />
              </div>
              <div className="login-input-item login-btn-container ">
                <button className="login-btn" onClick={handleLogin}>
                  {t("login.login-btn")}
                </button>
                <p
                  style={{
                    marginTop: "30px",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  {t("login.sign-up-txt")}
                  <Link href="/register" passHref>
                    <a className="sign-up-txt">{t("login.sign-up-link")}</a>
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
