import { useState, useEffect } from 'react';
import "./style.css";
import React from "react";
import { Image, Row, Col } from "antd";


const Footer = () => {
	return (
		<div className='footer-container'>
            <Row className='footer-header'>
                <Col className='footer-guide'>
                    <div className='footer-guide-title'>
                        ĐĂNG KÝ NHẬN THÔNG TIN
                    </div>
                    <div className='footer-guide-info'>
                        Đăng ký ngay để được cập nhật sớm nhất những thông tin hữu ích, ữu đãi vô cùng hấp dẫn và những món quà bất ngờ từ Myshoes.vn!
                    </div>
                </Col>
                <Col>
                
                </Col>
            </Row>
            <Row className='footer-content'>
                <Col className='footer-intro' span={10}>
                    <div className='footer-text'>MYSHOES.VN - GIÀY CHÍNH HÃNG</div>
                    <Row>
                        <Col className='footer-intro-logo'>
                            <Image src="/image/logo-sh.png" preview={false}/>
                        </Col>
                        <Col span={17}>
                            Myshoes.vn được định hướng trở thành hệ thống thương mại điện tử bán giày chính hãng hàng đầu Việt Nam.<br/>
                            Showroom: 249 Xã Đàn, Hà Nội<br/>
                            Hotline: 0973711868
                        </Col>
                    </Row>
                </Col>
                <Col className='footer-our' span={5}>
                    <div className='footer-text'>VỀ CHÚNG TÔI</div>
                    <a>Giới thiệu</a>
                    <a>Điều khoản sử dụng</a>
                    <a>Chính sách bảo mật</a>
                    <a>Tin tức Myshoes</a>
                    <a>Cơ hội việc làm</a>
                    <a>Liên hệ</a>
                </Col>
                <Col className='footer-guess' span={5}>
                    <div className='footer-text'>KHÁCH HÀNG</div>
                    <a>Hướng dẫn mua hàng</a>
                    <a>Chính sách đổi trả</a>
                    <a>Chính sách bảo hành</a>
                    <a>Khách hàng thân thiết</a>
                    <a>Hướng dẫn chọn size</a>
                    <a>Chương trình khuyến mại</a>
                </Col>
                <Col className='footer-certificate' span={4}>
                    <div className='footer-text'>CHỨNG NHẬN</div>
                    <Image src='/image/certi1.png' className='footer-certificate-logo' width={160} preview={false} />
                    <Image src='/image/certi2.png' width={180} preview={false} />
                </Col>
            </Row>
            <Row className='footer-copyright'>
                Copyright © 2016 - 2024 Myshoes.vn. All rights reserved.
            </Row>
		</div>
	);
};

export default Footer;
