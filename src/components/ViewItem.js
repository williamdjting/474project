import ViewStyle from "./ViewItem.module.css"
import React, { useState } from "react";

function View() {
  const [list, setList] = useState("");

  const [submittedValues, setSubmittedValues] = useState([]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log("Input Text:", list);
    // Add the value of "e" to the list of submitted values
    setSubmittedValues([...submittedValues, list]);
  };

  return (
    <>
      <div className={ViewStyle.centerViewItem}>
        <div className={ViewStyle.center1ViewItem}>
          <form onSubmit={handleFormSubmit}>
            {/* Input for text */}
            <label>
              Text:
              <input
                type="text"
                value={list}
                onChange={(e) => setList(e.target.value)}
              />
            </label>
            <br />
            {/* Input for submit */}
            <input type="submit" value="Click me" />
          </form>
        </div>
      </div>

      <div className={ViewStyle.centerViewItem}>
        {submittedValues.map((value, index) => (
          <div className={ViewStyle.center1ViewItem}>
            <li key={index}>{value}</li>
          </div>
        ))}
      </div>

    </>
  );
}

export default View;
