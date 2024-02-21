import React, { useState, useEffect } from 'react';
import '../index.css';

const NFTs = ({ nftData, onBuyClick, cartItems, openCart }) => {
  const [isBought, setIsBought] = useState(false);

  // Check if the NFT is already in the cart
  const isInCart = cartItems.some((item) => item.id === nftData.id);

  const handleBuyClick = () => {
    if (!isBought) {
      setIsBought(true);
      onBuyClick(nftData);
    }
  };

  const handleGoToCartClick = () => {
    openCart();
  };

  useEffect(() => {
    // Reset the bought state when the cart is cleared
    if (cartItems.length === 0) {
      setIsBought(false);
    }
  }, [cartItems]);

  return (
    <td>
      <img src={nftData.picture} alt="NFT" style={{ width: '100%', height: '100%' }} />
      <br />
      {isBought ? (
        <button className="buy-button" onClick={handleGoToCartClick}>
          Go to Cart
        </button>
      ) : (
        <button className="buy-button" onClick={handleBuyClick} disabled={isInCart}>
          {isInCart ? 'Already in Cart' : `Buy for ${nftData.price} ETH`}
        </button>
      )}
    </td>
  );
};

export default NFTs;
