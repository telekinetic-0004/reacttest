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
      picture: 'https://miro.medium.com/v2/resize:fit:628/1*xm2-adeU3YD4MsZikpc5UQ.png',
    },
    {
      id: 2,
      picture: 'https://cryptopotato.com/wp-content/uploads/2022/05/img1_bayc.jpg',
    },
    {
      id: 3,
      picture: 'https://lh3.googleusercontent.com/WnI8a9xVVylM_kcC2N7dQMRyHwhv0eOmexqNRxmlYtcKq7-kV-oSjsqx-2VBIUDzrBC2TVkcjDBgcVyTh4QsiJgsw-EXDslNHkWOIA=w1400-k',
    },
    {
      id: 4,
      picture: 'https://techstory.in/wp-content/uploads/2022/07/Screenshot-2022-07-11-at-8.57.18-AM-1024x1024.png',
    },
    {
      id: 5,
      picture: 'https://lh3.googleusercontent.com/852YyC23BYLgILgw77DzDOkCiGEYKhHhzCwzo-sI6aks2AxcrlqSyzaavP-SMW50gP4i3SaumGbzP4CH2WGgKRdOofjBrNYSAoBAyg=w1400-k',
    },
    {
      id: 6,
      picture: 'https://static.wixstatic.com/media/95db9b_c857dc8dc7094bd3aaf4556ef0a45d13~mv2.png/v1/fit/w_600%2Ch_600%2Cal_c/file.png',
    }
  ], []);

  // Function to generate random prices between 5 to 10 with decimals
  const generateRandomPrices = (nftData) => {
    return nftData.map((nft) => ({
      ...nft,
      price: (Math.random() * (10 - 5) + 5).toFixed(2),
    }));
  };

  const nftDataWithPrices = useMemo(() => generateRandomPrices(nftData), [nftData]);

  // Function to add an item to the cart
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
    setTotalPrice(totalPrice + parseFloat(item.price));
  };

  // Function to handle removing an item from the cart
const removeFromCart = (itemToRemove) => {
  // Calculate the new total price by subtracting the price of the removed item
  const newTotalPrice = totalPrice - parseFloat(itemToRemove.price);

  // Filter out the removed item from the cart items
  const updatedCartItems = cartItems.filter((item) => item.id !== itemToRemove.id);

  // Update the cart items and total price
  setCartItems(updatedCartItems);
  setTotalPrice(newTotalPrice);
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
