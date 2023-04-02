import { Row, Col, Image } from 'antd';
import './Header.css';
import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

const Header = ({page}) => {

     const [styleHome, setStyleHome] = useState('home animation');
     const [styleAbount, setStyleAbout] = useState('about');
     const [styleBills, setStyleBills] = useState('bills');

     useEffect( () => {
          if ( page=='home' ) {
               setStyleHome('home animation')
          } else {
               setStyleHome('home')
          }
     }, [page])

     const navigate = useNavigate();

     const changeToCart = () => {
          setStyleHome('home')
          setStyleAbout('about')
          navigate('/cart')
     }

     const handleHome = () => {
          setStyleHome('home animation')
          setStyleBills('bills');
          setStyleAbout('about')
          navigate('/')
     }
     
     const handleAbout = () => {
          setStyleHome('home')
          setStyleBills('bills');
          setStyleAbout('about animation')
     }

     const handleBills = () => {
          setStyleHome('home')
          setStyleBills('bills animation');
          setStyleAbout('about')
     }

     return (
          <div className="header"> 
               <Row>
                    <Col className='leftHeader' span={5}>
                         <Image width={50} className='imageLogo' src='/image/logo-nike.png' preview={false}/>
                         <p className='nameLogo'>Nike</p>
                    </Col>
                    <Col span={11}>
                    </Col>
                    <Col className='rightHeader' span={8}>
                         <p onClick={handleHome} className={styleHome}>HOME</p>
                         <p onClick={handleAbout} className={styleAbount}>ABOUT</p>
                         <p onClick={handleBills} className={styleBills}>BILLS</p>
                         <Image onClick={changeToCart} width={25} className='logoCart' src='/image/logo-cart.png' preview={false}/>
                    </Col>
               </Row>
          </div>
     )
}

export default Header;