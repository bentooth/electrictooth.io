import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.div`
  color: white !important
  text-transform: uppercase
  border-radius: 3px
  text-align: center
  margin: 15px
  padding: 10px 20px
  background-color: #387D7A
`

const Button = ({ children, onClick }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>
}

export default Button