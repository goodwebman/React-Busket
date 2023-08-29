// Хуки
import { useState } from "react";
import { useEffect } from "react";


import CartHeader from "../CartHeader/CartHeader";
import Product from "../Product/Product";
import Footer from '../CartFooter/CartFooter'
import data from "./../../data"


const Cart = () => {
    const [cart, setCart] = useState(data);


    const [total, setTotal] = useState({    // А тут статически
        price: cart.reduce((prev, curr) => {
            return prev + curr.priceTotal
        }, 0),
        count: cart.reduce((prev, curr) => {
            return prev + curr.count
        }, 0)
    })

    useEffect(() => {  // Footer динамически вычисляет кол-во и цену
        setTotal({
            price: cart.reduce((prev, curr) => {
                return prev + curr.priceTotal
            }, 0),
            count: cart.reduce((prev, curr) => {
                return prev + curr.count
            }, 0)
        })
    }, [cart])

    const deleteProduct = (id) => {
        setCart((cart) => {
            return cart.filter((product) => {return id !== product.id})
        })
    }


    const increase = (id) => {
        setCart((cart) => {
            return cart.map((product) => {
                if (product.id === id) {
                    return {
                        ...product,
                        count: product.count + 1,
						priceTotal: (product.count + 1) * product.price,
                    };
                }

                return product
            } )

            
        })
    }

    const decrease = (id) => {
		setCart((cart) => {
			return cart.map((product) => {
				if (product.id === id) {

					const newCount = product.count - 1 > 1 ? product.count - 1 : 1;

					return {
						...product,
						count: newCount,
						priceTotal: newCount * product.price,
					};
				}
				return product
			})
		})
    }


    const changeValue = (id, value) => {
        setCart((cart) => {
            return cart.map((product) => {
                if (product.id === id) {
                    return {
                        ...product,
                        count: value,
                        priceTotal: value * product.price
                    }
                }
                return product
            })
        })
    } 

    const products = cart.map((product) => {
        return <Product key={product.id}
        product={product}
        deleteProduct={deleteProduct}
        increase={increase}
        decrease={decrease}
        changeValue={changeValue}
         />
    });


    
    


    return ( 
        <section className="cart">
                

            <CartHeader />
            
            {products}

            <Footer total={total} />
            
        </section>
     );
}
 
export default Cart;