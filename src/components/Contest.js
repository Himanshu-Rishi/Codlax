import {List} from '@mui/material'
import React from 'react'
import ContestItem from './ContestItem'

const Contest = () => {
  return (
      <div className='contest_container glass'>
      <List sx={{ width: '100%', height: '60vh', maxWidth: '50vw', bgcolor: 'background.paper', borderRadius: '10px'}}>
              <ContestItem flag={true}/>
              <ContestItem flag={true}/>
              <ContestItem flag={true}/>
              <ContestItem flag={false} />
          </List>
    </div>
  )
}

export default Contest