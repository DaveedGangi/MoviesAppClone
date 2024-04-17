import React from 'react'

const CartContext = React.createContext({
  usernames: '',
  updateName: () => {},
  userInput: '',
  updateUserInput: () => {},
})

export default CartContext
