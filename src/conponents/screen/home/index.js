import { useNavigate } from "react-router-dom";
import { Image, Row, Col } from "antd";
import Header from "../../util/Header";
import Shoes from "../../util/Shoes";
import { useState, useEffect } from 'react';
import { URL_API } from "../../config/constants";
import axios from 'axios';
import "./style.css";
import React from "react";


const Home = () => {
  	const [arrayShoe, setArrayShoes] = useState([]);

	const getDataListShoe = async () => {
		let response;
        let code = 222;
		await axios.get(`${URL_API}/shoe/getAll`)
			.then( res => {
				console.log(res);
				if ( res.data.statusCode=='OK') {
					response = res.data;
					code = 200
				}
			})
			.catch(error => {
				code = 404
			});
		console.log(code);
		if (code == 200 ) {
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

		<Row className="content-home">
			{arrayShoe.map((shoe) => (
				<Col className="gutter-row" sm={24}  md={12} lg={8} xl={6}>
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
		</div>
	);
};

export default Home;
