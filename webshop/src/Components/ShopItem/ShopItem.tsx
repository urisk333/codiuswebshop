import './ShopItem.css';
import { Item } from '../../Types/Types';

interface IProps {
  item: Item,
  addItemToCart: (clickedItem: Item) => void,
  removeItemFromCart: (id: number) => void,
  pickedItems: Item[]
}

function ShopItem ({ item, addItemToCart, removeItemFromCart, pickedItems }: IProps) {

  return (
    <div className='shopitem-container'>
      <img src={item.image} alt={item.name} />
      {item.name === 'Motion Sensor' ? <div className='promo-title'>3 for 65.00 EUR</div> : null}
      {item.name === 'Smoke Sensor' ? <div className='promo-title'>2 for 35.00 EUR</div> : null}
      <div className='shopitem-info'>
        <h4 className='shopitem-name'>{item.name}</h4>
        <h4 className='shopitem-price'>{((item.price * 100) / 100).toPrecision(4)} EUR</h4>
      </div>
      <div className='shopitem-controls'>
        <button className='shopitem-button remove' onClick={() => removeItemFromCart(item.id)}>Remove</button>  
        {pickedItems.map(pickedItem => pickedItem.id === item.id ? <span key={item.id}>{pickedItem.amount}</span> : null)}
        <button className='shopitem-button add' onClick={() => addItemToCart(item)}>Add</button>  
      </div>
    </div>
  );
}

export default ShopItem;
