import { Row, Col, Image, Space, Input, Dropdown, Modal, Button } from 'antd';
import './Header.css';
import {toast} from 'react-toastify';
import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { ShoppingCartOutlined, SettingOutlined } from '@ant-design/icons';
import { loginAPI, registerAPI } from '../service/apis';
import { userService } from '../service/user';

const { Search } = Input;

const Header = ({page}) => {

     const user = userService.get();

     const [loggeduser, setLogged] = useState(false);

     useEffect(() => {
          if (user != null) 
            setLogged(true)
     },[])

     toast.configure();

     const navigate = useNavigate();

     const changeToCart = () => {
          navigate('/cart')
     }

     const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const hideModal = () => {
		setIsModalOpen(false);
	}

     const [isModalOpenSignup, setIsModalOpenSignup] = useState(false);

	const showModalSignup = () => {
		setIsModalOpenSignup(true);
	};

	const hideModalSignup = () => {
		setIsModalOpenSignup(false);
	}

     const goToAdmin = () => {
          navigate('/admin/manage');
     }

     const onLogin = async () => {
          const payload = {
               username: usernameLogin,
               password: passwordLogin
          }

          await loginAPI(payload)
               .then(res => {
               if ( res.data.statusCode == 'OK') {
                    userService.set(res.data.data);
                    console.log(res.data.data);
                    toast.success('ĐĂNG NHẬP THÀNH CÔNG', {
                         position: toast.POSITION.TOP_CENTER
                    });
                    if ( res.data.data.role == 'ADMIN' )
                         navigate('/admin/manage');
                    setLogged(true);
                    hideModal();
                    window.location.reload();
               } else {
                    toast.error(res.data.message, {
                         position: toast.POSITION.TOP_CENTER
                    })
               }
               })
               .catch(err => console.log(err))
     }

     const onSignup = async () => {
          const payload = {
               username: usernameSignup,
               password: passwordSignup,
               phone: phone,
               confirmPassword: confirmPassword,
               address: address,
               name: name
          }

          await registerAPI(payload)
               .then(res => {
               if ( res.data.statusCode == 'OK') {
                    console.log("register");
                    toast.success('ĐĂNG KÝ THÀNH CÔNG', {
                         position: toast.POSITION.TOP_CENTER
                    });
                    hideModalSignup();
               } else {
                    toast.error(res.data.message, {
                         position: toast.POSITION.TOP_CENTER
                    })
               }
               })
               .catch(err => console.log(err))
     }

     const onLogout = () => {
          userService.logout();
          toast.success('ĐĂNG XUẤT THÀNH CÔNG', {
               position: toast.POSITION.TOP_CENTER
          })
          navigate('/home');
          setLogged(false);
     }

     const naviHome = () => {
          navigate('/home')
     }

     const goToOrder = () => {
          navigate('/order');
     }

     const [usernameLogin, setUsernameLogin] = useState('');
     const [passwordLogin, setPasswordLogin] = useState('');

     const [usernameSignup, setUsernameSignup] = useState('');
     const [passwordSignup, setPasswordSignup] = useState('');
     const [phone, setPhone] = useState('');
     const [address, setAddress] = useState('');
     const [confirmPassword, setConfirmPassword] = useState('');
     const [name, setName] = useState('');

     return (
          <div className="header"> 
               <Row>
                    <Col className='leftHeader' span={5}>
                         <Image onClick={naviHome} width={100} className='imageLogo' src='/image/myshoe.png' preview={false}/>
                    </Col>
                    <Col span={13}>
                         <Search placeholder="Tìm kiếm sản phẩm..." style={{ width: 500, height:33 }} />
                    </Col>
                    <Col className='rightHeader' span={6}>
                         {
                              loggeduser ? 
                              <Row className='user-info-container'>
                                   { user.role == 'ADMIN' && <SettingOutlined className="icon-setting" onClick={goToAdmin}/>}
                                   <ShoppingCartOutlined onClick={changeToCart} className='logoCart' />
                                   <div className='user-info'>
                                        <Image onClick={goToOrder} width={50} src='/image/order-logo.png' preview={false} /> 
                                   </div>
                                   <div className='user-info btn-logout' onClick={onLogout}>Logout</div>
                              </Row> 
                              :
                              <div>
                                   <a onClick={showModal}>Đăng nhập</a> / <a onClick={showModalSignup}>Đăng ký</a>
                              </div>
                         }
                         
                         
                    </Col>
               </Row>

               <Modal
				open={isModalOpen}
				okButtonProps={{ style: {display: "none"}}}
				cancelButtonProps={{ style: {display: "none"}}}
				closable={true}
				onCancel={hideModal}
			>	
				<div className="content-modal-login">
                         <div className='title-login'>ĐĂNG NHẬP TÀI KHOẢN</div>
                         <Input className='input-username' placeholder='Tên tài khoản' onChange={e=>setUsernameLogin(e.target.value)}/>
                         <Input type='password' className='input-pass' placeholder='Mật khẩu' onChange={e=>setPasswordLogin(e.target.value)}/>
                         <Button onClick={onLogin} className='btn-login'>ĐĂNG NHẬP</Button>
				</div>
			</Modal>

               <Modal
				open={isModalOpenSignup}
				okButtonProps={{ style: {display: "none"}}}
				cancelButtonProps={{ style: {display: "none"}}}
				closable={true}
				onCancel={hideModalSignup}
			>	
				<div className="content-modal-signup">
                         <div className='title-signup'>THÔNG TIN ĐĂNG KÝ</div>
                         <Input className='input-username1' placeholder='Tên tài khoản' onChange={e=>setUsernameSignup(e.target.value)}/>
                         <Input className='input-name' placeholder='Họ và tên' onChange={e=>setName(e.target.value)}/>
                         <Input className='input-phone' placeholder='Số điện thoại' onChange={e=>setPhone(e.target.value)}/>
                         <Input className='input-address' placeholder='Địa chỉ' onChange={e=>setAddress(e.target.value)}/>
                         <Input type='password' className='input-pass1' placeholder='Mật khẩu' onChange={e=>setPasswordSignup(e.target.value)}/>
                         <Input type='password' className='input-confirm-pass' placeholder='Nhập lại mật khẩu' onChange={e=>setConfirmPassword(e.target.value)}/>
                         <Button onClick={onSignup} className='btn-signup'>ĐĂNG KÝ</Button>
				</div>
			</Modal>
          </div>
     )
}

export default Header;