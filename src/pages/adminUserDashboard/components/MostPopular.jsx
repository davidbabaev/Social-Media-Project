import React from 'react'
import MostPupularCardReuse from './reusable components/MostPupularCardReuse';
import useAnalytics from '../hooks/useAnalytics';

export default function MostPopular() {

    const { 
      mostActiveUser,
      mostLikesCard,
    } = useAnalytics();

  return (
    <div>
        <MostPupularCardReuse
            valueTitle = {mostActiveUser?.name}
            title = {"Most Active User"}
            valueCount = {mostActiveUser?.posts}
            description = {"Total Posts"}
        />    

        <MostPupularCardReuse
            valueTitle = {mostLikesCard?.title}
            title = {"Most like card"}
            valueCount = {mostLikesCard?.likes.length}
            description = {"Post's Likes"}
        />    
    </div>
  )
}
