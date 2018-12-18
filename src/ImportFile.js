import React from "react";

const ImportFile = () => {
  let fileReader;

  const handleFileRead = e => {
    const text = this.fileReader.result;
    this.setState({ script: JSON.parse(text) });
  };

  const HANDLE = file => {
    this.fileReader = new FileReader();
    this.fileReader.onloadend = this.handleFileRead;

    this.fileReader.readAsText(file, "UTF-8");
  };
};

export { HANDLE };
