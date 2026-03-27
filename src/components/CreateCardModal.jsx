import React from 'react'
import CreateCardForm from './CreateCardForm'

export default function CreateCardModal({onClose, onCardPosted}) {
  return (
    <div>
        <button onClick={onClose}>X</button>
        <CreateCardForm
            onSuccess={() => {
                onCardPosted();
                onClose();
            }}
        />
    </div>
  )
}
