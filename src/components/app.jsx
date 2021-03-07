import React, { Component } from "react";
import Sidebar from "./common/sidebar_components/sidebar";
import Footer from "./common/footer";
import Header from "./common/header_components/header";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ltr: true,
      divName: "RTL",
    };
  }
  ChangeRtl(divName) {
    if (divName === "RTL") {
      document.body.classList.add("rtl");
      this.setState({ divName: "LTR" });
    } else {
      document.body.classList.remove("rtl");
      this.setState({ divName: "RTL" });
    }
  }
  render() {
    return (
      <div>
        {!this.props.isLoggedIn ? (
          this.props.history.push("/")
        ) : (
          <>
            <div className="page-wrapper">
              <Header />
              <div className="page-body-wrapper">
                <Sidebar />
                <div className="page-body">{this.props.children}</div>
                <Footer />
              </div>
            </div>
            <div
              className="btn-light custom-theme"
              onClick={() => this.ChangeRtl(this.state.divName)}
            >
              {this.state.divName}
            </div>
          </>
        )}
      </div>
    );
    // }
  }
}

const mapStateToProps = (state) => ({
  authInfo: state.adminLogin.authInfo,
  isLoggedIn: state.adminLogin.isLoggedIn,
});

export default connect(mapStateToProps)(withRouter(App));
