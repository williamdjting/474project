import React from 'react';
import './AddQuestionPage.css'

function AddQuestionPage ({closePopup}) {
    return(
        <form className="popup-outer">
            <div className="popup-inner">
                <label htmlFor="fquestion">Question: </label>
                <input type="text" id="fquestion" name="question" placeholder="Please type the question here (at most 256 characters)"/>
                <label htmlFor="foption1">Option 1: </label>
                <input type="text" id="foption1" name="option1" placeholder="Please provide a wrong answer"></input>
                <label htmlFor="foption2">Option 2: </label>
                <input type="text" id="foption2" name="option2" placeholder="Please provide another wrong answer"></input>
                <label htmlFor="fanswer">Answer: </label>
                <input type="text" id="fanswer" name="answer" placeholder="Please provide the correct answer"></input>
                <button type="button" onClick={closePopup} className="cancel"> Cancel</button>
                <button type="button" className="create"> Create</button>
            </div>
        </form>
    )
}

export default AddQuestionPage;