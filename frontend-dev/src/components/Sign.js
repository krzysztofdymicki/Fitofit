import '../styles/Sign.css'
import React, { useState } from 'react'
import { ButtonToggle, Button } from 'reactstrap'

import SignForm from './SignForm'

const Sign = () => {
  const [active, setActive] = useState('SIGN IN')

  const selectActiveClick = (event) => {
    setActive(event.target.value)
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
        {active === 'SIGN UP' ? <h3>Create new account</h3> : null}
        <SignForm active={active} />
      </div>
    </div>
  )
}

export default Sign
