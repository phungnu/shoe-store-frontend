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
		</div>
	);
};

export default Footer;
