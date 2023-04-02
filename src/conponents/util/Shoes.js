import './Shoes.css';
import {Row, Image} from "antd";
import { useNavigate } from 'react-router-dom';

const Shoes = ({name, url, price, quantity}) => {
     const navigate = useNavigate();
     const handleShoeInfo = () => {
          navigate("/shoe-info");
     };
     return (
          <div className="shoes">
               <div className='top-shoes'>
                    <Row className='shoe-img'>
                         <Image style={{padding: 10}} width={210} src={url} onClick={handleShoeInfo} preview={false}/>
                    </Row>
                    <Row className='addToCartLoGo'>
                         <Image style={{backgroundColor:'#ffffff', padding: '3px', borderRadius:'15px'}} width={30} src='/image/add-to-cart.png' preview={false}/>
                    </Row>
               </div>
               <div className='info'>
                    <Row className='name-shoe'>
                         <p>{name}</p>
                    </Row>
                    <Row className="fee-quantily" style={{marginTop: '-3%', display: 'flex', justifyContent: 'space-between'}}>
                         <p className='fee'>${price}</p>
                         <p className='quantily'> Quantity : {quantity}</p>
                    </Row>
               </div>
          </div>
     )
}

export default Shoes;