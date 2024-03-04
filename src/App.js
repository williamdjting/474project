// import React, { useState, useEffect, useRef } from 'react';
// import FlashcardList from './components/FlashcardList';
// import './App.css';
// import AddQuestionPage from './components/AddQuestionPage';
// import axios from 'axios';

// function App() {
//   const [flashcards, setFlashcards] = useState([])
//   const [categories, setCategories] = useState([])
//   const [showPopup, setShowPopup] = useState(false);

//   const categoryEl = useRef()
//   const amountEl = useRef()

//   useEffect(() => {
//     axios
//       .get('http://localhost:5000/category')
//       .then(res => {import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './Home';
// import Login from './Login';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
//         setCategories(res.data)
//       })
//   }, [])

//   function decodeString(str) {
//     const textArea = document.createElement('textarea')
//     textArea.innerHTML= str
//     return textArea.value
//   }

//   function handleSubmit(e) {
//     e.preventDefault()
//     axios
//     .get('http://localhost:5000/question/' + categoryEl.current.value + '/' + amountEl.current.value)
//     .then(res => {
//       setFlashcards(res.data.map((questionItem, index) => {
//         const answer = decodeString(questionItem.answer)
//         const options = [questionItem.option1, questionItem.option2, answer]
//         return {
//           id: `${index}-${Date.now()}`,
//           question: decodeString(questionItem.question),
//           answer: answer,
//           options: options.sort(() => Math.random() - .5)
//         }
//       }))
//     })
//   }

//   function handleNewQuestion() {
//     setShowPopup(true);
//   }

//   function closePopup() {
//     setShowPopup(false);
//   }

//   return (
//     <>
//       <form className="header" onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="category">Category</label>
//           <select id="category" ref={categoryEl}>
//             {categories.map(category => {
//               return <option value={category.id} key={category.id}>{category.category_name}</option>
//             })}
//           </select>
//         </div>
//         <div className="form-group">
//           <label htmlFor="amount">Number of Questions</label>
//           <input type="number" id="amount" min="1" step="1" defaultValue={3} ref={amountEl} />
//         </div>
//         <div className="form-group">
//           <button className="btn">Generate</button>
//         </div>
//       </form>

//       <div className="form-group">
//         <button className="btn" onClick={handleNewQuestion}>Create New Question</button>
//       </div>

//       <div className="container">
//         <FlashcardList flashcards={flashcards} />
//       </div>

//       {showPopup && <AddQuestionPage closePopup={closePopup} categories={categories}/>}

//     </>
//   );
// }

// export default App;



import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;