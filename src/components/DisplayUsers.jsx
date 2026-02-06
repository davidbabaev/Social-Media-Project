import React, { useCallback, useEffect, useMemo, useState } from 'react'
import UsersPage from '../pages/UsersPage'

function DisplayUsers() {

      const [search, setSearch] = useState('')

    return (
    <div>
      <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
        <UsersPage
          value={search}
        />
    </div>
  )
}

export default React.memo(DisplayUsers)
