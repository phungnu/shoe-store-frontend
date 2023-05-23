import { Row, Col, Image, Input, Modal } from "antd";
import "./ProductInCart.css";
import { useEffect, useState } from 'react'
import { cartService } from "../service/cart";
import { formatter } from "../service/format";


const ProductInCart = ({id, size, name, quantity, price, url, amount, changeTotal, resetCart}) => {

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [number, setNumber] = useState(amount);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		let cart = cartService.get();
		cart = cart.filter((shoe) => shoe.id !== id || (shoe.id==id && shoe.size!=size))
		resetCart(cart);
		cartService.set(cart);
		changeTotal(total => total - price*amount)
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const handlePlus = () => {
		setNumber(number+1)
		let cart = cartService.get();
		for ( let i = 0; i < cart.length; i++) {
		if ( cart[i].id === id && cart[i].size===size )
			cart[i].amount += 1
		}
		resetCart(cart);
		cartService.set(cart);
		changeTotal(total => total + price)
	};

	const handleMinus = () => {
		if ( number==1 )
		return;
		let cart = cartService.get();
		for ( let i = 0; i < cart.length; i++) {
		if ( cart[i].id == id && cart[i].size==size )
			cart[i].amount -= 1
		}
		resetCart(cart);
		cartService.set(cart);
		setNumber(number-1)
		changeTotal(total => total - price)
	};

	return (
		<div className="name-img">
		<div className="border-top"></div>
		<Row className="cart-product">
			<Col span={7}>
			<Row>
				<Image
				className="shoe-img"
				width={100}
				src={url}
				preview={false}
				/>
				<div className="name-quantity">
				<p className="shoe-name">{name}</p>
				</div>
			</Row>
			</Col>
			<Col className="size">{size}</Col>
			<Col className="input-number">
			<Image className="minus" src="/image/minus.png" width={10} preview={false} onClick={handleMinus}/>
			<Input className="input-quantity" value={amount} style={{width: "50px", height: "30px"}}/>
			<Image className="plus" src="/image/plus.png" width={10} preview={false} onClick={handlePlus}/>
			</Col>  
			<Col className="price"> {formatter.format(price)}</Col>  
			<Col className="price-total"> {formatter.format(price*amount)}</Col>  
			<Col>
			<Image 
				className="cancel"
				style={{marginLeft: -30, marginTop: 10}} 
				src='/image/cancel.png' width={25} 
				preview={false} 
				onClick={showModal}
			/>   
			<Modal 
				title="Bạn có chắc chắn muốn xóa không" 
				open={isModalOpen} 
				onOk={handleOk} 
				onCancel={handleCancel}>
			</Modal>
			</Col>  
		</Row>
		<div className="border-bottom"></div>
		</div>
	);
};

export default ProductInCart;
