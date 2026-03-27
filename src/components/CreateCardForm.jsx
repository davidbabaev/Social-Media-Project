import React, { useRef, useState } from 'react'
import { CARD_CATEGORIES } from '../constants/cardsCategories';
import { useCardsProvider } from '../providers/CardsProvider';
import EmojiPicker from 'emoji-picker-react';
import MediaDisplay from './MediaDisplay';

export default function CreateCardForm({onSuccess}) {

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [mediaFile, setMediaFile] = useState(null);
    const [category, setCategory] = useState('');
    const [webUrl, setWebUrl] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const {handleCardRegister} = useCardsProvider();
    const [isLoading, setIsLoading] = useState(false);
    const [isEmojiOpen, setIsEmojiOpen] = useState(false);
    const fileInputRef = useRef(null);
    const [isLinkFieldShown, setIsLinkFieldShown] = useState(false);

    const onEmojiClick = (emojiData) => {
        setText(prev => prev + emojiData.emoji);
        setIsEmojiOpen(false);
    }

    const previewMediaFile = mediaFile ? URL.createObjectURL(mediaFile) : null

    const handleSubmitNewCard = async (e) => {
        e.preventDefault();

        setError('');
        setSuccessMessage('');

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
        formData.append('web', webUrl);
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
            setWebUrl('');
            setSuccessMessage('Your card created successfully')
            setIsLinkFieldShown(false)
    
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
                <label>Upload Your Image/ Video </label>
                <br />
                <input 
                    ref={fileInputRef}
                    type="file"
                    accept='image/*,video/*' 
                    onChange={(e) => setMediaFile(e.target.files[0])}
                />
            </div>


            <button type='button' onClick={() => setIsLinkFieldShown(!isLinkFieldShown)}>Add Link 🔗</button>

            {isLinkFieldShown && (
                <div>
                    <label>Url</label>
                    <br />
                    <input 
                        value={webUrl}
                        type="url"
                        onChange={(e) => setWebUrl(e.target.value)}
                    />
                </div>
            )}

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
            

            {previewMediaFile && (
                <>
                    <MediaDisplay
                    mediaUrl={previewMediaFile}
                    mediaType={mediaFile.type.startsWith('video/') ? 'video' : 'image'}
                    style={{width: '20%', borderRadius: '10px'}}
                    />
                    <button 
                        type='button' 
                        onClick={() => {
                            setMediaFile(null);
                            fileInputRef.current.value = '';
                        }}
                    >remove</button>
                </>
            )}

            {error && <p style={{color: 'red'}}>{error}</p>}
            <br />

            <button type='button' onClick={() => setIsEmojiOpen(!isEmojiOpen)}>😊</button>

            {isEmojiOpen && <EmojiPicker onEmojiClick={onEmojiClick}/>}

            <button disabled={isLoading} type='submit'>
                {isLoading ? "Loading..." : "Post Your Card"}
            </button>

            <p>{successMessage}</p>
        </form>
        </div>
    </div>
  )
}
