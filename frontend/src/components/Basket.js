import React from "react";
import "../styles/basket.scss";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import { Col, Row } from "react-bootstrap";
import Product from './Product'
import '../styles/main.scss'

function Basket(props) {
  const { cartItems, onAdd, onRemove, products } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const taxPrice = itemsPrice * 0.14;
  const shippingPrice = itemsPrice > 2000 ? 0 : 50;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  return (
    <Container>
        <Row>
          <Col className="mt-4" xs={9}>
          <h2>Products</h2>
        <div className='main__container'>
            {products.map((product,key) => (
                <Product key={key} product={product} onAdd={onAdd}/>
            ))}


        </div>


          </Col>
          <Col>
          <aside className="mt-3 basket__container">
      <h2 className="mb-4">Cart Items</h2>
      <div>{cartItems.length === 0 && <div>Cart Is Empty</div>}</div>
      <ol>
      {cartItems.map((item) => (
        <li className="item" key={item.id}>
          <div className="col-2">{item.name}</div>
          <div className="btn__adjust">
            <button className="btn__plus" onClick={() => onAdd(item)}>
              +
            </button>
            <button className="btn__minus" onClick={() => onRemove(item)}>
              -
            </button>
          </div>
          <div className="col-2 ">
            <p>
              {item.qty} x ${item.price.toFixed(2)}
            </p>
          </div>
        </li>
      ))}
      </ol>
   

        <hr size="5px"></hr>

      {cartItems.length !== 0 && (
        <>
          <div className="item">
            <div >Items Price</div>
            <div >${itemsPrice.toFixed(2)}</div>
          </div>
          <div className="item">
            <div >Tax Price</div>
            <div >${taxPrice.toFixed(2)}</div>
          </div>
          <div className="item">
            <div >Shipping Price</div>
            <div >${shippingPrice.toFixed(2)}</div>
          </div>
          <div className="item bold">
            <div >Total Price</div>
            <div >${totalPrice.toFixed(2)}</div>
          </div>

          <div >
            <Button className="btn" onClick={() => alert("Implement Checkout")}>
              Checkout
            </Button>
          </div>
        </>
      )}
    </aside>



          </Col>

        </Row>
       



    </Container>



    
  );
}

export default Basket;
