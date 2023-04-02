import { useNavigate } from "react-router-dom";
import { Image, Row, Col } from "antd";
import Header from "../../util/Header";
import Shoes from "../../util/Shoes";

import "./style.css";

const array = [
  {
    name: "Nike 1",
    url: "/image/shoe1.png",
    price: 1200,
    quantity: 20,
  },
  {
    name: "Nike 1",
    url: "/image/shoe2.png",
    price: 1200,
    quantity: 20,
  },
  {
    name: "Nike 1",
    url: "/image/shoe3.png",
    price: 1200,
    quantity: 20,
  },
  {
    name: "Nike 1",
    url: "/image/shoe4.png",
    price: 1200,
    quantity: 20,
  },
  {
    name: "Nike 1",
    url: "/image/shoe5.png",
    price: 1200,
    quantity: 20,
  },
  {
    name: "Nike 1",
    url: "/image/shoe6.png",
    price: 1200,
    quantity: 20,
  },
  {
    name: "Nike 1",
    url: "/image/shoe17.png",
    price: 1200,
    quantity: 20,
  },
  {
    name: "Nike 1",
    url: "/image/shoe8.png",
    price: 1200,
    quantity: 20,
  },
  {
    name: "Nike 1",
    url: "/image/shoe9.png",
    price: 1200,
    quantity: 20,
  },
  {
    name: "Nike 1",
    url: "/image/shoe10.png",
    price: 1200,
    quantity: 20,
  },
  {
    name: "Nike 1",
    url: "/image/shoe11.png",
    price: 1200,
    quantity: 20,
  },
  {
    name: "Nike 1",
    url: "/image/shoe12.png",
    price: 1200,
    quantity: 20,
  },
  {
    name: "Nike 1",
    url: "/image/shoe13.png",
    price: 1200,
    quantity: 20,
  },
  {
    name: "Nike 1",
    url: "/image/shoe14.png",
    price: 1200,
    quantity: 20,
  },
  {
    name: "Nike 1",
    url: "/image/shoe15.png",
    price: 1200,
    quantity: 20,
  },
  {
    name: "Nike 1",
    url: "/image/shoe16.png",
    price: 1200,
    quantity: 20,
  },
];

const Home = () => {
  const navigate = useNavigate();

  const redirectToCart = () => {
    navigate("/cart");
  };

  return (
    <div>
      <Header page={'home'} />

      <div className="content">
        <Row
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          {array.map((shoe) => (
            <Col className="gutter-row" sm={24}  md={12} lg={8} xl={6}>
              <Shoes
                name={shoe.name}
                url={shoe.url}
                price={shoe.price}
                quantity={shoe.quantity}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Home;
