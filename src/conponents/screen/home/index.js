import { useNavigate } from "react-router-dom";
import { Image, Row, Col } from "antd";
import Header from "../../util/Header";
import Shoes from "../../util/Shoes";
import { useState, useEffect } from 'react';
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

import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';


const Home = () => {
	const [arrayShoe, setArrayShoes] = useState([]);

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
		}
		return response;
	}

	useEffect(() => {
		getDataListShoe()
	}, [])

	return (
		<div>
			<Header page={'home'} />
			<div className="introduce-container">
				<div className="intro-image-ctn">
					<Row>
						<Col xs={24} sm={12} md={6} lg={6} xl={6}>
							<div className="intro-image">
								<Image src="image/intro1.png" preview={false} />
							</div>
						</Col>
						<Col xs={24} sm={12} md={12} lg={12} xl={12}>
							<div className="intro-image">
								<Image src="image/intro2.png" preview={false} />
							</div>
						</Col>
						<Col xs={24} sm={12} md={6} lg={6} xl={6}>
							<div className="intro-image">
								<Image src="image/intro3.jpg" preview={false} />
							</div>
						</Col>
					</Row>
				</div>
				<div className="intro-info">
					<Row>
						<Col className="col-intro-info" xs={24} sm={8} md={8} lg={8} xl={8}>
							<Image className="intro-icon" src="/image/verified.png" preview={false}/>
							<div>Hàng chính hãng 100%</div>
						</Col>
						<Col className="col-intro-info" xs={24} sm={8} md={8} lg={8} xl={8}>
							<Image className="intro-icon" src="/image/shipping.png" preview={false}/>
							<div>Miễn phí giao hàng với đơn &gt; 500k</div>
						</Col>
						<Col className="col-intro-info" xs={24} sm={8} md={8} lg={8} xl={8}>
							<Image className="intro-icon" src="/image/two-line.png" preview={false}/>
							<div>Đổi hàng 30 ngày, bảo hành 6 tháng</div>
						</Col>
					</Row>
				</div>
			</div>
			<div className="title-wrapper">
				<div className="main-title">
					SẢN PHẨM MỚI
				</div>
				<div className="hightlight-line"></div>
				<div className="sub-title">#NEW</div>
			</div>
			<Row className="content-home">
				{arrayShoe.map((shoe) => (
					<Col className="gutter-row" sm={24} md={12} lg={8} xl={6}>
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
						<Image className="feedback-img" src="/image/feedback1.jpeg" preview={false}/>
						<div className="feedback-text">Tôi đã mua cho cả 2 vợ chồng giày của Myshoes.vn và thật sự nó vô cùng chất lượng. Hàng đảm bảo chính hãng 100% và chính sách bảo hành rất yên tâm ạ. Cảm ơn Myshoes.vn!</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="feedback-ctn">
						<Image className="feedback-img" src="/image/feedback2.jpg" preview={false}/>
						<div className="feedback-text">Myshoes.vn bán hàng chính hãng, giá rất ok, tôi đã mua một đôi giày chạy bộ của Nike đi rất êm và thích.</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="feedback-ctn">
						<Image className="feedback-img" src="/image/feedback3.jpg" preview={false}/>
						<div className="feedback-text">Tìm một đôi giày ưng ý không hề dễ dàng, nhưng từ khi biết đến Myshoes.vn thì hoàn toàn tin tưởng, nhiều mẫu đẹp và đã chọn được một em Adidas ưng ý!</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="feedback-ctn">
						<Image className="feedback-img" src="/image/feedback4.jpg" preview={false}/>
						<div className="feedback-text">Mới mua combo chăm sóc giày của Myshoes sử dụng rất tốt, vệ sinh giày siêu sạch, xịt nano rất hiệu quả khi đi trời mưa.</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="feedback-ctn">
						<Image className="feedback-img" src="/image/feedback5.jpg" preview={false}/>
						<div className="feedback-text">Tôi đã mua cho cả 2 vợ chồng giày của Myshoes.vn và thật sự nó vô cùng chất lượng. Hàng đảm bảo chính hãng 100% và chính sách bảo hành rất yên tâm ạ. Cảm ơn Myshoes.vn!</div>
					</div>
				</SwiperSlide>
			</Swiper>
		</div>
	);
};

export default Home;
