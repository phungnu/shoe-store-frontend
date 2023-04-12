import React, { useState} from "react";
import { Image, Input, Button, Row, Col, Table, Modal, Tooltip  } from 'antd';
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
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	BarElement
);
  

const Statistic = () => {
	const navigate = useNavigate();

	const data = {
		labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
		datasets: [
			{
				label: 'My First Dataset',
				data: [65, 59, 80, 81, 56, 55, 40],
				fill: false,
				borderColor: 'rgb(75, 192, 192)',
				tension: 0.1
			}
		]
	};

	const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
			{
				label: 'Monthly Revenue',
				data: [5000, 7000, 10000, 8000, 12000, 15000, 18000, 20000, 25000, 22000, 18000, 20000],
				backgroundColor: 'rgba(54, 162, 235, 0.2)',
				borderColor: 'rgba(54, 162, 235, 1)',
				borderWidth: 1,
			},
        ],
    }
	  
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
	  

	return (
		<div >
			<Row>
				<Col span={5}>
					<Toolbar />
				</Col>
				<Col className="sta-content" span={17}>
					<Line data={chartData} options={options} />
					<p>Biểu đồ doanh thu trong năm</p>
					<Bar data={chartData} options={options}/>
					<p>Các sản phẩm bán chạy nhất</p>
				</Col>
			</Row>
		</div>
	);
};

export default Statistic;
