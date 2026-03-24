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

    return(
        <></>
    )
}
