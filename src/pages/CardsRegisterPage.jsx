import React, { useEffect, useState } from 'react'
import { useCardsProvider } from '../providers/CardsProvider'
import { useNavigate } from 'react-router-dom';
import { CARD_CATEGORIES } from '../constants/cardsCategories';

export default function CardsRegisterPage() {

    const {handleCardRegister} = useCardsProvider()

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [img, setImg] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    // function, (e) e.preventdefault()
    const handleSubmitNewCard = (e) => {
        e.preventDefault();

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

        const result = handleCardRegister(title, text, img, category)

        if(!result.success){
            setError(result.message)// show error to user
            return;
        }

        navigate('/dashboard/mycards')
    }

  return (
      <div>
        <h2>Create New Card</h2>
        <div 
            style={{
            border: 'solid black 1px', 
            padding: '20px', 
            borderRadius: '20px', 
            margin: '20px 0px'
            }}
        >

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
                    type="text" 
                    placeholder= "https://example.com/image.jpg"
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
        </form>
        </div>
    </div>
  )
}
