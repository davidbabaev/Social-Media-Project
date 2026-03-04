import React, { useState } from 'react'
import { CARD_CATEGORIES } from '../constants/cardsCategories';
import { useCardsProvider } from '../providers/CardsProvider';

export default function CreateCardForm({onSuccess}) {

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [img, setImg] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const {handleCardRegister} = useCardsProvider();
    


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

        if(img === ''){
            setError('You must choose image')
            return;
        }

        const result = await handleCardRegister({
            title: title, 
            content: text, 
            image: img, 
            category: category
        })

        if(!result.success){
            setError(result.message)// show error to user
            return;
        }
        
        setText('');
        setTitle('');
        setImg('');
        setCategory('');
        setSuccessMessage('Your card created successfully')

        // then hand control back to parent
        onSuccess();
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
                    value={img}
                    type="text" 
                    onChange={(e) => setImg(e.target.value)}
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
            <button type='submit'>Post Your Card</button>
            <p>{successMessage}</p>
        </form>
        </div>
    </div>
  )
}
