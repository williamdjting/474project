import CreateStyle from "./CreateItem.module.css"
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import ArrayContext from "../ArrayContext";

function Create() {

  const { listArray, setListArray } = useContext(ArrayContext);

  const [list, setList] = useState("");

  // const [submittedValues, setSubmittedValues] = useState([]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log("Input Text:", list);
    // Add the value of "e" to the list of submitted values
    // setSubmittedValues([...submittedValues, list]);
        // Add a new item to the array
    setListArray(prevArray => [...prevArray, list]);
        // Clear the input field
    setList("");
  };


  


  return (
    <>
      <div>
        We are on the create page
      </div>
      <div className={CreateStyle.centerCreateItem}>
        <div className={CreateStyle.center1CreateItem}>
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

      <div className={CreateStyle.centerCreateItem}>
        {listArray.map((value, index) => (
          <div className={CreateStyle.center1CreateItem}>
            <li key={index}>{value}</li>
          </div>
        ))}
      </div>

      <Link to="/view">
        <button>Go to View Page</button>
      </Link>
      

    </>
  );
}

export default Create;
