import { useNavigate } from 'react-router-dom';

export default function LoginPopup({isOpen, onClose}) {

    const navigate = useNavigate();

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
                    <h3>Login For Use Features</h3>
                    <button onClick={() => navigate('/login')}>login</button>
                    <br />
                    <br />
                    <button onClick={onClose}>close</button>
                </div>
            
        </div>
    </div>
  )
}

  



