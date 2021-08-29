import '../styles/Body.css'
import React, { useState, useEffect } from 'react'
import { ButtonToggle } from 'reactstrap'
import SignForm from './SignForm'
import userService from '../services/userService'
import signInService from '../services/signIn'

const Body = () => {
  const [user, setUser] = useState({})
  const [active, setActive] = useState('SIGN IN')
  const [notification, setNotification] = useState(null)

  // -- CHECK IF THE USER HAS ALREADY BEEN LOGGED IN --

  useEffect(() => {
    const loggedStorageUser = window.localStorage.getItem('loggedItem')

    if (loggedStorageUser) {
      const user = JSON.parse(loggedStorageUser)
      setUser(user)
    }
  }, [])

  // -- HANDLERS --

  const selectActiveClick = (event) => {
    setActive(event.target.value)
  }

  const handleSignIn = async (credentials) => {
    try {
      const loggedUser = await signInService.signIn(credentials)
      console.log(loggedUser)
    } catch (e) {
      setNotification({
        color: 'red',
        message: 'You passed wrong credentials',
      })
      setTimeout(() => {
        setNotification('')
      }, 5000)
    }
  }

  const handleSignUp = async (credentials) => {
    try {
      const newUser = await userService.signUp(credentials)
      console.log(newUser)
      setNotification({
        message: 'New account created, you can now log in',
        color: 'green',
      })
      setTimeout(() => {
        setNotification('')
      }, 5000)
    } catch (e) {
      setNotification({
        message: 'This username is already in use',
        color: 'red',
      })
      setTimeout(() => {
        setNotification('')
      }, 5000)
    }
  }

  return (
    <div id="home">
      <h1>Fitofit</h1>
      <div className="buttons-container">
        <ButtonToggle
          color="secondary"
          size="lg"
          value="SIGN IN"
          onClick={selectActiveClick}
        >
          SIGN IN
        </ButtonToggle>
        {'  '}
        <ButtonToggle
          color="primary"
          size="lg"
          value="SIGN UP"
          onClick={selectActiveClick}
        >
          SIGN UP
        </ButtonToggle>
      </div>
      <div id="home-forms-container">
        {notification ? (
          <h5 style={{ color: notification.color }}>{notification.message}</h5>
        ) : null}
        <SignForm
          active={active}
          setNotification={setNotification}
          handleSignIn={handleSignIn}
          handleSignUp={handleSignUp}
        />
      </div>
    </div>
  )
}

export default Body
