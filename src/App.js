import React, { useState, useMemo } from 'react';
import NFTs from './components/NFTs';
import Cart from './components/Cart';
import './index.css';

const App = () => {
  // Define state to manage cart items, total price, and bought NFTs
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [boughtNFTs, setBoughtNFTs] = useState([]);
  const nftData = useMemo(() => [
    {
      id: 1,
      picture: 'https://i.pinimg.com/564x/ea/7d/52/ea7d5281da8fac29baeca7a863e7d5d7.jpg',
    },
    {
      id: 2,
      picture: 'https://i.pinimg.com/564x/e3/2f/51/e32f516e1164e0c445ccd0bfb5f24337.jpg',
    },
    {
      id: 3,
      picture: 'https://i.pinimg.com/564x/e5/9d/fe/e59dfed15d6a7d1f7603dfbb104573cd.jpg',
    },
    {
      id: 4,
      picture: 'https://i.pinimg.com/564x/24/c8/9b/24c89bda027cbf2b9277f0db67be8d9d.jpg',
    },
    {
      id: 5,
      picture: 'https://i.pinimg.com/originals/dc/cf/6c/dccf6c06349ba8bf00c6639b1416924e.jpg',
    },
    {
      id: 6,
      picture: 'https://i.pinimg.com/564x/21/62/5d/21625d50f8151fb8f69aa67325f0466f.jpg',
    }
  ], []);

// Function to generate random prices less than 0.00001
const generateRandomPrices = (nftData) => {
  return nftData.map((nft) => {
    const price = Number((Math.random() * 0.00001).toFixed(10)); // Convert to number
    return {
      ...nft,
      price: price.toFixed(10), // Format as a string with 10 decimal places
    };
  });
};

  const nftDataWithPrices = useMemo(() => generateRandomPrices(nftData), [nftData]);

// Function to add an item to the cart
const addToCart = (item) => {
  const price=Number(parseFloat(item.price).toFixed(10));
  setCartItems([...cartItems, item]);
  setTotalPrice(Number((totalPrice + price).toFixed(10))); 
};

  // Function to handle removing an item from the cart
  const removeFromCart = (itemToRemove) => {
    const pricetoremove=parseFloat(itemToRemove.price)
  // Calculate the new total price by subtracting the price of the removed item
  const newTotalPrice = totalPrice - pricetoremove;

  // Filter out the removed item from the cart items
  const updatedCartItems = cartItems.filter((item) => item.id !== itemToRemove.id);

  // Update the cart items and total price
  setCartItems(updatedCartItems);
  setTotalPrice(Number(newTotalPrice.toFixed(10)));
};


  // Function to handle the purchase
  const handlePurchase = () => {
    // Logic to handle purchase, such as clearing cart and updating database
    setBoughtNFTs([...boughtNFTs, ...cartItems]);
    setCartItems([]);
    setTotalPrice(0);
    alert('Purchase successful!');
  };

  // Function to clear the cart
  const clearCart = () => {
    setCartItems([]);
    setTotalPrice(0);
  };

  // Function to toggle the cart overlay
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Filter out bought NFTs from the main page
  const filteredNFTData = nftDataWithPrices.filter((nft) => !boughtNFTs.some((boughtNFT) => boughtNFT.id === nft.id));

  return (
    <div className="app">
      <nav className="navbar">
        <h1>NFT Marketplace</h1>
        <button className="cart-button" onClick={() => setIsCartOpen(true)}>
          Cart ({cartItems.length})
        </button>
      </nav>
      {isCartOpen && (
        <div className="cart-overlay">
          <div className="cart-popup">
            <button className="close-button" onClick={() => setIsCartOpen(false)}>Close X </button>
            <Cart cartItems={cartItems} totalPrice={totalPrice} onPayClick={handlePurchase} onClearCart={clearCart} onRemoveItem={removeFromCart}/>
          </div>
        </div>
      )}
      <div className="content">
        <table className="nft-table">
          <tbody>
            {filteredNFTData.map((nft, index) => (
              index % 3 === 0 && (
                <tr key={index}>
                  {[0, 1, 2].map((columnIndex) => {
                    const dataIndex = index + columnIndex;
                    if (dataIndex < filteredNFTData.length) {
                      return (
                        <NFTs key={dataIndex} nftData={filteredNFTData[dataIndex]} onBuyClick={addToCart} cartItems={cartItems} openCart={toggleCart}/>
                      );
                    }
                    return null;
                  })}
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
