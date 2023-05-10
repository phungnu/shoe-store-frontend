import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import "./style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { URL_API } from "../../config/constants";
import { userService } from "../../service/user";

const Admin = () => {
  
	const navigate = useNavigate();

	toast.configure();
	
	const  checkLogin = async (values) => {
		let response;
        let code = 222;
		await axios.post(`${URL_API}/users/login`, {
			username: values.username,
			password: values.password
		}).then( res => {
				console.log(res);
				if ( res.data.statusCode=='OK') {
					response = res.data;
					userService.set(res.data.data);
					code = 200
				}
			})
			.catch(error => {
				code = 404
			});
		if (code == 200 ) {
			notify('success');
			
			setTimeout(() => {
				navigate('/admin/manage');
			}, 1000)
		} else {
			notify("fail");
		}
		return response;		
			
	}

	const notify = (info) => {
        switch(info) {
            case 'success':
                toast.success('Login success');
                break;
            case 'fail' :
                toast.error('username or password incorrect');
                break;
            default:
                
        }
    }

	return (
		<div className="content-admin-login">
			<Form name="normal_login" onFinish={checkLogin} className="form">
				<p className="label-admin-login">Admin Login</p>
				<Form.Item
					style={{width:'22%'}}
					name="username"
					rules={[{ required: true, message: "Please input your Username!" }]}
				>
					<Input
						prefix={<UserOutlined className="site-form-item-icon" />}
						placeholder="Username"
					/>
				</Form.Item>
				<Form.Item
					style={{width:'22%'}}
					name="password"
					rules={[{ required: true, message: "Please input your Password!" }]}
				>
					<Input
						prefix={<LockOutlined className="site-form-item-icon" />}
						type="password"
						placeholder="Password"
					/>
				</Form.Item>
				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button"
					>
						Log in
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default Admin;
