// ArrayContext.js
import React, { createContext, useState } from 'react';

const ArrayContext = createContext();

export const ArrayProvider = ({ children }) => {
  const [listArray, setListArray] = useState([]);

  return (
    <ArrayContext.Provider value={{ listArray, setListArray }}>
      {children}
    </ArrayContext.Provider>
  );
};

export default ArrayContext;