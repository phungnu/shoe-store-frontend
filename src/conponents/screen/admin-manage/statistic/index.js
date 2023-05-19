import React, { useEffect, useState} from "react";
import { Image, Input, Button, Row, Col, Table, Modal, Tooltip, List, Avatar  } from 'antd';
import "./style.css";
import { useNavigate } from "react-router-dom";
import Toolbar from "../Toolbar";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { URL_API } from "../../../config/constants"
import axios from "axios";
import { formatter } from "../../service/format";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement
);
  
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
		title: '',
		dataIndex: 'actionView',
	},
]

const Statistic = () => {

	const templateData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
			{
				label: 'Monthly Revenue',
				data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				backgroundColor: 'rgba(54, 162, 235, 0.2)',
				borderColor: 'rgba(54, 162, 235, 1)',
				borderWidth: 1,
			},
        ],
    }
	const [chartData, setChartData] = useState(templateData);
	  
	const options = {
		scales: {
			x: {
				type: 'category',
			},
			y: {
				beginAtZero: true,
			},
		},
	};

	const [open, setOpen] = useState(false);
	const [billSelected, setBillSelected] = useState();
	const [moneyBill, setMoneyBill] = useState();

	const viewBill = (bill, money) => {
		setBillSelected(bill)
		setMoneyBill(money)
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const getDataBill = async () => {
		await axios.get(`${URL_API}/bill/getAll`)
			.then(res => {
				if ( res.data.statusCode=='OK' ) {
					const listBill = res.data.data;
					let tmp = {...templateData}
					let tmp2 = [];
					for (let i = 0; i < listBill.length; i++) {
						let total = 0;
						for ( let j = 0; j < listBill[i].shoeBills.length; j++) {
							total += listBill[i].shoeBills[j].shoe.price * listBill[i].shoeBills[j].amount;
						}
						tmp2.push({
							...listBill[i],
							money: total,
							actionView: <Button onClick={() => viewBill(listBill[i], money)}>View</Button>
						})
						const month = (new Date(listBill[i].createAt)).getMonth();
						tmp.datasets[0].data[month] += total;
					}
					setDataBill(tmp2);
					setChartData(tmp);
				}
			})
			.catch(err => console.log(err))
	}

	const [data, setData] = useState([]);

	const [dataBill, setDataBill] = useState([]);

	const getDataShoeWithBill = async () => {
		await axios.get(`${URL_API}/shoe/getAllWithShoeBill`)
			.then(async (res) => {
				if ( res.data.statusCode=='OK' ) {
					let tmp = [];
					
					const listShoe = res.data.data;
					for ( let i = 0; i < listShoe.length; i++) {
						let sold = 0;
						for ( let j = 0; j < listShoe[i].shoeBills[j].length; j++) {
							sold += listShoe[i].shoeBills[j].amount;
						}
						tmp.push({
							id: listShoe[i].id,
							name: listShoe[i].name,
							sold: sold
						})
					}
					await tmp.sort((a,b) => { return a.sold - b.sold });
					setData(tmp);
				}
			})	
			.catch(err => console.log(err))
	}

	useEffect(() => {
		getDataBill()
		getDataShoeWithBill()
	},[])
	
	return (
		<div className="content-all">
			<Row>
				<Col span={4}>
					<Toolbar />
				</Col>
				<Col>
					<Row>
						<Table 
							columns={column}
							dataSource={dataBill}
							pagination={{
								defaultPageSize: 5
							}}
						/>
					</Row>
					<Row>
						<Col className="sta-content" span={17}>
							<p className="title-top">Biểu đồ doanh thu trong năm</p>
							<Bar data={chartData} options={options}/>
						</Col>
					</Row>
					<Row>
						<Col className="top" span={18}>
							<p className="title-top">Top các sản phẩm bán chạy nhất</p>
						</Col>
					</Row>
					<Row >
						<Col className="top top-second" span={6}>
							<p className="title-top">Top 2</p>
							<p>{data[1].name}</p>
							<div  className="ava-product second">
								<Tooltip title={`Đã bán: ${data[1].sold}`}><Image preview={false} src={data[1].image} /></Tooltip>
							</div>
						</Col>
						<Col className="top" span={6}>
							<p className="title-top">Top 1</p>
							<p>{data[0].name}</p>
							<div  className="ava-product first">
								<Tooltip title={`Đã bán: ${data[0].sold}`}><Image preview={false} src={data[0].image} /></Tooltip>
							</div>
						</Col>
						<Col className="top top-third" span={6}>
							<p className="title-top">Top 3</p>
							<p>{data[2].name}</p>
							<div  className="ava-product third">
								<Tooltip title={`Đã bán: ${data[2].sold}`}><Image preview={false} src={data[2].image} /></Tooltip>
							</div>
						</Col>
					</Row>
				</Col>
				<Modal
					title="Thông tin chi tiết hóa đơn"
					open={open}
					onOk={handleClose}
					cancelButtonProps={{ style: {display: "none"}}}
				>
					<div className="confirm-modal">
						<Col className="info-customer" span={11}>
							<h3 className="title-info">Thông tin khách hàng</h3>
							<p><b>Họ tên:</b> {billSelected.customer.fullName}</p>
							<p><b>Email:</b> {billSelected.customer.email}</p>
							<p><b>Số điện thoại:</b> {billSelected.customer.phone}</p>
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
								billSelected.shoeBills.map(shoebill => (
									<div>
										<Row>
											<Col span={1}></Col>
											<Col span={12}>{shoebill.shoe.name} - <b>Size: </b> {formatter.format(shoebill.size)}</Col>
											<Col span={3}></Col>
											<Col span={4}>x {shoebill.amount}</Col>
											<Col span={3}>{formatter.format(shoebill.shoe.price * shoebill.amount)}</Col>
										</Row>
										<div className="line-small"></div>
									</div>
								))
							}
							<Row>
								<Col span={1}></Col>
								<Col span={16}><b>Giao hàng</b></Col>
								<Col span={7}>Đồng giá: <b>{formatter.format(25000)}</b></Col>
							</Row>
							<div className="line-big"></div>
							<Row>
								<Col span={1}></Col>
								<Col className="total-price" span={19}><b>Tổng: </b></Col>
								<Col className="total-price" span={4}><b>{formatter.format(money + 25000)}</b></Col>
							</Row>
						</Col>
					</div>
				</Modal>
			</Row>
		</div>
	);
};

export default Statistic;
