import React from 'react'
import '../styles/product.scss'
import Button from 'react-bootstrap/Button';


function Product(props) {
    const {product, onAdd} = props
  return (
    
    <div className='product__container'>
       <div className='product__item'>
          <img  src={product.img} alt={product.name} />
            <h3>{product.name}</h3>
            <div className='price'>${product.price}</div>
            <div>
                <Button className='btn'  variant="info" onClick={() => onAdd(product)}>Add To Cart</Button>
            </div>
       </div>
    </div>
  )
}

export default Product