import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a
              class="btn waves-effect waves-light  blue darken-1"
              href="auth/google"
            >
              Login With Google
            </a>
          </li>
        );
      default:
        return [
          <React.Fragment>
            <li key="1">
              <Payments />
            </li>
            <li key="3" style={{ margin: "0 10px" }}>
              Credits={this.props.auth.credits}
            </li>
            <li key="2">
              <a
                class="btn waves-effect waves-light  blue darken-1"
                href="/api/logout"
              >
                Logout
              </a>
            </li>
          </React.Fragment>,
        ];
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper   blue darken-3">
          <Link to={this.props.auth ? "/surveys" : "/"} className="brand-logo">
            Emaily
          </Link>
          <ul className="right hide-on-med-and-down">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}
function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
