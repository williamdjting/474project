import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";

function App() {
  const [list, setList] = useState<string>("");

  const [submittedValues, setSubmittedValues] = useState<string[]>([]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();


    console.log('Input Text:', list);
    // Add the value of "e" to the list of submitted values
    setSubmittedValues([...submittedValues, list]);

  };


  return (
    <main className={styles.center}>
      <div className={styles.center1}>

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

      {/* Display the list of submitted values */}

      <div className={styles.center1}>
        {submittedValues.map((value, index) => (
           <div className={styles.center1}>
          <li key={index}>{value}</li>
          </div>
        ))}
      </div>

    </main>
  );
}

export default App;
