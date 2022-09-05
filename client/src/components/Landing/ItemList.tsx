import React from 'react'


const ItemList :React.FC<React.PropsWithChildren> = ({children}) : React.ReactElement=> {
  return (
    <div>{children}</div>
  )
}

export default ItemList