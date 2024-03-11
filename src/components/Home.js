import React, { useState, useEffect, useRef } from 'react';
import FlashcardList from './FlashcardList';
import './Home.css';
import AddQuestionPage from './AddQuestionPage';
import Login from './Login'; // Import the Login component
import axios from 'axios';

function Home() {
  const [flashcards, setFlashcards] = useState([])
  const [categories, setCategories] = useState([])
  const [showPopup, setShowPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  const categoryEl = useRef()
  const amountEl = useRef()

  useEffect(() => {
    axios
      .get('https://ls43udyak5.execute-api.us-east-2.amazonaws.com/categories')
      .then(res => {
        setCategories(res.data)
      })
  }, [])

  function decodeString(str) {
    const textArea = document.createElement('textarea')
    textArea.innerHTML= str
    return textArea.value
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios
    .get('https://ls43udyak5.execute-api.us-east-2.amazonaws.com/question/' + categoryEl.current.value + '/' + amountEl.current.value)
    .then(res => {
      setFlashcards(res.data.map((questionItem, index) => {
        const answer = decodeString(questionItem.answer)
        const options = [questionItem.option1, questionItem.option2, answer]
        return {
          id: `${index}-${Date.now()}`,
          question: decodeString(questionItem.questionName),
          answer: answer,
          options: options.sort(() => Math.random() - .5)
        }
      }))
    })
  }

  function handleNewQuestion() {
    setShowPopup(true);
  }

  function closePopup() {
    setShowPopup(false);
  }

  // Function to simulate login, set isLoggedIn to true
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Correct usage of Login component instead of LoginPage
  if (!isLoggedIn) {
    // Pass the handleLogin function as a prop to Login
    return <Login onLoginSuccess={handleLogin} />;
  }


  // If logged in, show the main content
  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEl}>
            {categories.map(category => {
              return <option value={category.id} key={category.id}>{category.categoryName}</option>
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of Questions</label>
          <input type="number" id="amount" min="1" step="1" defaultValue={3} ref={amountEl} />
        </div>
        <div className="form-group">
          <button className="btn">Generate</button>
        </div>
      </form>

      <div className="form-group">
        <button className="btn" onClick={handleNewQuestion}>Create New Question</button>
      </div>

      <div className="container">
        <FlashcardList flashcards={flashcards} />
      </div>

      {showPopup && <AddQuestionPage closePopup={closePopup} categories={categories}/>}

    </>
  );
}

export default Home;
