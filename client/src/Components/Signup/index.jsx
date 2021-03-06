import React, { useState, useEffect } from "react";
import { Button, Input, Form, Switch, Divider, notification } from "antd";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UnlockOutlined,
} from "@ant-design/icons";
import Logo from "../../Layout/Logo";
import API from "../../api";
import axios from "axios";
// import Spinner from "../Spinner";

const SignUp = () => {
  const [form] = Form.useForm();
  // const [loader, setLoader] = useState(false);
  // const [error, setError] = useState(false);
  const [isMerchant, setIsMerchant] = useState(false);
  const [state, setState] = useState({
    loader: false,
    error: false,
    message: "Please provide valid details",
    type: "error",
  });
  const history = useHistory();

  const registration = () => {
    setState({ ...state, loader: true });
    const data = form.getFieldsValue();
    data.isMerchant = isMerchant;
    axios
      .post(API.registration, data)
      .then((res) => {
        if (res.status) {
          setState({
            ...state,
            loader: false,
            message: "Registration Success",
            type: "success",
            error: true,
          });
          history.push("/signin");
        } else {
          setState({ ...state, error: true, loader: false });
        }
      })
      .catch((e) => {
        setState({ ...state, error: true, loader: false });
      });
  };

  useEffect(() => {
    if (state.error) {
      notification.open({
        message: state.message,
        type: state.type,
      });
      setState({ ...state, error: false });
    }
  }, [state.error, state.message, state.type]);
  return (
    <div className="signin">
      <div className="signin-form">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            right: "1rem",
          }}
        >
          <Logo /> <h1 className="title">Home Solutions</h1>
        </div>
        <h2 className="welcomeBack">Welcome to Home Solutions</h2>
        <p class="loginIntoAccount">Please register your account</p>
        <div>
          <Form form={form} layout="vertical">
            <Form.Item
              label="Username"
              name="name"
              //   required
              //   tooltip="This is a required field"
            >
              <Input placeholder="Bob Stephen" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              //   required
              //   tooltip="This is a required field"
            >
              <Input placeholder="bobstephen@gmail.com" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              //   tooltip={{
              //     title: "Password",
              //     icon: <InfoCircleOutlined />,
              //   }}
            >
              <Input.Password
                placeholder="Password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Form.Item
              label="Confirm password"
              //   tooltip={{
              //     title: "Password",
              //     icon: <InfoCircleOutlined />,
              //   }}
            >
              <Input.Password
                placeholder="Password"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1.5rem",
                marginTop: "2rem",
              }}
            >
              <div>
                <Switch
                  onChange={(e) => {
                    setIsMerchant(e);
                  }}
                ></Switch>
                <span className="remeberMe">Merchant/Owner/Worker</span>
              </div>
            </div>
            <Form.Item style={{ width: "100%" }}>
              <Button
                type="primary"
                shape="round"
                icon={<UnlockOutlined />}
                style={{
                  width: "100%",
                  height: "2.5rem",
                  backgroundColor: "rgb(0, 132, 137)",
                  borderColor: "rgb(0, 132, 137)",
                }}
                loading={state.loader}
                onClick={registration}
              >
                Registration
              </Button>
            </Form.Item>
          </Form>
          <Divider>Or Register With</Divider>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: "1rem",
              rowGap: "1rem",
            }}
          >
            <Button type="primary">Facebook</Button>
            <Button style={{ backgroundColor: "red" }} type="primary">
              Gmail
            </Button>
            <Button style={{ backgroundColor: "red" }} type="primary">
              Google
            </Button>
            <Button type="primary">Github</Button>
          </div>
          <p
            style={{
              textAlign: "center",
              margin: "1.5rem 0",
              fontSize: "1rem",
              fontWeight: "700",
              color: "rgb(119, 119, 119)",
              fontFamily: "Loto",
            }}
          >
            Already Have an Account!
            <Link
              style={{ color: "rgb(0, 132, 137)", marginLeft: "0.5rem" }}
              to="/signin"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      <div className="signin-image-div" />
    </div>
  );
};

export default SignUp;
