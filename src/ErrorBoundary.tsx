import React, { Component, ErrorInfo } from "react";
import { Link, Redirect } from "@reach/router";

class ErrorBoundary extends Component {
  public state = {
    hasError: false,
    redirect: false,
  };

  public static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  public componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Error Boundary caught a error", error, info);
  }

  public componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }

  public render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.hasError) {
      return (
        <h1>
          There was a error. <Link to="/">Click here</Link> to go back to home
          page, or wait 5 seconds
        </h1>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
