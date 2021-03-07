import React, { Component, Fragment } from "react";
import LoginTabset from "./loginTabset";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export class Login extends Component {
  render() {
    return (
      <Fragment>
        <div className="page-wrapper">
          <div className="authentication-box">
            <div className="container">
              <div className="row">
                <div className="col-md-7 p-0 card-left">
                  <div className="card tab2-card">
                    <div className="card-body">
                      <LoginTabset />                      
                    </div>                    
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Login;

