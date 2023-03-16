import * as React from 'react';
import Contest from './Contest';
import { Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const Kickstart = () => {
  return (
    <div>
      <div className='sub_navbar'>
        <div className='sub_navbar_arrow_container'>
          <ArrowBackIcon sx={{ color: 'white', fontSize: '35px' }}></ArrowBackIcon>
        </div>
        <div className="sub_navbar_heading">
          <Typography sx={{ fontSize: '80px', lineHeight: '1', color: '#E7F6F2', textShadow: '2.5px 2px black' }}>KickStart</Typography>
        </div>
      </div>
      <Contest />
    </div>
  )
}

export default Kickstart