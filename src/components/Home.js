import { Button, Typography } from '@mui/material'
import { Box} from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

const Home = () => {
    return (
        <div>

        <Navbar />
        <div className='home_container_main'>
            <Box>
                <Typography sx={{ fontSize: '130px', lineHeight: '1', color: '#E7F6F2', textShadow: '2.5px 2px black' }}>Codlax</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Link to="/codeforces">
                    <Button
                        variant="outlined"
                        size="medium"
                        sx={{
                            marginRight: '7.5px',
                            color: '#A5C9CA',
                            borderColor: '#A5C9CA',
                            '&:hover': {
                                borderColor: '#A5C9CA',
                                backgroundColor: '#2C3333'
                            }
                        }} >
                        Codeforces
                    </Button>
                    </Link>
                    <Link to="/leetcode">
                    <Button variant="outlined" size="medium" sx={{
                        margin: '0 7.5px', color: '#A5C9CA', borderColor: '#A5C9CA',
                        '&:hover': {
                            borderColor: '#A5C9CA',
                            backgroundColor: '#2C3333'
                        }
                    }} >
                        Leetcode
                    </Button>
                    </Link>
                    <Link to="/codechef">
                    <Button variant="outlined" size="medium" sx={{
                        marginLeft: '7.5px', color: '#A5C9CA', borderColor: '#A5C9CA',
                        '&:hover': {
                            borderColor: '#A5C9CA',
                            backgroundColor: '#2C3333'
                        }
                    }}>
                        Codechef
                    </Button>
                    </Link>
                </Box>
            </Box>
        </div>
        </div>
    )
}

export default Home