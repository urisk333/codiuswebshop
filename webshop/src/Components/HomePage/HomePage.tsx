import './HomePage.css';
import { Item, User } from '../../Types/Types';
import ShopItem from '../ShopItem/ShopItem';
import CheckOut from '../CheckOut/CheckOut';

interface IProps {
  users: User[],
  items: Item[],
  pickedItems: Item[],
  addItemToCart: (clickedItem: Item) => void,
  removeItemFromCart: (id: number) => void,
  quantitySensor: (name: string, amount: number) => void,
  visible: boolean
}

function HomePage ({ items, addItemToCart, removeItemFromCart, quantitySensor, pickedItems, users, visible }: IProps) {

  return (
    <div className='home-container'>
      <aside className='checkout-form'>
        {visible && <CheckOut users={users} pickedItems={pickedItems} quantitySensor={quantitySensor} />}
      </aside>
      <div className='homepage-container'>
        {items?.map(item => (
          <div className='shopitem-list' key={item.id}>
            <ShopItem 
            item={item} 
            addItemToCart={addItemToCart}
            removeItemFromCart={removeItemFromCart} 
            pickedItems={pickedItems} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
