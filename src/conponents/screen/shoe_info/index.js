import {Row, Col, Image, Button, Input} from 'antd';
import Header from "../../util/Header";
import { useState } from 'react';

import './style.css'
const ShoeInfo = () => {
     const [number, setNumber] = useState(1);
     const handlePlus = () => {
          setNumber(number+1)
        };
      
        const handleMinus = () => {
          setNumber(number-1)
        };
      
     return (
          <div className='shoe'>
               <Header page={"shoe-info"} />
               <Row >
                    <Col className='shoe-image' span={10}>
                         <Image src='/image/shoe1.png' preview={false} />
                    </Col>
                    <Col span={12}>
                         <p className='name'>Giày Nike Air Jordan 1 Mid Gym Red Panda [BQ6472 061]</p>
                         <p className='cost'> Giá: $1000</p>
                         <p className='code'>Mã sản phẩm: 16037</p>
                         <p className='type'>Loại sản phẩm: Giày Sneaker</p>
                         <p className='description'>Mô tả:
                              Phiên bản Giày Nike Air Jordan 1 Mid Gym Red 
                              Panda đã cập bến tại Minhshopvn. Phần thiết kế 
                              phối màu thời trang đã tạo nên sức hút của các 
                              dòng Nike Jordan 1 Mid và phiên bản này xứng đáng 
                              có 1 vị trí trong tủ đồ nhà mình . Hiên sản phẩm 
                              đang có giá cực ưu đãi tại 60/18 vạn kiếp p3 
                              bình thạnh
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
                                   <Button className='add-to-cart'>Thêm vào giỏ hàng</Button>
                                   <Button className='buy'>Mua ngay</Button>
                              </Col>
                         </Row>
                    </Col>
               </Row>
          </div>
     )
}

export default ShoeInfo;