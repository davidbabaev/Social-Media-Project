import React, { useState } from 'react'
import { CARD_CATEGORIES } from '../constants/cardsCategories';
import { useCardsProvider } from '../providers/CardsProvider';

export default function CreateCardForm({onSuccess}) {

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [mediaFile, setMediaFile] = useState(null);
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const {handleCardRegister} = useCardsProvider();
    const [isLoading, setIsLoading] = useState(false);
    


    const handleSubmitNewCard = async (e) => {
        e.preventDefault();

        setError('')
        setSuccessMessage('')

        if(title.trim() === ''){
            setError('Title is required')
            return;
        }

        if(text.trim() === ''){
            setError('Text is required')
            return;
        }

        if(!mediaFile){
            setError('You must choose image')
            return;
        }


        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', text);
        formData.append('category', category);
        formData.append('media', mediaFile);
        
        try{
            setIsLoading(true); // start is loading
            const result = await handleCardRegister(formData)
            if(!result.success){
                setError(result.message)// show error to user
                return;
            }

            setText('');
            setTitle('');
            setMediaFile(null);
            setCategory('');
            setSuccessMessage('Your card created successfully')
    
            // then hand control back to parent
            onSuccess();
        }
        finally{
            setIsLoading(false);
        }
  
    }

return (
    <div>
        <div 
            style={{
            padding: '10px', 
            borderRadius: '20px', 
            }}
        >
        <h3>Start a post</h3>
        <form onSubmit={handleSubmitNewCard}>
            <div >
                <label>Title</label>
                <br />
                <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div>
                <label>Text</label>
                <br />
                <textarea 
                rows={3}
                style={{resize: 'none'}}
                    type="text" 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <div>
                <label>Image</label>
                <br />
                <input 
                    type="file"
                    accept='image/*,video/*' 
                    onChange={(e) => setMediaFile(e.target.files[0])}
                />
            </div>

            <div>
                <label>Category:</label>
                <br />
                <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {CARD_CATEGORIES.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    )
                    )}
                </select>
            </div>

            {error && <p style={{color: 'red'}}>{error}</p>}
            <br />

            <button disabled={isLoading} type='submit'>
                {isLoading ? "Loading..." : "Post Your Card"}
            </button>

            <p>{successMessage}</p>
        </form>
        </div>
    </div>
  )
}
