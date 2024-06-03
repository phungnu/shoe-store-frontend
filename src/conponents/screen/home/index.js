import { useNavigate } from "react-router-dom";
import { Image, Row, Col, Button } from "antd";
import Shoes from "../../util/Shoes";
import { useState, useEffect, useRef } from 'react';
import { URL_API } from "../../config/constants";
import axios from 'axios';
import "./style.css";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { saveAs } from "file-saver";

import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle } from 'docx';

const Home = ({ searchText, shoeContainerRef }) => {
	const [arrayShoe, setArrayShoes] = useState([]);
	const [arrayShoeConstant, setArrayShoesconstant] = useState([]);

	const getDataListShoe = async () => {
		let response;
		let code = 222;
		await axios.get(`${URL_API}/shoe/getAll`)
			.then(res => {
				console.log(res);
				if (res.data.statusCode == 'OK') {
					response = res.data;
					code = 200
				}
			})
			.catch(error => {
				code = 404
			});
		console.log(code);
		if (code == 200) {
			setArrayShoes(response.data);
			setArrayShoesconstant(response.data);
		}
		return response;
	}

	useEffect(() => {
		console.log(searchText);
		if (!searchText)
			return;
		var newArray = [];
		for (var i in arrayShoeConstant) {
			if (arrayShoeConstant[i].name.toLowerCase().includes(searchText.toLowerCase())) {
				newArray.push(arrayShoeConstant[i]);
			}
		}
		setArrayShoes(newArray);
		shoeContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [searchText])

	useEffect(() => {
		getDataListShoe()
	}, [])

	const onExport = async () => {
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
									text: "Tháng ...",
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
									break: 2,
								}),
								new TextRun({
									text: "Người lập báo cáo: ...",
									size: 28,
									break: 1,
								}),
								new TextRun({
									text: "1. Tổng doanh thu: ...",
									size: 28,
									break: 1,
								}),
								new TextRun({
									text: "2. Lợi nhuận thu được: ...",
									size: 28,
									break: 1,
								}),
								new TextRun({
									text: "3. Tổng số đơn hàng bán ra: ...",
									size: 28,
									break: 1,
								}),
								new TextRun({
									text: "4. Tỉ lệ đơn hàng thành công: ...",
									size: 28,
									break: 1,
								}),
								new TextRun({
									text: "5. Tỉ lệ khách hàng truy cập thành khách hàng tiềm năng: ...",
									size: 28,
									break: 1,
								}),
								new TextRun({
									text: "6. Doanh thu tháng trước: ...",
									size: 28,
									break: 1,
								}),
								new TextRun({
									text: "7. Doanh thu tháng này: ...",
									size: 28,
									break: 1,
								}),
								new TextRun({
									text: "8. Tháng có doanh thu cao nhất: ...",
									size: 28,
									break: 1,
								}),
								new TextRun({
									text: "9. Mức độ tăng trưởng doanh thu so với tháng trước: ...",
									size: 28,
									break: 1,
								}),
								new TextRun({
									text: "10. Top mặt hàng được bán chạy",
									size: 28,
									break: 1,
								}),
								new TextRun({
									text: "    a. Top 1: ... 	Số lượt bán: ...",
									size: 28,
									break: 1,
								}),
								new TextRun({
									text: "    b. Top 2: ...	Số lượt bán: ...",
									size: 28,
									break: 1,
								}),
								new TextRun({
									text: "    c. Top 3: ...	Số lượt bán: ...",
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
						new Table({
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
			saveAs(blob, "example.docx");
		});
	};

	return (
		<div>
			<div className="introduce-container">
				<Button onClick={onExport}>Export</Button>
				<div className="intro-image-ctn">
					<Row>
						<Col xs={28} sm={12} md={6} lg={6} xl={6}>
							<div className="intro-image">
								<Image src="image/intro1.png" preview={false} />
							</div>
						</Col>
						<Col xs={28} sm={12} md={12} lg={12} xl={12}>
							<div className="intro-image">
								<Image src="image/intro2.png" preview={false} />
							</div>
						</Col>
						<Col xs={28} sm={12} md={6} lg={6} xl={6}>
							<div className="intro-image">
								<Image src="image/intro3.jpg" preview={false} />
							</div>
						</Col>
					</Row>
				</div>
				<div className="intro-info">
					<Row>
						<Col className="col-intro-info" xs={28} sm={8} md={8} lg={8} xl={8}>
							<Image className="intro-icon" src="/image/verified.png" preview={false} />
							<div>Hàng chính hãng 100%</div>
						</Col>
						<Col className="col-intro-info" xs={28} sm={8} md={8} lg={8} xl={8}>
							<Image className="intro-icon" src="/image/shipping.png" preview={false} />
							<div>Miễn phí giao hàng với đơn &gt; 500k</div>
						</Col>
						<Col className="col-intro-info" xs={28} sm={8} md={8} lg={8} xl={8}>
							<Image className="intro-icon" src="/image/two-line.png" preview={false} />
							<div>Đổi hàng 30 ngày, bảo hành 6 tháng</div>
						</Col>
					</Row>
				</div>
			</div>
			<div className="title-wrapper" ref={shoeContainerRef}>
				<div className="main-title">
					SẢN PHẨM MỚI
				</div>
				<div className="hightlight-line"></div>
				<div className="sub-title">#NEW</div>
			</div>
			<Row className="content-home">
				{arrayShoe.map((shoe) => (
					<Col className="gutter-row" sm={28} md={12} lg={8} xl={6}>
						<Shoes
							id={shoe.id}
							name={shoe.name}
							url={shoe.imageUrl}
							price={shoe.price}
							quantity={shoe.quantity}
						/>
					</Col>
				))}
			</Row>
			<div className="title-wrapper">
				<div className="main-title">
					KHÁCH HÀNG NÓI VỀ MYSHOES.VN
				</div>
				<div className="hightlight-line"></div>
				<div className="sub-title">#FEEDBACK</div>
			</div>
			<Swiper
				slidesPerView={4}
				spaceBetween={50}
				navigation={true}
				pagination={{
					clickable: true,
				}}
				keyboard={true}
				modules={[Navigation, Pagination, Mousewheel, Keyboard]}
				className="mySwiper"
			>
				<SwiperSlide>
					<div className="feedback-ctn">
						<Image className="feedback-img" src="/image/feedback1.jpeg" preview={false} />
						<div className="feedback-text">Tôi đã mua cho cả 2 vợ chồng giày của Myshoes.vn và thật sự nó vô cùng chất lượng. Hàng đảm bảo chính hãng 100% và chính sách bảo hành rất yên tâm ạ. Cảm ơn Myshoes.vn!</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="feedback-ctn">
						<Image className="feedback-img" src="/image/feedback2.jpg" preview={false} />
						<div className="feedback-text">Myshoes.vn bán hàng chính hãng, giá rất ok, tôi đã mua một đôi giày chạy bộ của Nike đi rất êm và thích.</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="feedback-ctn">
						<Image className="feedback-img" src="/image/feedback3.jpg" preview={false} />
						<div className="feedback-text">Tìm một đôi giày ưng ý không hề dễ dàng, nhưng từ khi biết đến Myshoes.vn thì hoàn toàn tin tưởng, nhiều mẫu đẹp và đã chọn được một em Adidas ưng ý!</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="feedback-ctn">
						<Image className="feedback-img" src="/image/feedback4.jpg" preview={false} />
						<div className="feedback-text">Mới mua combo chăm sóc giày của Myshoes sử dụng rất tốt, vệ sinh giày siêu sạch, xịt nano rất hiệu quả khi đi trời mưa.</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="feedback-ctn">
						<Image className="feedback-img" src="/image/feedback5.jpg" preview={false} />
						<div className="feedback-text">Tôi đã mua cho cả 2 vợ chồng giày của Myshoes.vn và thật sự nó vô cùng chất lượng. Hàng đảm bảo chính hãng 100% và chính sách bảo hành rất yên tâm ạ. Cảm ơn Myshoes.vn!</div>
					</div>
				</SwiperSlide>
			</Swiper>
		</div>
	);
};

export default Home;
