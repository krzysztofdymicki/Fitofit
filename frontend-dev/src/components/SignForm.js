import React, { useState } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

const SignForm = ({ active }) => {
  return (
    <Form>
      <FormGroup>
        <Label for="username">Username</Label>
        <Input
          type="text"
          name="username"
          id="username"
          placeholder="min. 8 characters"
        />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="min. 8 characters"
        />
      </FormGroup>
      <Button
        type="submit"
        color={active === 'SIGN UP' ? 'primary' : 'secondary'}
        className="submit-button"
      >
        {active === 'SIGN UP' ? 'SIGN UP' : 'SIGN IN'}
      </Button>
    </Form>
  )
}

export default SignForm
