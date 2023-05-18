import './Shoes.css';
import {Row, Image} from "antd";
import { useNavigate } from 'react-router-dom';
import { formatter } from '../service/format';
const Shoes = ({id, name, url, price, quantity}) => {
     const navigate = useNavigate();
     const handleShoeInfo = (id) => {
          navigate(`/shoe-info?id=${id}`);
     };
     return (
          <div onClick={() => handleShoeInfo(id)} className="shoes">
               <div className='top-shoes'>
                    <Row className='shoe-img'>
                         <Image style={{padding: 10}} width={210} src={url}  preview={false}/>
                    </Row>
                    <Row className='addToCartLoGo'>
                         <Image style={{backgroundColor:'#ffffff', padding: '3px', borderRadius:'10px'}} width={30} src='/image/add-to-cart.png' preview={false}/>
                    </Row>
               </div>
               <div className='info'>
                    <Row className='name-shoe'>
                         <p className='name-shoe-home'>{name}</p>
                    </Row>
                    <Row className="fee-quantily" style={{marginTop: '-3%', display: 'flex', justifyContent: 'space-between'}}>
                         <p className='fee'>Price: {formatter.format(price)}</p>
                         {/* <p className='quantily'> Quantity : {quantity}</p> */}
                    </Row>
               </div>
          </div>
     )
}

export default Shoes;