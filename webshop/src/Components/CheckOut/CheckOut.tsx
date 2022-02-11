import './CheckOut.css';
import { Item, User } from '../../Types/Types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface IProps {
  users: User[],
  pickedItems: Item[],
  quantitySensor: (name: string, amount: number) => void
}

function CheckOut ({ users, pickedItems, quantitySensor }: IProps) {

  const [isChecked20Off, setIsChecked20Off] = useState(false);
  const [isChecked5Off, setIsChecked5Off] = useState(false);
  const [isChecked20Minus, setIsChecked20Minus] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isCheckedMotion, setIsCheckedMotion] = useState(false);
  const [isCheckedSmoke, setIsCheckedSmoke] = useState(false);
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const calculateTotal = (pickedItems: Item[]) => {

    const total = pickedItems.reduce((acc: number, pickedItem) => acc + pickedItem.amount * pickedItem.price, 0);

    if (isChecked20Off && (isChecked5Off || isChecked20Minus)) {
      alert('Not able to combine 20% OFF with other codes promotions.');
    } else if ((isCheckedMotion || isCheckedSmoke) && (isChecked20Off || isChecked5Off || isChecked20Minus)) {
        alert('Not able to combine codes and quantity promotions.');
    } else if (isChecked20Off) {
        return total - (total * 0.2);
    } else if (isChecked5Off && !isChecked20Minus) {
        return total - (total * 0.05);
    } else if (isChecked20Minus && !isChecked5Off) {
        if (total < 20) {
          alert('Not able to purchase this order as a negative value.');
        }
        return total - 20;
    } else if (isChecked5Off && isChecked20Minus) {
        const totalAmount = (total - (total * 0.05)) - 20;
        if (totalAmount < 0) {
          alert('Not able to purchase this order as a negative value.');
        }
        return totalAmount;
    } else if (isCheckedMotion && isCheckedSmoke) {
        return (total - (74.97 - 65) - (39.98 - 35))
    } else if (isCheckedMotion && !isCheckedSmoke) {
        return (total - (74.97 - 65));
    } else if (isCheckedSmoke && !isCheckedMotion) {
        return (total - (39.98 - 35));
    } else if (total < 0) {
        alert('Not able to purchase this order as a negative value.');
    }
    return total;
  }

  const handle20Off = () => {
    setIsChecked20Off(!isChecked20Off);
  };

  const handle5Off = () => {
    setIsChecked5Off(!isChecked5Off);
  };

  const handle20Minus = () => {
    setIsChecked20Minus(!isChecked20Minus);
  };

  const handleMotionSensor = () => {

    const truth1 = pickedItems.some(item => item.name === "Motion Sensor" && item.amount === 3 && isCheckedMotion);
    const truth2 = pickedItems.some(item => item.name === "Motion Sensor" && item.amount > 0 ? true : false);

    if (truth1) {
      setIsCheckedMotion(!isCheckedMotion);
      quantitySensor('Motion Sensor', 3);
    } else if (truth2) {
      alert('You already have this item in your cart. Please remove it before using the discount.');
      return;
    } else {
      setIsCheckedMotion(!isCheckedMotion);
      quantitySensor('Motion Sensor', 3);
      return;
    }
  };

  const handleSmokeSensor = () => {

    const truth1 = pickedItems.some(item => item.name === "Smoke Sensor" && item.amount === 2 && isCheckedSmoke);
    const truth2 = pickedItems.some(item => item.name === "Smoke Sensor" && item.amount > 0 && !isCheckedSmoke ? true : false);

    if (truth1) {
      setIsCheckedSmoke(!isCheckedSmoke);
      quantitySensor('Smoke Sensor', 2);
    } else if (truth2) {
      setIsCheckedSmoke(isCheckedSmoke);
      alert('You already have this item in your cart. Please remove it before using the discount.');
      return;
    } else {
      setIsCheckedSmoke(!isCheckedSmoke);
      quantitySensor('Smoke Sensor', 2);
      return;
    }
  };

  const handleCheckout = () => {

    if (Number(calculateTotal(pickedItems).toFixed(2)) <= 0) {
      setIsCheckedOut(isCheckedOut);
    } else {
      setIsCheckedOut(!isCheckedOut);
    }
  };

  function handleConfirm (e: React.SyntheticEvent) {
    e.preventDefault();

    if (users) {
      users.map(user => {

        if ((email && address && creditCard) == '') {
          return alert('Please fill in all fields.');
        } else if (user.email == email && user.address == address && user.creditCard == creditCard){
          setEmail('');
          setAddress('');
          setCreditCard('');
          pickedItems.length = 0;
          navigate(`/order/${user.id}`);
        } else {
          setError('The information provided is not correct!');
        }
      })
    }
  }

  return (
    <aside className='checkout-container'>
      <h3 className='checkout-align'>Checkout</h3>
      <div className='filler-line'></div>
      {pickedItems.length === 0 ?
      <h3>No items in the shopping cart</h3> :
      pickedItems.map(item => (
        <div className='checkout-item' key={item.id}>
          <p>{item.name}</p>
          <div className='checkout-item-info'>
            <p>{item.amount} x {((item.price * 100) / 100).toPrecision(4)}</p>
            <p>{(item.amount * item.price).toFixed(2)}</p>
            <img className='image-checkout' src={item.image} alt={item.name} />
          </div>
        </div>
      ))}
      <div className='filler-line'></div>
      <div className='checkout-promo'>
        <h4>Codes discount</h4>
        <div className="promo-1">
          <div className="promo-inline-check">
            <input
              type="checkbox"
              className='promo-check'
              id="promo-1-check"
              name="promo-1-check"
              value="20Off"
              checked={isChecked20Off}
              onChange={handle20Off}
            />
            20% OFF
          </div>
        </div>
        <div className="promo-2">
          <div className="promo-inline-check">
            <input
              type="checkbox"
              className='promo-check'
              id="promo-2-check"
              name="promo-2-check"
              value="5Off"
              checked={isChecked5Off}
              onChange={handle5Off}
            />
            5% OFF
          </div>
        </div>
        <div className="promo-3">
          <div className="promo-inline-check">
            <input
              type="checkbox"
              className='promo-check'
              id="promo-3-check"
              name="promo-3-check"
              value="20Minus"
              checked={isChecked20Minus}
              onChange={handle20Minus}
            />
            20 EUR OFF
          </div>
        </div>
        <h4 className='discount-align'>Quantity discount</h4>
        <div className="promo-4">
          <div className="promo-inline-check">
            <input
              type="checkbox"
              className='promo-check'
              id="promo-4-check"
              name="promo-4-check"
              value="3Motion"
              checked={isCheckedMotion}
              onChange={handleMotionSensor}
            />
            3x MOTION SENSOR
            {isCheckedMotion ? <div className='space'>65.00 EUR</div> : ""}
          </div>
        </div>
        <div className="promo-5">
          <div className="promo-inline-check">
            <input
              type="checkbox"
              className='promo-check'
              id="promo-5-check"
              name="promo-5-check"
              value="2Smoke"
              checked={isCheckedSmoke}
              onChange={handleSmokeSensor}
            />
            2x SMOKE SENSOR
            {isCheckedSmoke ? <div className='space'>35.00 EUR</div> : ""}
          </div>
        </div>
      </div>
      <div className='filler-line'></div>
      <h3>Total: {calculateTotal(pickedItems).toFixed(2)} EUR</h3>
      <div className='checkout'>
        {!isCheckedOut ?
        <button className='checkout-button align' onClick={handleCheckout}>Checkout</button>
        :
        <div className='checkout-form-container'>
          <div className="checkout-form-input">
            <div className='filler-line'></div>
            <label className="checkout-label">Email:</label>
            <input
              className="checkout-input"
              type="email"
              placeholder="Enter email..."
              value={email}
              onChange={e => setEmail(e.target.value)}>
            </input>
            <label className="checkout-label">Address:</label>
            <input
              className="checkout-input"
              type="text"
              placeholder="Enter address..."
              onChange={e => setAddress(e.target.value)}>
            </input>
            <label className="checkout-label">Credit card:</label>
            <input
              className="checkout-input"
              type="text"
              placeholder="Enter credit card number..."
              onChange={e => setCreditCard(e.target.value)}>
            </input>
            {(error != "") ? <div className="error">{error}</div> : ""}
          </div>
          <div className="checkout-form-button">
            <button className="checkout-button" type="submit" onClick={handleConfirm}>Confirm</button>
          </div>
        </div>}
      </div>
    </aside>
  );
}

export default CheckOut;
