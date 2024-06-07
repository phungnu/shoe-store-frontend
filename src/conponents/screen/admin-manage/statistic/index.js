import React, { useEffect, useState} from "react";
import { Image, Input, Button, Row, Col, Table, Modal, Tooltip, List, Avatar, Select  } from 'antd';
import "./style.css";
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
import { formatter } from "../../../service/format";
import { updateStatusBillAPI, getDataExport } from "../../../service/apis";

import { Document, Packer, Paragraph, TextRun, Table as TableDocx, TableRow, TableCell, WidthType, AlignmentType, BorderStyle } from 'docx';
import { saveAs } from "file-saver";

import {toast} from 'react-toastify';

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
		title: "Khách hàng",
		dataIndex: 'customer',
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

const optionMonthExport = [
	{
		value: "-1",
		label: "Choose month"
	},
	{
		value: "01/2024",
		label: "Thang 1 - 2024"
	},
	{
		value: "02/2024",
		label: "Thang 2 - 2024"
	},
	{
		value: "03/2024",
		label: "Thang 3 - 2024"
	},
	{
		value: "04/2024",
		label: "Thang 4 - 2024"
	},
	{
		value: "05/2024",
		label: "Thang 5 - 2024"
	},
	{
		value: "06/2024",
		label: "Thang 6 - 2024"
	}
]

