import {Row, Col, Image, Button, Input} from 'antd';
import Header from "../../util/Header";
import { useState, useEffect } from 'react';
import { URL_API } from "../../config/constants";
import axios from 'axios';
import './style.css'
import { useSearchParams } from "react-router-dom";
import { cartService } from '../../service/cart';
const ShoeInfo = () => {

     const [searchParams] = useSearchParams();

     const [shoe, setShoe] = useState([]);

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
          setNumber(number-1)
     };

     const addToCart = () => {
          let cart = cartService.get() || [];
          const shoeinCart = {...shoe, quantity: number}
          cart.push(shoeinCart);
          cartService.set(cart);
     }
      
     return (
          <div className='shoe'>
               <Header page={"shoe-info"} />
               <Row >
                    <Col className='shoe-image' span={10}>
                         <Image src={shoe.imageUrl} preview={false} />
                    </Col>
                    <Col span={12}>
                         <p className='name'>{shoe.name}</p>
                         <p className='cost'> Giá: {shoe.price}</p>
                         <p className='description'>Mô tả:
                              {shoe.description}
                         </p>
                         <Row >
                              <Col  span={16}>
                                   <p>Size</p>
                                   <div className='sizes'>
                                             <Button className='size'>Size 38</Button>
                                             <Button className='size'>Size 39</Button> 
                                             <Button className='size'>Size 40</Button>
                                             <Button className='size'>Size 41</Button>
                                             <Button className='size'>Size 42</Button>
                                             <Button className='size'>Size 43</Button>
                                             <Button className='size'>Size 44</Button>
                                             <Button className='size'>Size 45</Button>
                                   </div>
                              </Col>
                              <Col span={5}>
                                   <p>Biểu dồ kích cỡ</p>
                              </Col>
                         </Row>
                         <Row>
                              <Col className='quantity-shoe'>
                                   <div className='border-input-quantity'>
                                        <Image className="minus" src="/image/minus.png" width={10} preview={false} onClick={handleMinus}/>
                                        <Input className="input-quantity" value={number} style={{width: "50px", height: "30px"}}/>
                                        <Image className="plus" src="/image/plus.png" width={10} preview={false} onClick={handlePlus}/>
                                   </div>
                                   <Button onClick={addToCart} className='add-to-cart'>Thêm vào giỏ hàng</Button>
                                   <Button className='buy'>Mua ngay</Button>
                              </Col>
                         </Row>
                    </Col>
               </Row>
          </div>
     )
}

export default ShoeInfo;