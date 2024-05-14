import { Row, Col, Image, Input, Modal } from "antd";
import "./ProductInCart.css";
import { useEffect, useState } from 'react'
import { formatter } from "../service/format";

import { changeAmountInCartAPI, removeFromCartAPI } from "../service/apis";
import {toast} from 'react-toastify';

const ProductInCart = ({id, size, name, quantity, price, url, amount, changeTotal, resetCart}) => {
	toast.configure();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [number, setNumber] = useState(amount);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = async () => {
		var payload = {id: id};
		await removeFromCartAPI(payload)
			.then(res => {
				if ( res.data.statusCode=='OK' ){
					changeTotal(total => total - price*amount)
					setIsModalOpen(false);
					resetCart();
					toast.success('XÓA GIÀY THÀNH CÔNG', {
						position: toast.POSITION.TOP_CENTER
				   });
				}
			})
		// changeTotal(total => total - price*amount)
		// setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const handlePlus = async () => {
		var payload = {id: id, action: "plus"};
		await changeAmountInCartAPI(payload)
			.then(res => {
				if ( res.data.statusCode=='OK' ){
					changeTotal(total => total + price)
					resetCart();
					setNumber(number => number + 1);
				}
			})
	};

	const handleMinus = async () => {
		console.log(number);
		if ( number==1 )
			return;
		
		var payload = {id: id, action: "minus"};
		await changeAmountInCartAPI(payload)
			.then(res => {
				if ( res.data.statusCode=='OK' ){
					changeTotal(total => total - price)
					resetCart();
					setNumber(number => number - 1);
				}
			})
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
