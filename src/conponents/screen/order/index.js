import React, { useEffect, useState} from "react";
import { Image, Input, Button, Row, Col, Table, Modal  } from 'antd';
import "./style.css";
import axios from "axios";
import { formatter } from "../../service/format";
import { userService } from "../../service/user";
import { getBillByUserAPI } from "../../service/apis";

const column = [
	{
		title: 'Mã hóa đơn',
		dataIndex: 'id'
	},
	{
		title: 'Thời gian',
		dataIndex: 'createAt',
	},
	{
		title: 'Số tiền',
		dataIndex: 'money',
	},
	{
		title: "Trạng thái",
		dataIndex: "statusText"	
	},
	{
		title: 'Action',
		dataIndex: 'actionView',
	},
]

const Order = () => {

	const [open, setOpen] = useState(false);

	const initBillSelected = {
		id: 0,
		user: {
			name: '',
			phone: ''
		},
		message: '',
		address: '',
		shoebills: [
			{
				id: '',
				amount: '',
				size: '',
				shoe: {
					id: '',
					name: '',
					price: ''
				}
			}
		]
	}

    const user = userService.get();

	const formatTime = (isoString) => {
		const date = new Date(isoString);

		const day = String(date.getUTCDate()).padStart(2, '0');
		const month = String(date.getUTCMonth() + 1).padStart(2, '0');
		const year = date.getUTCFullYear();
		const hours = String(date.getUTCHours()).padStart(2, '0');
		const minutes = String(date.getUTCMinutes()).padStart(2, '0');

		const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

		return formattedDate;
	}

	const [billSelected, setBillSelected] = useState(initBillSelected);
	const [moneyBill, setMoneyBill] = useState();

	const viewBill = (bill, money) => {
		setBillSelected(bill)
		setMoneyBill(money)
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const convertStatusBill = (status) => {
		var statusText = ""
		if ( status == 0 ) {
			statusText = "Đang chờ xử lý";
		} else if ( status == 1){
			statusText = "Đã xác nhận";
		} else if ( status == 2) {
			statusText = "Đã hủy";
		}
		return statusText;
	}

    const [dataBill, setDataBill] = useState([]);


	const getDataBill = async () => {
        var payload = {id: user.id};
		await getBillByUserAPI(payload)
			.then(res => {
				if ( res.data.statusCode=='OK' ) {
					const listBill = res.data.data;
					let tmp2 = [];
					for (let i = 0; i < listBill.length; i++) {
						listBill[i].createAt = formatTime(listBill[i].createAt);
						listBill[i].customer = listBill[i].user.name;
						listBill[i].statusText = convertStatusBill(listBill[i].status);
						let total = 0;
						for ( let j = 0; j < listBill[i].shoebills.length; j++) {
							total += listBill[i].shoebills[j].shoe.price * listBill[i].shoebills[j].amount;
						}
						tmp2.push({
							...listBill[i],
							money: total,
							actionView: <Button className="btn-view-bill" onClick={() => viewBill(listBill[i], total)}>View</Button>
						})
						console.log(listBill[i]);
					}
					setDataBill(tmp2);
				}
			})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		getDataBill();
	}, []);
	
	return (
		<div className="content-all">
			<Row className="center">
                <Table 
                    columns={column}
                    dataSource={dataBill}
                    pagination={{
                        defaultPageSize: 5
                    }}
                />
			</Row>
			<Modal
				title="Thông tin chi tiết hóa đơn"
				open={open}
				onOk={handleClose}
				onCancel={handleClose}
				width={900}
				cancelButtonProps={{ style: {display: "none"}}}
			>
				<div className="view-bill">
					<Col className="info-customer" span={11}>
						<h3 className="title-info">Thông tin khách hàng</h3>
						<p><b>Họ tên:</b> {billSelected.user.name}</p>
						<p><b>Số điện thoại:</b> {billSelected.user.phone}</p>
						<p><b>Địa chỉ:</b> {billSelected.address}</p>
						<p><b>Lời nhắn:</b> {billSelected.message}</p>
					</Col>
					<Col className="info-products" span={13}>
						<h3 className="title-info">Thông tin đơn hàng</h3>
						<Row>
							<Col span={1}></Col>
							<Col span={18}><b>Sản phẩm</b></Col>
							<Col span={5}><b>Tạm tính</b></Col>
						</Row>
						<div className="line-big"></div>
						{
							billSelected.shoebills.map(shoebill => (
								<div>
									<Row>
										<Col span={1}></Col>
										<Col span={12}>{shoebill.shoe.name} - <b>Size: </b> {shoebill.size}</Col>
										<Col span={3}></Col>
										<Col span={2}>x {shoebill.amount}</Col>
										<Col style={{marginLeft:15}} span={5}>{formatter.format(shoebill.shoe.price * shoebill.amount)}</Col>
									</Row>
									<div className="line-small"></div>
								</div>
							))
						}
						<div className="line-big"></div>
						<Row>
							<Col span={1}></Col>
							<Col className="total-price" span={17}><b>Tổng: </b></Col>
							<Col className="total-price" span={6}><b>{formatter.format(moneyBill)}</b></Col>
						</Row>
					</Col>
				</div>
			</Modal>
		</div>
	);
};

export default Order;
