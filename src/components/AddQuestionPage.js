import React, { useState } from 'react';
import './AddQuestionPage.css';
import axios from 'axios';
import AddCategoryPage from './AddCategoryPage';

function AddQuestionPage ({closePopup, categories}) {
    
    const [formData, setFormData] = useState({
        questionName: '',
        owner: 'default',
        categoryName: '',
        option1: '',
        option2: '',
        answer: '',
    });

    const [showAddCategory, setShowAddCategory] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSelectChange = (e) => {
        setFormData({
            ...formData,
            categoryName: e.target.value,
        });
    };

    const onCreateHandler = async (e) => {
        e.preventDefault();
        try {
            if (categories.length === 1) {
                setFormData({
                  ...formData,
                  categoryName: categories[0].categoryName,
                });
            }
            const response = await axios.post('https://ls43udyak5.execute-api.us-east-2.amazonaws.com/question', formData);
            console.log(response.data);
            setFormData({
                questionName: '',
                owner: 'Tianyu',
                categoryName: '',
                option1: '',
                option2: '',
                answer: '',
            });
    
            closePopup();
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };

    const handleAddCategory = (e) =>{
        e.preventDefault();
        setShowAddCategory(true);
    };

    const closeAddCategoryPage = () => {
        setShowAddCategory(false);
    };

    return(
        <>
            <form className="popup-outer" onSubmit={onCreateHandler}>
                <div className="popup-inner">
                    
                    <label htmlFor="fquestion">Question: </label>
                    <input type="text" 
                        id="fquestion" 
                        name="questionName" 
                        value={formData.questionName}
                        onChange={handleInputChange}
                        placeholder="Please type the question here (at most 256 characters)">
                    </input>

                    <label htmlFor="fcategories">Choose a category:</label>
                    <select name="category_name" 
                        id="fcategories" 
                        value={formData.categoryName}
                        onChange={handleSelectChange}
                        onClick={handleSelectChange}>
                        {categories.map((category, index)=>(
                            <option key={index} value={category.categoryName}>{category.categoryName}</option>
                        ))}
                    </select>
                    <button type="button" className="create-category" onClick={handleAddCategory}>Add New Category</button>

                    <label htmlFor="foption1">Option 1: </label>
                    <input type="text" 
                        id="foption1" 
                        name="option1" 
                        value={formData.option1}
                        onChange={handleInputChange}
                        placeholder="Please provide a wrong answer">
                    </input>

                    <label htmlFor="foption2">Option 2: </label>
                    <input type="text" 
                        id="foption2" 
                        name="option2" 
                        value={formData.option2}
                        onChange={handleInputChange}
                        placeholder="Please provide another wrong answer">
                    </input>

                    <label htmlFor="fanswer">Answer: </label>
                    <input type="text" 
                        id="fanswer" 
                        name="answer" 
                        value={formData.answer}
                        onChange={handleInputChange}
                        placeholder="Please provide the correct answer">
                    </input>

                    <button type="button" onClick={closePopup} className="cancel"> Cancel</button>
                    <button type="submit" className="create"> Create</button>
                </div>
            </form>

            {showAddCategory && <AddCategoryPage closeAddCategoryPage={closeAddCategoryPage}/>}

        </>
    )
}

export default AddQuestionPage;