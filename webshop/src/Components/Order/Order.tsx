import './Order.css';
import { useNavigate } from 'react-router-dom';

interface IProps {
  visible: boolean
  setVisible: (value: boolean) => void
}

function Order ({visible, setVisible}: IProps) {

  const navigate = useNavigate();

  const handleClose = () => {
    setVisible(!visible)
    navigate('/');
  }

  return (
    <div className='order-container'>
      <div className='order-window'>
        <h1 className='order-title'>Order Confirmation</h1>
        <h3 className='order-info'>Your order is confirmed.</h3>
        <h3 className='order-info'>Thank you!</h3> 
        <button className='order-button' onClick={handleClose}>Close</button>   
      </div>
    </div>
  )
}

export default Order;
