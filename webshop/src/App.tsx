import './App.css';
import APIService from 'Services/APIServices';
import HomePage from '../src/Components/HomePage/HomePage';
import Order from '../src/Components/Order/Order';
import { User, Item } from 'Types/Types';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBasketShopping } from '@fortawesome/free-solid-svg-icons';

function App () {

  const [users, setUsers] = useState<User[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [pickedItems, setPickedItems] = useState<Item[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const users = await APIService.getUsers();
      const items = await APIService.getItems();
      setUsers(users);
      setItems(items);
    })();
  }, [pickedItems, visible]);

  const addItemToCart = (clickedItem: Item) => {
    setPickedItems((prev: Item[]) => {

      const isAdded = prev?.find(item => item.id === clickedItem.id);

      if (isAdded) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? {...item, amount: item.amount + 1}
            : item
        );
      }
      return [...prev, {...clickedItem, amount: 1}];
    });
  };

  const removeItemFromCart = (id: number) => {
    setPickedItems(prev =>
      prev.reduce((acc, pickedItem) => {
        if (pickedItem.id === id) {
          if (pickedItem.amount === 1) return acc;
          return [...acc, {...pickedItem, amount: pickedItem.amount - 1}];
        } else {
          return [...acc, pickedItem];
        }
      }, [] as Item[])
    );
  };

  const quantitySensor = (name: string, amount: number) => {
    
    const truth1 = pickedItems?.some((item) => item.name === name);
    const truth2 = pickedItems?.some((item) => item.name === name && item.amount === amount);

    if (!truth1) {
      const sensorObject = items.find(item => item.name === name);
      setPickedItems([...pickedItems, {...sensorObject, amount: amount}]);
    } else if (truth2) {
      const prevArray: Item[] = pickedItems?.filter(item => item.name !== name);
      setPickedItems([...prevArray]);
    }
  };

  const visitCheckout = () => {
    setVisible(!visible); 
    navigate('/checkout');
  };

  const amountPickedItems = pickedItems.reduce((acc: number, item) => acc + item.amount, 0);

  return (
    <div className="app-container">
      <div className='header'>
        <button className="header-button" onClick={() => visitCheckout()}>
          <FontAwesomeIcon className="fa-solid fa-basket-shopping" icon={faBasketShopping} />
        </button>
        <div className='header-amount'>{amountPickedItems}</div>
      </div>
      <h1>Kodius Webshop</h1>
        <Routes>
          <Route
            path="/"
            element={<HomePage 
            users={users}
            items={items} 
            pickedItems={pickedItems}
            addItemToCart={addItemToCart}
            removeItemFromCart={removeItemFromCart} 
            quantitySensor={quantitySensor}
            visible={visible} />} />
          <Route 
            path="/checkout" 
            element={<HomePage 
              users={users}
              items={items} 
              pickedItems={pickedItems}
              addItemToCart={addItemToCart}
              removeItemFromCart={removeItemFromCart} 
              quantitySensor={quantitySensor}
              visible={visible} />} />
          <Route path="/order/:id" element={<Order visible={visible} setVisible={setVisible} />} />
        </Routes>
    </div>
  );
}

export default App;
