import React, { useState } from 'react';
import axios from 'axios';

function AddCategoryPage ({closeAddCategoryPage}) {
    
    const [formData, setFormData] = useState({
        category_name: '',
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const onCreateCategoryHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://ls43udyak5.execute-api.us-east-2.amazonaws.com/categories', formData);
            console.log(response.data);
            setFormData({
                category_name: ''
            });
            closeAddCategoryPage();
        } catch (error) {
            console.error('Error submitting form data:', error);
        }
    };

    return (
        <>
            <form className="popup-outer" onSubmit={onCreateCategoryHandler}>
                <div className="popup-inner">
                    <label htmlFor="fcategoryname">New Category Name: </label>
                    <input type="text" 
                        id="fcategoryname" 
                        name="category_name" 
                        value={formData.category_name}
                        onChange={handleInputChange}
                        placeholder="new category name">
                    </input>
                    
                    <button type="button" onClick={closeAddCategoryPage} className="cancel"> Cancel</button>
                    <button type="submit" className="create"> Create</button>
                </div>
            </form>
        </>
    )
}

export default AddCategoryPage;