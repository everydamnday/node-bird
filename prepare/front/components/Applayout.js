import PropTypes from "prop-types";
import Link from "next/link";
import Head from "next/head";
import { Menu, Input, Row, Col } from "antd";
import Userprofile from "./Userprofile";
import LoginForm from "./LoginForm";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const Applayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/">
            <a>Nodebird</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput enterButton />
        </Menu.Item>
        <Menu.Item key="signup">
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <Userprofile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://sprdthemssg.wordpress.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            Made by HAN
          </a>
        </Col>
      </Row>
    </div>
  );
};

export default Applayout;

Applayout.propTypes = {
  children: PropTypes.node.isRequired,
};
