import { Card } from "primereact/card";
import "./Login.component.scss";

import React from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";

const Login = () => {
  return (
    <div className="app-login__container">
      <Card>
        <div className="app-login__container-content">
          <h2 className="app-login__container-content-title">LOGIN</h2>
          <form className="app-login__container-content-form">
            <div className="app-login__container-content-form-field">
              <span className="p-float-label">
                <InputText
                  id="name"
                  name="name"
                  autoFocus
                />
                <label
                  htmlFor="name"
                >
                  Name*
                </label>
              </span>
            </div>
            <div className="app-login__container-content-form-field">
              <span className="p-float-label">
                <Password
                  id="password"
                  name="password"
                  feedback={false}
                  autoFocus
                />
                <label
                  htmlFor="password"
                >
                  Password*
                </label>
              </span>
            </div>
            <Button type="submit" label="Submit" className="mt-2" />
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Login;
