import { Row, Col, Button, Modal, Input, Select, Image, Steps, Radio } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../../util/Header";
import ProductInCart from "../../util/ProductInCart";
import "./style.css";
import { URL_API } from "../../config/constants";
import { cartService } from "../../service/cart";


const Cart = () => {
	const [total, setTotal] = useState(0);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
		callAPI(host);
	};

	const hideModal = () => {
		setIsModalOpen(false);
	}

	const sum = () => {
		let tmp = 0;
		for (let i = 0; i < arrayShoes.length; i++) {
			tmp += arrayShoes[i].price * arrayShoes[i].amount;
		}
		setTotal(tmp);
	};

	const cart = cartService.get();
	console.log(cart)

	// const init = [
	// 	{
	// 		name: 'Giày Nike Air Jordan 1 Low SE Craft ',
	// 		price: 200000,
	// 		imageUrl: '/image/shoe1.png',
	// 		description: 'this is shoe 1',
	// 		quantity: 100,
	// 		amount: 2,
	// 		size: 43
	// 	},
	// 	{
	// 		name: 'shoe 2',
	// 		price: 250000,
	// 		imageUrl: '/image/shoe2.png',
	// 		description: 'this is shoe 2',
	// 		quantity: 10,
	// 		amount: 1,
	// 		size: 43
	// 	},
	// 	{
	// 		name: 'shoe 3',
	// 		price: 300000,
	// 		imageUrl: '/image/shoe3.png',
	// 		description: 'this is shoe 1',
	// 		quantity: 100,
	// 		amount: 1,
	// 		size: 43
	// 	}
	// ]

	const [arrayShoes, setArrayShoes] = useState(cart || []);

	useEffect(() => {
		sum();
	}, []);
	const navigate = useNavigate();
	const handleBack = () => {
		navigate("/");
	};

	const [cityList, setCityList] = useState([]);
	const [districtList, setDistrictList] = useState([]);
	const [wardList, setWardList] = useState([]);

	const [city, setCity] = useState('--Chọn thành phố--');
	const [district, setDistrict] = useState('--Chọn quận/huyện--');
	const [ward, setWard] = useState('--Chọn thị trấn/xã--');

	const host = "https://provinces.open-api.vn/api/";
	
	var callAPI = (api) => {
		return axios.get(api)
			.then((response) => {
				renderData(response.data, "province");
			});
	}

	var callApiDistrict = (api) => {
		return axios.get(api)
			.then((response) => {
				renderData(response.data.districts, "district");
			});
	}
	var callApiWard = (api) => {
		return axios.get(api)
			.then((response) => {
				renderData(response.data.wards, "ward");
			});
	}
	
	var renderData = (array, select) => {
		const tmp = [];
		array.forEach(element => {
			tmp.push({
				label : element.name,
				value: element.code
			})
		});
		if ( select=='province' ) {
			setCityList(tmp);
		} else if ( select == 'district' ) {
			setDistrictList(tmp);
		} else {
			setWardList(tmp);
		}
	}

	const handleChooseCity = (option) => {
		setCity(option.label);
		callAPI('https://provinces.open-api.vn/api/?depth=1');
		callApiDistrict(host + "p/" + option.value + "?depth=2");
	}

	const handleChooseDistrict = (option) => {
		setDistrict(option.label);
		callApiWard(host + "d/" + option.value + "?depth=2");
	}

	const handleChooseWard = (option) => {
		setWard(option.label);
	}

	const [fName, setFName] = useState('');
	const [lName, setLName] = useState('');
	const [phone, setPhone] = useState('')
	const [address, setAddress] = useState('')
	const [homeNumber, setHomeNumber] = useState('')
	const [note, setNote] = useState('')
	const [email, setEmail] = useState('')

	const [valueRadio, setValueRadio] = useState(1);

	const changeRadio = (e) => {
		setValueRadio(e.target.value)
	}

	const onBuy = async () => {
		let shoeBills = [];
		arrayShoes.forEach(shoe => {
			const tmp = {
				size: shoe.size,
				amount: shoe.amount,
				shoeId: shoe.id
			}
			shoeBills.push(tmp)
		}); 
		await axios.post(`${URL_API}/bill`, {
			address: address,
			message: note,
			customerInfo: {
				fullName: fName + ' ' + lName,
				phone: phone,
				email: email
			},
			shoeBills: shoeBills
		}). then( res => {
			if ( res.data.statusCode=='OK' ) {

			}
		}). catch( err => console.log(err))
		hideModal();
	}

	const steps = [
		{
			title: 'Nhập thông tin người mua',
			content: <div className="content-info-customer" >
				<p>
					Họ và tên<span className="obligatory">*</span>
				</p>
				<Row className="name-custmmer">
					<Input value={fName} onChange={(e) => setFName(e.target.value)} className="first-name" placeholder="Họ" />
					<Input value={lName} onChange={(e) => setLName(e.target.value)} className="last-name" placeholder="Tên" />
				</Row>
				<p>
					Email<span className="obligatory">*</span>
				</p>
				<Row>
					<Input value={email} onChange={(e) => setEmail(e.target.value)} className="email" placeholder="Email" />
				</Row>
				<p>
					Số điện thoại<span className="obligatory">*</span>
				</p>
				<Row>
					<Input value={phone} onChange={(e) => setPhone(e.target.value)} className="phone" placeholder="Số điện thoại" />
				</Row>
				<p>
					Địa chỉ<span className="obligatory">*</span>
				</p>
				<div className="select-address">
					<Select
						labelInValue
						style={{
							width: 180,
						}}
						value={city}
						onChange={handleChooseCity}
						options={cityList}
					/>
					<Select
						labelInValue
						style={{
							width: 180,
						}}
						value={district}
						onChange={handleChooseDistrict}
						options={districtList}
					/>
					<Select
						labelInValue
						style={{
							width: 180,
						}}
						value={ward}
						onChange={handleChooseWard}
						options={wardList}
					/>
				</div>
				
				<Input value={homeNumber} onChange={(e) => setHomeNumber(e.target.value)} className="apartment-number" placeholder="Số nhà" />
				<p>Lời nhắn</p>
				<Input type="textarea" value={note} onChange={(e) => setNote(e.target.value)} className="message" />
			</div>
		}, 
		{
			title: 'Xác nhận đơn hàng',
			content: <div className="confirm-modal">
				<Col className="info-customer" span={11}>
					<h3 className="title-info">Thông tin khách hàng</h3>
					<p><b>Họ tên:</b> {fName + ' ' + lName}</p>
					<p><b>Email:</b> {email}</p>
					<p><b>Số điện thoại:</b> {phone}</p>
					<p><b>Địa chỉ:</b> {address}</p>
					<p><b>Lời nhắn:</b> {note}</p>
				</Col>
				<Col className="info-products" span={13}>
					<h3 className="title-info">Đơn hàng của bạn</h3>
					<Row>
						<Col span={1}></Col>
						<Col span={18}><b>Sản phẩm</b></Col>
						<Col span={5}><b>Tạm tính</b></Col>
					</Row>
					<div className="line-big"></div>
					{
						arrayShoes.map(shoe => (
							<div>
								<Row>
									<Col span={1}></Col>
									<Col span={12}>{shoe.name} - <b>Size: </b> {shoe.size}</Col>
									<Col span={3}></Col>
									<Col span={4}>x {shoe.amount}</Col>
									<Col span={3}>{shoe.price * shoe.amount}</Col>
								</Row>
								<div className="line-small"></div>
							</div>
						))
					}
					<Row>
						<Col span={1}></Col>
						<Col span={16}><b>Giao hàng</b></Col>
						<Col span={7}>Đồng giá: <b>25000</b></Col>
					</Row>
					<div className="line-big"></div>
					<Row>
						<Col span={1}></Col>
						<Col className="total-price" span={19}><b>Tổng: </b></Col>
						<Col className="total-price" span={4}><b>{total + 25000}</b></Col>
					</Row>
					<div className="line-big"></div>
					<Radio.Group value={valueRadio} onChange={changeRadio}>
						<Radio value={1}>Thanh toán khi nhận hàng (COD)</Radio>
						<Radio value={2}>Chuyển khoản ngân hàng</Radio>
					</Radio.Group>
					<div className="line-big"></div>
					<p>Thông tin cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng, tăng trải nghiệm sử dụng website, và cho các mục đích cụ thể khác đã được mô tả trong chính sách riêng tư.</p>
				</Col>
			</div>
		}
	]	

	const [current, setCurrent] = useState(0);
	const next = () => {
		setCurrent(current + 1);
		setAddress(homeNumber+', '+ward+', '+district+', '+city);
	};
	const prev = () => {
		setCurrent(current - 1);
	};
	const items = steps.map((item) => ({
		key: item.title,
		title: item.title,
	}));

	return (	
		<div className="pageCart">
			<Header page={"cart"} />
			<Row className="content">
				<Col className="product-name" span={10}>
					Tên sản phẩm
				</Col>
				<Col className="sizes" span={3} >Size</Col>
				<Col className="quantity" span={4}>Số lượng</Col>
				<Col className="subtotal" span={3}>Giá</Col>
				<Col className="total" span={3}>Thành tiền</Col>
				<Col className="clear-cart" span={1}>Xóa</Col>
			</Row>
			<div className='cartEmpty'>
				{arrayShoes.length==0 && (
					<Image src='/image/cart-empty.png' preview={false} />
				) }
			</div>
			{arrayShoes.map((shoe) => (
				<ProductInCart
					id={shoe.id}
					name={shoe.name}
					size={shoe.size}
					url={shoe.imageUrl}
					price={shoe.price}
					quantity={shoe.quantity}
					amount={shoe.amount}
					changeTotal={setTotal}
					resetCart={setArrayShoes}
				/>
			))}

			<Row className="bottom">
				<Button className="bottom-back" onClick={handleBack}>
					&lt;--- Tiếp tục mua hàng
				</Button>
				<Col className="buy-total">
				<Button onClick={showModal} className="bottom-buy">
					MUA NGAY
				</Button>
				</Col>
			</Row>

			<Modal
				open={isModalOpen}
				okButtonProps={{ style: {display: "none"}}}
				cancelButtonProps={{ style: {display: "none"}}}
				width={current==0 ? 700 : 900}
				closable={true}
				onCancel={hideModal}
			>	
				<div className="content-modal">

				<Steps current={current} items={items} />
				<div>{steps[current].content}</div>
				<div
					style={{
						marginTop: 24,
						display: 'flex',
						justifyContent: 'center',
						marginBottom: -24
					}}
				>
					{current < steps.length - 1 && (
						<Button type="primary" onClick={() => next()}>
							Tiếp theo
						</Button>
					)}
					{current > 0 && (
						<Button
							style={{
								margin: '0 8px',
							}}
							onClick={() => prev()}
						>
							Quay lại
						</Button>
					)}
					{current === steps.length - 1 && (
						<Button type="primary" onClick={onBuy}>
							Đặt hàng
						</Button>
					)}
				</div>
				</div>

			</Modal>
		</div>
	);
};

export default Cart;
