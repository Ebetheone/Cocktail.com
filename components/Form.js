import React, { Component } from "react";
import styles from "./Form.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { setCookies } from "cookies-next";
import Router from "next/router";

class Form extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
    this.state = {
      passwordLength: 0,
      containsNumber: false,
      containsLowerCase: false,
      containsUpperCase: false,
      containsSymbol: false,
      visible: true,
      inputs: {},
    };
  }

  checkLength = (string) => {
    this.setState({
      passwordLength: string.length > 7 ? true : false,
    });
  };
  checkNumber = (string) => {
    let match = string.match(/[0-9]/);
    this.setState({
      containsNumber: match != null ? true : false,
    });
  };
  checkLowerCase = (string) => {
    let match = string.match(/[a-z]/);
    this.setState({
      containsLowerCase: match != null ? true : false,
    });
  };
  checkUpperCase = (string) => {
    let match = string.match(/[A-Z]/);
    this.setState({
      containsUpperCase: match != null ? true : false,
    });
  };

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name == "password") {
      this.state.visible = false;
      this.checkLength(value);
      this.checkNumber(value);
      this.checkLowerCase(value);
      this.checkUpperCase(value);
      this.checkSymbol(value);
    }
    this.setState(
      (this.state.inputs = { ...this.state.inputs, [name]: value })
    );
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    console.log(this.state.inputs);

    try {
      setCookies("user1", this.state.inputs),
        {
          path: "/",
          maxAge: 3600,
          sameSite: true,
        };
    } catch (err) {
      console.log(err);
    }
    if (
      (this.state.passwordLength > 7 && this.state.containsNumber == true,
      this.state.containsLowerCase == true,
      this.state.containsUpperCase == true,
      this.state.containsSymbol == true)
    ) {
      Router.push("./login");
      alert("Amjilttai burtguulle!");
    } else alert("Bolomjit buh hesgiig shaardlagin daguu buglunu uu!");
  };

  handleFinish = () => {
    this.setState({
      visible: true,
    });
  };

  checkSymbol = (string) => {
    let symbols = new RegExp(/[^A-Z a-z 0-9]/);
    this.setState({
      containsSymbol: symbols.test(string) ? true : false,
    });
  };

  render() {
    let {
      passwordLength,
      containsNumber,
      containsLowerCase,
      containsUpperCase,
      containsSymbol,
      visible,
    } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.form}>
          <form className={styles.forms} onSubmit={this.handleSubmit}>
            <div className={styles.header}>Sign up</div>
            <div className="form-outline mb-2">
              <label className="form-label" for="form2Example1">
                First name
              </label>
              <input
                type="text"
                onChange={this.handleChange}
                className="form-control"
                placeholder="Enter your firstname"
                name="firstname"
                required
              />
            </div>
            <div className="form-outline mb-2">
              <label className="form-label" for="form2Example1">
                Last name
              </label>
              <input
                type="text"
                onChange={this.handleChange}
                className="form-control"
                placeholder="Enter your lastname"
                name="lastname"
                required
              />
            </div>
            <div className="form-outline mb-2">
              <label className="form-label" for="form2Example1">
                Phone number
              </label>
              <input
                type="phone"
                onChange={this.handleChange}
                className="form-control"
                placeholder="Enter your phone number"
                name="phone"
                required
              />
            </div>
            <div className="form-outline mb-2">
              <label className="form-label" for="form2Example2">
                Birth date
              </label>
              <input
                type="date"
                onChange={this.handleChange}
                className="form-control"
                name="birthdate"
                required
              />
            </div>
            <div className={styles.radioChoose}>
              <label className="form-label" for="form2Example2">
                Gender
              </label>
              <input
                type="radio"
                name="react-tips"
                value="Male"
                checked={true}
                className={styles.radiobutton}
              />
              Male
              <input
                type="radio"
                name="react-tips"
                value="Female"
                className={styles.radiobutton}
              />
              Female
            </div>

            <div className="form-outline mb-2">
              <label className="form-label" for="form2Example2">
                Email
              </label>
              <input
                type="email"
                onChange={this.handleChange}
                className="form-control"
                placeholder="Enter your email"
                name="email"
                required
              />
            </div>
            <div className="form-outline mb-2">
              <label className="form-label" for="form2Example2">
                Password
              </label>
              <input
                type="password"
                onChange={this.handleChange}
                className="form-control"
                id="pass"
                placeholder="Enter your password"
                name="password"
                required
              />
            </div>
            <div
              className={visible ? styles.passchecker1 : styles.passchecker2}
            >
              <div className={passwordLength ? styles.green : null}>
                Contains more than 8 charactars
              </div>
              <div className={containsNumber ? styles.green : null}>
                Contains number
              </div>
              <div className={containsLowerCase ? styles.green : null}>
                Contains lowercase
              </div>
              <div className={containsUpperCase ? styles.green : null}>
                Contains uppercase
              </div>{" "}
              <div className={containsSymbol ? styles.green : null}>
                Contains symbol
              </div>
            </div>
            <input
              type="submit"
              className="btn btn-primary btn-block "
              value=" Sign up "
            />
          </form>
        </div>
      </div>
    );
  }
}
export default Form;
