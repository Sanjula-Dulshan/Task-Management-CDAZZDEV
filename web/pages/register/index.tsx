import React, { useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { useRouter } from "next/router";
import { IRegisterInputs, NOTIFICATION_TYPE } from "../../libs/types";
import { notification } from "../../components/Notification";
import Link from "next/link";
import { register } from "../../service/Api/Api";

export default function Register() {
  const [inputs, setInputs] = useState<IRegisterInputs>();
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const validateFields = () => {
    if (
      !inputs.name ||
      !inputs.email ||
      !inputs.password ||
      !inputs.cPassword
    ) {
      notification("All fields are required", NOTIFICATION_TYPE.WARNING);
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputs.email)) {
      notification("Invalid email address", NOTIFICATION_TYPE.WARNING);
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (!validateFields()) {
      return;
    }

    if (inputs.password !== inputs.cPassword) {
      notification(
        "Password and confirm password must be same",
        NOTIFICATION_TYPE.WARNING
      );
      return;
    }

    const { cPassword, ...inputsWithoutCPassword } = inputs;

    setIsLoading(true);
    const response = await register(inputsWithoutCPassword);

    if (response?.status === 200) {
      notification("User registered successfully", NOTIFICATION_TYPE.SUCCESS);
      setInputs({
        name: "",
        email: "",
        password: "",
        cPassword: "",
      });
      router.push("/");
    } else {
      notification(response.response.data, NOTIFICATION_TYPE.ERROR);
    }
    setIsLoading(false);
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
          <h1>Sign Up</h1>
          <div className="login-wrapper">
            <div className="login-form">
              <div className="login-input-item">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={inputs?.name || ""}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>
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

              <div className="login-input-item">
                <label>Confirm Password:</label>
                <input
                  type="password"
                  name="cPassword"
                  value={inputs?.cPassword || ""}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                />
              </div>
              <div className="login-input-item login-btn-container ">
                <button className="login-btn" onClick={handleSignUp}>
                  Sign Up{" "}
                </button>
                <p
                  style={{
                    marginTop: "30px",
                    textAlign: "center",
                    fontSize: "14px",
                  }}
                >
                  Already have an account? Login{" "}
                  <Link href="/" className="sign-up-txt">
                    here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
