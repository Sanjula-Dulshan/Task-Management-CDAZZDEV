import React, { useState, ChangeEvent } from "react";
import { useRouter } from "next/router";
import { ThreeCircles } from "react-loader-spinner";
import { ILoginInputs, NOTIFICATION_TYPE } from "../libs/types";
import Link from "next/link";
import { notification } from "../components/common/Notification";
import { login } from "../service/Api/Api";

export default function Login() {
  const [inputs, setInputs] = useState<ILoginInputs>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const validateFields = () => {
    // Check if required fields are filled
    if (!inputs?.email || !inputs?.password) {
      notification("All fields are required", NOTIFICATION_TYPE.WARNING);
      return false;
    }

    // Validate email pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.email)) {
      notification("Invalid email address", NOTIFICATION_TYPE.WARNING);
      return false;
    }

    return true;
  };

  const handleLogin = async () => {
    if (!validateFields()) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await login(inputs);

      if (response?.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);

        router.push("/home");
      } else {
        notification(response.response.data, NOTIFICATION_TYPE.ERROR);
      }
    } catch (error) {
      // Handle error
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
      setInputs({
        email: "",
        password: "",
      });
    }
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
          <h1>Login</h1>
          <div className="login-wrapper">
            <div className="login-form">
              <div className="login-input-item">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={inputs?.email || ""}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>
              <div className="login-input-item">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={inputs?.password || ""}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
              </div>
              <div className="login-input-item login-btn-container ">
                <button className="login-btn" onClick={handleLogin}>
                  Login
                </button>
                <p
                  style={{
                    marginTop: "30px",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  Don't have an account? Sign up{" "}
                  <Link href="/register" className="sign-up-txt">
                    here
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
