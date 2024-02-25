import React, { useState, useEffect } from 'react';
import '../index.css';

const NFTs = ({ nftData, onBuyClick, cartItems, openCart }) => {
  const [isBought, setIsBought] = useState(false);
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
    setIsBought(cartItems.some((item) => item.id === nftData.id));
  }, [cartItems, nftData]);

  return (
    <td style={{ textAlign: 'center', width: '300px', height: '300px' }}>
      <img 
        src={nftData.picture} 
        alt="NFT" 
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      />
      <br />
      {isBought ? (
        <button className="buy-button" onClick={handleGoToCartClick}>
          Go to Cart
        </button>
      ) : (
        <button className="buy-button" onClick={handleBuyClick} disabled={isInCart}>
          {isInCart ? 'Already in Cart' : `(Add to cart) - Buy for ${nftData.price} ETH`}
        </button>
      )}
    </td>
  );
};


export default NFTs;