const Statistic = () => {
	toast.configure();

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

	const initDataRank = [
		{
			name: '',
			sold: '',
			imageUrl: ''
		},
		{
			name: '',
			sold: '',
			imageUrl: ''
		},
		{
			name: '',
			sold: '',
			imageUrl: ''
		}
	]

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

	const [data, setData] = useState(initDataRank);

	const [dataBill, setDataBill] = useState([]);

	const acceptBill = (bill) => {
		updateStatusBill(bill, 'accept');
	}

	const cancelBill = (bill) => {
		updateStatusBill(bill, 'cancel');
	}

	const updateStatusBill = async (bill, action) => {
		var payload = {
			id: bill.id,
			status: action == 'accept' ? 1 : 2
		}
		await updateStatusBillAPI(payload)
			.then(res => {
				if ( res.data.statusCode == 'OK') {
					getDataBill();
					getDataShoeWithBill();
				}
			})
			.catch(err => console.log(err))
	}

	const getDataBill = async () => {
		setChartData(JSON.parse(JSON.stringify(templateData)));
		await axios.get(`${URL_API}/bill/getAll`)
			.then(res => {
				if ( res.data.statusCode=='OK' ) {
					const listBill = res.data.data;
					let tmp = JSON.parse(JSON.stringify(templateData));
					let tmp2 = [];
					for (let i = 0; i < listBill.length; i++) {
						const month = (new Date(listBill[i].createAt)).getMonth();
						listBill[i].createAt = formatTime(listBill[i].createAt);
						listBill[i].customer = listBill[i].user.name;
						listBill[i].statusText = convertStatusBill(listBill[i].status);
						let total = 0;
						for ( let j = 0; j < listBill[i].shoebills.length; j++) {
							total += listBill[i].shoebills[j].shoe.price * listBill[i].shoebills[j].amount;
						}
						tmp2.push({
							...listBill[i],
							money: formatter.format(total),
							actionView: <Row>
								<Button className="btn-view-bill" onClick={() => viewBill(listBill[i], total)}>Xem</Button>
								{listBill[i].status == 0 ? <Row><Button onClick={() => acceptBill(listBill[i])} className="btn-accept-bill">Xác nhận</Button> <Button onClick={() => cancelBill(listBill[i])} className="btn-cancel-bill">Hủy</Button></Row> : <></> }
							</Row>
						})
						console.log(listBill[i]);
						if ( listBill[i].status == 1) {
							tmp.datasets[0].data[month] += total;
						}
					}
					setDataBill(tmp2);
					setChartData(tmp);
				}
			})
			.catch(err => console.log(err))
	}

	const getDataShoeWithBill = async () => {
		
		await axios.get(`${URL_API}/shoe/getAllWithShoeBill`)
			.then(async (res) => {
				if ( res.data.statusCode=='OK' ) {
					let tmp = [];
					const listShoe = res.data.data;
					for ( let i = 0; i < listShoe.length; i++) {
						let sold = 0;
						for ( let j = 0; j < listShoe[i].shoebills.length; j++) {
							sold += listShoe[i].shoebills[j].amount;
						}
						tmp.push({
							id: listShoe[i].id,
							name: listShoe[i].name,
							imageUrl: listShoe[i].imageUrl,
							sold: sold
						})
					}
					await tmp.sort((a,b) => { return b.sold - a.sold });
					setData(tmp);
				}
			})	
			.catch(err => console.log(err))
	}


	useEffect(() => {
		getDataBill();
		getDataShoeWithBill();
	}, []);
	
	const onExport = async () => {

		if ( monthExport == "-1" ) {
			toast.error("You must choose time to export", {
				position: toast.POSITION.TOP_CENTER
		   })
		}

		var infoExport = monthExport.split('/');

		var payload = {
			month: parseInt(infoExport[0]),
			year: parseInt(infoExport[1])
		}
		
		var totalRevenue = 0, profit = 0, totalOrders = 0, successRate = 0, previousMonthRevenue = 0, currentMonthRevenue = 0, topProducts = [], growthRate = 0, bestMonth = {};
		
		await getDataExport(payload)
			.then( res => {
				if ( res.data.statusCode == 'OK') {
					var resData = res.data.data;
					totalRevenue = resData.totalRevenue;
					profit = resData.profit;
					totalOrders = resData.totalOrders;
					successRate = resData.successRate;
					previousMonthRevenue = resData.previousMonthRevenue;
					currentMonthRevenue = resData.currentMonthRevenue;
					growthRate = resData.growthRate;
					topProducts = resData.topProducts;
					bestMonth = resData.bestMonth;
				}
			})
			.catch(err => console.log(err))

		const doc = new Document({
			sections: [
				{
					properties: {},
					children: [
						new Paragraph({
							children: [
								new TextRun({
									text: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM",
									size: 28,
									break: 1,
								}),
								new TextRun({
									text: "Độc lập – Tự do – Hạnh phúc",
									size: 28,
									break: 1,
								}),
							],
							alignment: AlignmentType.CENTER,
						}),
						new Paragraph({
							children: [
								new TextRun({
									text: "Hà Nội, ngày ... tháng ... năm ...",
									size: 28,
									break: 1,
								}),
							],
							alignment: AlignmentType.RIGHT,
						}),
						new Paragraph({
							children: [
								new TextRun({
									text: "BÁO CÁO DOANH THU KẾT QUẢ HOẠT ĐỘNG KINH DOANH",
									bold: true,
									size: 30,
									break: 2,
								}),
								new TextRun({
									text: "Tháng " + payload.month,
									bold: true,
									size: 28,
									break: 1,
								}),
							],
							alignment: AlignmentType.CENTER,
						}),
						new Paragraph({
							children: [
								new TextRun({
									text: "Đơn vị báo cáo: Myshoes",
									size: 28,
									break: 1,
								}),
								new TextRun({
									text: "Người lập báo cáo: ...",
									size: 28,
									break: 1,
								}),
								new TextRun({
									text: "1. Tổng doanh thu: " + totalRevenue,
									size: 28,
									break: 1,
								}),
								new TextRun({
									text: "2. Lợi nhuận thu được: " + profit,
									size: 28,
									break: 1,
								}),
								new TextRun({
									text: "3. Tổng số đơn hàng bán ra: " + totalOrders,
									size: 28,
									break: 1,
								}),
								new TextRun({
									text: "4. Tỉ lệ đơn hàng thành công: " + successRate,
									size: 28,
									break: 1,
								}),
								new TextRun({
									text: "5. Tỉ lệ khách hàng truy cập thành khách hàng tiềm năng: ...",
									size: 28,
									break: 1,
								}),
								new TextRun({
									text: "6. Doanh thu tháng trước: " + previousMonthRevenue,
									size: 28,
									break: 1,
								}),
								new TextRun({
									text: "7. Doanh thu tháng này: " + currentMonthRevenue,
									size: 28,
									break: 1,
								}),
								new TextRun({
									text: "8. Tháng có doanh thu cao nhất: " + bestMonth.month,
									size: 28,
									break: 1,
								}),
								new TextRun({
									text: "9. Mức độ tăng trưởng doanh thu so với tháng trước: " + growthRate,
									size: 28,
									break: 1,
								}),
								new TextRun({
									text: "10. Top mặt hàng được bán chạy",
									size: 28,
									break: 1,
								}),
								new TextRun({
									text: "    a. Top 1: " +  topProducts.length > 0 ? topProducts[0].name : "..."	+ " Số lượt bán: " + topProducts.length > 0 ? topProducts[0].amount : "...",
									size: 28,
									break: 1,
								}),
								new TextRun({
									text: "    b. Top 2: " + topProducts.length > 1 ? topProducts[1].name : "..."	+ " Số lượt bán: " + topProducts.length > 1 ? topProducts[1].amount : "...",
									size: 28,
									break: 1,
								}),
								new TextRun({
									text: "    c. Top 3: " + topProducts.length > 2 ? topProducts[2].name : "..."	+ " Số lượt bán: " + topProducts.length > 2 ? topProducts[2].amount : "...",
									size: 28,
									break: 1,
								}),
								new TextRun({
									text: "11.  Thành phố có doanh thu cao nhất: ...",
									size: 28,
									break: 1,
								}),
							],
							alignment: AlignmentType.LEFT,
							spacing: {
								line: 400
							},
						}),
						new Paragraph({
							children: [
								new TextRun({
									text: "",
									break: 2, // Thêm 2 dòng trống
								}),
							],
						}),
						new TableDocx({
							rows: [
								new TableRow({
									children: [
										new TableCell({
											children: [
												new Paragraph({
													children: [
														new TextRun({
															text: "Quản lý cửa hàng",
															bold: true,
															size: 28,
														}),
													],
													alignment: AlignmentType.LEFT,
												}),
											],
											borders: {
												top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
												bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
												left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
												right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
											},
											width: {
												size: 50,
												type: WidthType.PERCENTAGE,
											},
										}),
										new TableCell({
											children: [
												new Paragraph({
													children: [
														new TextRun({
															text: "Người báo cáo",
															bold: true,
															size: 28,
														}),
													],
													alignment: AlignmentType.RIGHT,
												}),
											],
											borders: {
												top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
												bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
												left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
												right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
											},
											width: {
												size: 50,
												type: WidthType.PERCENTAGE,
											},
										}),
									],
								}),
								new TableRow({
									children: [
										new TableCell({
											children: [
												new Paragraph({
													children: [
														new TextRun({
															text: "(Ký và ghi rõ họ tên)",
															size: 28,
														}),
													],
													alignment: AlignmentType.LEFT,
												}),
											],
											borders: {
												top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
												bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
												left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
												right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
											},
											width: {
												size: 50,
												type: WidthType.PERCENTAGE,
											},
										}),
										new TableCell({
											children: [
												new Paragraph({
													children: [
														new TextRun({
															text: "(Ký và ghi rõ họ tên)",
															size: 28,
														}),
													],
													alignment: AlignmentType.RIGHT,
												}),
											],
											borders: {
												top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
												bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
												left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
												right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
											},
											width: {
												size: 50,
												type: WidthType.PERCENTAGE,
											},
										}),
									],
								}),
							],
							width: {
								size: 100,
								type: WidthType.PERCENTAGE,
							},
						}),
					],
				},
			],
		});

		Packer.toBlob(doc).then((blob) => {
			saveAs(blob, monthExport+".docx");
		});
	};

	const [monthExport, setMonthExport] = useState("-1");

	const handleChange = (value) => {
		setMonthExport(value);
	}

	return (
		<div className="content-all">
			<Row>
				<Col span={4}>
					<Toolbar />
				</Col>
				<Col span={1}></Col>
				<Col span={19}>
					<Row className="export-container">
						<Select 
							defaultValue="-1"
							style={{
								width: 200,
							}}
							onChange={handleChange}
							options={optionMonthExport}
						/>
						<Button className="btn-export" onClick={onExport}>Export</Button>
					</Row>
					<Row  className="center">
						<Table 
							columns={column}
							dataSource={dataBill}
							pagination={{
								defaultPageSize: 5
							}}
						/>
					</Row>
					<Row  className="center">
						<Col className="sta-content" span={21}>
							<p className="title-top">Biểu đồ doanh thu trong năm</p>
							<Bar data={chartData} options={options}/>
						</Col>
					</Row>
					<Row>
						<Col className="top" span={21}>
							<p className="title-top">Top các sản phẩm bán chạy nhất</p>
						</Col>
					</Row>
					<Row  className="center">
						<Col className="top top-second" span={7}>
							<p className="title-top">Top 2</p>
							<p>{data[1].name}</p>
							<div  className="ava-product second">
								<Tooltip title={`Đã bán: ${data[1].sold}`}><Image preview={false} src={data[1].imageUrl} /></Tooltip>
							</div>
						</Col>
						<Col className="top" span={7}>
							<p className="title-top">Top 1</p>
							<p>{data[0].name}</p>
							<div  className="ava-product first">
								<Tooltip title={`Đã bán: ${data[0].sold}`}><Image preview={false} src={data[0].imageUrl} /></Tooltip>
							</div>
						</Col>
						<Col className="top top-third" span={7}>
							<p className="title-top">Top 3</p>
							<p>{data[2].name}</p>
							<div  className="ava-product third">
								<Tooltip title={`Đã bán: ${data[2].sold}`}><Image preview={false} src={data[2].imageUrl} /></Tooltip>
							</div>
						</Col>
					</Row>
					
				</Col>
				
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
						{/* <Row>
							<Col span={1}></Col>
							<Col span={16}><b>Giao hàng</b></Col>
							<Col span={7}>Đồng giá: <b>{formatter.format(25000)}</b></Col>
						</Row> */}
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

export default Statistic;
