import React from 'react'
import Navbar from './navbar/page'
import LoginPage from './login/page'


const Home = () => {
  return (
    <div className='text-center'>
      <Navbar/>
      <LoginPage/>
    </div>
  )
}

export default Home