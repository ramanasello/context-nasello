import { useState } from 'react'
import React from 'react'


 export const CartContext = React.createContext()

 export const CartProvider = ({children}) => {
    const [productCartList, setProductCartList] = useState([])
     
    const isInCart = (productId) => {
        const productExist = productCartList.some(item=>item.id === productId);
        return productExist
    }


    const addItem = (item, productId, quantity) => {
        console.log("item", item, "productId", productId, "quantity", quantity)
        const newProduct = {
            ...item,
            quantity,
      
        }
         console.log("newProduct", newProduct)

         if(isInCart(item.id)){
            const productPos= productCartList.findIndex(product=>product.id ===item.id)
            const newArreglo = [...productCartList]
            newArreglo[productPos].quantity = newArreglo[productPos].quantity + quantity;
            setProductCartList(newArreglo)
        } else{

            const newArreglo = [...productCartList]
            newArreglo.push(newProduct)
            setProductCartList(newArreglo)
        }
    }

     const removeItem=(itemId)=>{
     console.log("itemId", itemId)
     const newArreglo=productCartList.filter(product=>product.id !== itemId)
     setProductCartList(newArreglo)
     }

     const clear= () => {
        setProductCartList([])
     }
     return (
         <CartContext.Provider value={{productCartList, addItem, removeItem, clear, isInCart}}>
             {children }
         </CartContext.Provider>
     )
}