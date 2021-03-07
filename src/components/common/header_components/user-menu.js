import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { logout } from "../../../actions";
import { withRouter } from "react-router-dom";
import userImage from "../../../assets/userImage.jpg";

export class User_menu extends Component {
  handleClick = () => {
    const { authInfo } = this.props;
    this.props.dispatch(logout(authInfo, this.props.history));
  };

  render() {
    const imageDesign = {
      height: "65px",
      width: "65px",
      marginRight: "10px",
      borderRadius: "100%",
    };
    return (
      <Fragment>
        <li className="onhover-dropdown">
          <div className="media align-items-center">
            <img src={userImage} style={imageDesign} alt="design"/>
            <div className="dotted-animation">
              <span
                className="animate-circle"
              ></span>
              <span
                className="main-circle"
              ></span>
            </div>
          </div>
          <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
            <li onClick={this.handleClick}>Logout</li>
          </ul>
        </li>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  authInfo: state.adminLogin.authInfo,
});

export default connect(mapStateToProps)(withRouter(User_menu));
