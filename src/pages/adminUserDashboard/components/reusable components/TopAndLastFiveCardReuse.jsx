import React from 'react'
import getTimeAgo from '../../../../utils/getTimeAgo'
import MediaDisplay from '../../../../components/MediaDisplay'
import { useNavigate } from 'react-router-dom'

export default function TopAndLastFiveCardReuse({topFiveValue, usersArrayValue, mainTitle, showInteractions}) {

    const navigate = useNavigate();

  return (
        <div 
            style={{
                width: "100%",
                border:'1px solid lightgray', 
                borderRadius: '10px', 
                padding: '15px'
            }}>
            <h2>{mainTitle}</h2>
            {(topFiveValue || []).map((card) => {
            const cardCreator = usersArrayValue.find(u => u._id === card.userId)

            return(
                <div 
                key={card._id}
                style={{display:'flex', gap: '10px', alignItems: 'center', marginBottom: '15px'}}  
                >
                
                <div
                    onClick={() => navigate(`/carddetails/${card._id}`)}
                >
                    <MediaDisplay
                        mediaUrl={card.mediaUrl}
                        mediaType={card.mediaType}
                        style={{width: '200px', height: '120px',borderRadius: '10px', objectFit: 'cover', cursor: 'pointer'}}
                    />

                </div>
                
                <div>
                    <div style={{display:'flex'}}>
                        <img style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        border: '2px, solid, white',
                        objectFit: 'cover',
                        cursor: 'pointer'
                        }} 
                        src={cardCreator?.profilePicture}
                        onClick={() => navigate(`/profiledashboard/${cardCreator?._id}/profilemain`)}
                        />

                        <div style={{display: 'flex', flexDirection:'column'}}>
                        <p 
                            style={{margin: '5px 0px', cursor: 'pointer'}}
                            onClick={() => navigate(`/profiledashboard/${cardCreator?._id}/profilemain`)}
                        >
                            {cardCreator?.name} {cardCreator?.lastName}  
                        </p>
                        <p
                            style={{
                                color: 'gray', 
                                fontSize:'13px', 
                                margin: 0,
                            }}
                        >{getTimeAgo(card.createdAt)}</p>
                        </div>
                    </div>
                    <p 
                        style={{fontWeight: 'bold', margin: 0, cursor: 'pointer'}}
                        onClick={() => navigate(`/carddetails/${card._id}`)}
                        >{card.title}</p>
                    <p 
                        onClick={() => navigate(`/carddetails/${card._id}`)}
                        style={{
                        cursor: 'pointer',
                        margin: '5px 0px',
                        margin: 0,
                        whiteSpace: 'nowrap',        // prevent text from wrapping
                        overflow: 'hidden',          // hide overflow
                        textOverflow: 'ellipsis',    // show "..." at the end
                        maxWidth: '200px'
                        }}>
                            {card.content}
                    </p>
                    {showInteractions && 
                        <p>
                            {card.comments.length + card.likes.length} 
                            {(card.comments + card.likes).length < 2 ? " Interactions" : " Interaction"}
                        </p>
                    }
                </div>
                </div>
            )
        })}
      </div>
  )
}
