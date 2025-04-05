import { Component } from "react";

class ReaderSettings extends Component {
  state = {};

  componentDidMount() {
    if (!localStorage.getItem("reader")) {
      window.location.href = "/";
    }
  }

  render() {
    return (
      <>
        <h1>Reader Settings</h1>
      </>
    );
  }
}

export default ReaderSettings;
