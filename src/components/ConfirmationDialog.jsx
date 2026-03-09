import React from 'react'

export default function ConfirmationDialog({userM,onClose, onConfirm}) {

        const styleP = {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        background: 'rgba(0, 0, 0, 0.5)', 
        zIndex: '1000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

  return (
    <div
        style={styleP}
    >
        <div
            style={{backgroundColor: 'white', width: '20%', height: '20%', borderRadius: '20px', alignContent: 'center', textAlign: 'center'}}
        >
            
                <div>
                    <h3>Are you sure you want to do this action on {userM.name} {userM.lastName}?</h3>
                    <button onClick={onConfirm}>Confirm</button>
                    <button onClick={onClose}>Close</button>
                </div>
        </div>
    </div>
  )
}
