import {Row, Col, Image, Button, Input, Radio, Modal} from 'antd';
import Header from "../../util/Header";
import { useState, useEffect } from 'react';
import { URL_API } from "../../config/constants";
import axios from 'axios';
import './style.css'
import { useSearchParams, useNavigate } from "react-router-dom";
import { cartService } from '../../service/cart';
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { formatter } from '../../service/format';
const ShoeInfo = () => {

     const [searchParams] = useSearchParams();

     toast.configure();
     
     const navigate = useNavigate();

     const [shoe, setShoe] = useState({});

	const getDataShoe = async () => {
		let response;
          let code = 222;
		await axios.post(`${URL_API}/shoe/getInfo`,{
               id: searchParams.get('id')
          })
			.then( res => {
				console.log(res);
				if ( res.data.statusCode=='OK') {
					response = res.data;
					code = 200
				}
			})
			.catch(error => {
				code = 404
			});
		console.log(code);
		if (code == 200 ) {
			setShoe(response.data);
		} 
		return response;
	}

	useEffect(() => {
		getDataShoe()
	}, [])

     const [number, setNumber] = useState(1);
     const handlePlus = () => {
          setNumber(number+1)
     };
      
     const handleMinus = () => {
          setNumber((number-1) > 0 ? number-1 : 1)
     };

     const addToCart = () => {
          if ( valueSzie=='' ) {
               toast.error('Bạn cần chọn size giày để thêm vào giỏ hàng', {
                    position: toast.POSITION.TOP_CENTER
               })
               return;
          }
          let cart = cartService.get() || [];
          const shoeinCart = {...shoe, amount: number, size: valueSzie}
          let check = true;
          for ( let i = 0; i < cart.length; i++) {
               if ( cart[i].id==shoeinCart.id && cart[i].size==shoeinCart.size) {
                    cart[i].amount += shoeinCart.amount;
                    check = false;
                    break;
               }
          }
          if ( check) cart.push(shoeinCart);
          cartService.set(cart);
          navigate('/cart')
     }

     const [valueSzie, setValueSize] = useState('');
     const onSelectSize = (e) => {
          setValueSize(e.target.value)
     }
      
     return (
          <div className='shoe'>
               <Header page={"shoe-info"} />
               <Row className='content-shoe-info' >
                    <Col className='shoe-image' span={10}>
                         <Image className='image-shoe' src={shoe.imageUrl} preview={false} />
                    </Col>
                    <Col span={12}>
                         <p className='name'>{shoe.name}</p>
                         <p className='cost'> <b>Giá</b>: {formatter.format(shoe.price)}</p>
                         <p className='description'><b>Mô tả</b>: 
                               {shoe.description}
                         </p>
                         <p><b>Size</b>: </p>
                         <Radio.Group value={valueSzie} onChange={onSelectSize}>
                              <Radio.Button value={38}>Size 38</Radio.Button>
                              <Radio.Button value={39}>Size 39</Radio.Button>
                              <Radio.Button value={40}>Size 40</Radio.Button>
                              <Radio.Button value={41}>Size 41</Radio.Button>
                              <Radio.Button value={42}>Size 42</Radio.Button>
                              <Radio.Button value={43}>Size 43</Radio.Button>
                              <Radio.Button value={44}>Size 44</Radio.Button>
                         </Radio.Group>
                         <p><b>Biểu đồ kích cỡ</b></p>
                         <Image src='/image/bang-size-giay.jpg' preview={false} />
                         <Row>
                              <Col className='fix' span={2}>
                                   <div className='border-input-quantity'>
                                        <Image className="minus" src="/image/minus.png" width={15} preview={false} onClick={handleMinus}/>
                                        <Input className="input-quantity" value={number} style={{width: "50px", height: "30px", textAlign:'center', fontSize: '20px'}}/>
                                        <Image className="plus" src="/image/plus.png" width={15} preview={false} onClick={handlePlus}/>
                                   </div>
                              </Col>
                              <Col span={1}></Col>
                              <Col span={8}>
                                   <div className='add-to-cart' onClick={addToCart}>
                                        <p>Thêm vào giỏ hàng</p>
                                   </div>
                              </Col>
                              <Col span={1}></Col>
                              {/* <Col>
                                   <div className='buy-now' >
                                        <p>Mua ngay</p>
                                   </div>
                              </Col> */}
                         </Row>
                    </Col>
               </Row>
          </div>
     )
}

export default ShoeInfo;