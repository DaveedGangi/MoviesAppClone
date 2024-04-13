import React from 'react'

const CartContext = React.createContext({
  usernames: '',
  updateName: () => {},
})

export default CartContext
