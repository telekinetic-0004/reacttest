import React from 'react';
import '../index.css';

const Cart = ({ cartItems, totalPrice, onPayClick, onClearCart, onRemoveItem }) => {
  const hasItems = cartItems.length > 0;

  return (
    <div className='cart'>
      <h2>Your Cart</h2>
      {!hasItems && <p>No items in the cart</p>}
      {hasItems && (
        <div className='cart-items'>
          <table className='cart-content'>
            <thead>
              <tr>
                <th>NFT Details</th>
                <th>Price (ETH)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img src={item.picture} alt={`NFT ${index}`} className="nft-image"/>
                  </td>
                  <td>{item.price}</td>
                  <td>
                    <button className='remove-button' onClick={() => onRemoveItem(item)}>Remove</button>
                  </td>
                </tr>
              ))}
              <tr>
                <td>Total:</td>
                <td>{totalPrice}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <div>
        {hasItems && (
          <>
            <button className='clear-button' onClick={onClearCart}>Clear Cart</button>
            <button className='pay-button' onClick={onPayClick}>Pay</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
