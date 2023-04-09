import Header from "../../util/Header";
import ProductInCart from "../../util/ProductInCart";
import { Row, Col, Button, Modal, Input, Dropdown, Space, message } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

import "./style.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const arrayShoes = [
  {
    name: "Nike 1",
    url: "/image/shoe1.png",
    price: 1200,
    quantity: 20,
    amount: 1,
  },
  {
    name: "Nike 1",
    url: "/image/shoe2.png",
    price: 1200,
    quantity: 20,
    amount: 1,
  },
  {
    name: "Nike 1",
    url: "/image/shoe3.png",
    price: 1200,
    quantity: 20,
    amount: 1,
  },
  {
    name: "Nike 1",
    url: "/image/shoe4.png",
    price: 1200,
    quantity: 20,
    amount: 1,
  },
  {
    name: "Nike 1",
    url: "/image/shoe5.png",
    price: 1200,
    quantity: 20,
    amount: 1,
  },
  {
    name: "Nike 1",
    url: "/image/shoe6.png",
    price: 1200,
    quantity: 20,
    amount: 1,
  },
  {
    name: "Nike 1",
    url: "/image/shoe17.png",
    price: 1200,
    quantity: 20,
    amount: 1,
  },
  {
    name: "Nike 1",
    url: "/image/shoe8.png",
    price: 1200,
    quantity: 20,
    amount: 1,
  },
  {
    name: "Nike 1",
    url: "/image/shoe9.png",
    price: 1200,
    quantity: 20,
    amount: 1,
  },
  {
    name: "Nike 1",
    url: "/image/shoe10.png",
    price: 1200,
    quantity: 20,
    amount: 1,
  },
  {
    name: "Nike 1",
    url: "/image/shoe11.png",
    price: 1200,
    quantity: 20,
    amount: 1,
  },
  {
    name: "Nike 1",
    url: "/image/shoe12.png",
    price: 1200,
    quantity: 20,
    amount: 1,
  },
  {
    name: "Nike 1",
    url: "/image/shoe13.png",
    price: 1200,
    quantity: 20,
    amount: 1,
  },
  {
    name: "Nike 1",
    url: "/image/shoe14.png",
    price: 1200,
    quantity: 20,
    amount: 1,
  },
  {
    name: "Nike 1",
    url: "/image/shoe15.png",
    price: 1200,
    quantity: 20,
    amount: 1,
  },
  {
    name: "Nike 1",
    url: "/image/shoe16.png",
    price: 2000,
    quantity: 20,
    amount: 1,
  },
];

const items = [
  {
    label: "Lai Châu",
    key: "1",
    icon: <UserOutlined />,
  },
  {
    label: "Hà Nội",
    key: "2",
    icon: <UserOutlined />,
  },
  {
    label: "Sơn La",
    key: "3",
    icon: <UserOutlined />,
  },
  {
    label: "Lào Cai",
    key: "4",
    icon: <UserOutlined />,
  },
];

const Cart = () => {
  const [total, setTotal] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const sum = () => {
    let tmp = 0;
    for (let i = 0; i < arrayShoes.length; i++) {
      tmp += arrayShoes[i].price * arrayShoes[i].amount;
    }
    setTotal(tmp);
  };
  useEffect(() => {
    sum();
  }, []);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  const handleMenuClick = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div className="pageCart">
      <Header page={"cart"} />
      <Row className="content">
        <Col className="product-name" span={7}>
          Product Name
        </Col>
        <Col className="quantity">Quantity</Col>
        <Col className="subtotal">Subtotal</Col>
        <Col className="total">Total</Col>
        <Col className="clear-cart">Clear</Col>
      </Row>
      {arrayShoes.map((shoe) => (
        <ProductInCart
          name={shoe.name}
          url={shoe.url}
          price={shoe.price}
          quantity={shoe.quantity}
          amount={shoe.amount}
          changeTotal={setTotal}
        />
      ))}

      <Row className="bottom">
        <Button className="bottom-back" onClick={handleBack}>
          Back to Shopping
        </Button>
        <Col className="buy-total">
          <p className="total-money">Total: ${total}</p>
          <Button onClick={showModal} className="bottom-buy">
            Buy
          </Button>
        </Col>
      </Row>

      <Modal
        title="Thông tin người mua"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
		width={650}
      >
        <div>
          <p>Họ và tên<span className="obligatory">*</span></p>
          <Row className="name-custmmer">
            <Input className="first-name" placeholder="Họ" />
            <Input className="last-name" placeholder="Tên" />
          </Row>
          <p>Email<span className="obligatory">*</span></p>
          <Row>
            <Input className="email" placeholder="Email" />
          </Row>
          <p>Số điện thoại<span className="obligatory">*</span></p>
          <Row>
            <Input className="phone" placeholder="Số điện thoại" />
          </Row>
          <p>Địa chỉ<span className="obligatory">*</span></p>
          <Dropdown menu={menuProps}>
            <Button>
              <Space>
                --Chọn Tỉnh/ Thành Phố--
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
		  <Dropdown menu={menuProps}>
            <Button>
              <Space>
                --Chọn Huyện/ Quận--
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
		  <Dropdown menu={menuProps}>
            <Button>
              <Space>
                --Chọn Phường/ Xã--
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
		  <Input className="apartment-number" placeholder="Số nhà" />
		  <p>Lời nhắn</p>
		  <Input className="message" />
        </div>
      </Modal>
    </div>
  );
};

export default Cart;
