import React, { useState} from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Image, Input, Button, Row, Col, Table, Modal, Tooltip  } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import "./style.css";
import { useNavigate } from "react-router-dom";
import Toolbar from "../Toolbar";
const Statistic = () => {
	const navigate = useNavigate();

	return (
		<div >
		<Row>
			<Col span={5}>
			    <Toolbar />
			</Col>
			<Col span={18}>
				
			</Col>
		</Row>
		</div>
	);
};

export default Statistic;
