import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
const HeaderH = styled.header`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 2rem;
  z-index: 1;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #6a6a6a;
  border-top: 1px solid #6a6a6a;
  background-color: #2f3237;
  justify-content: space-between;
`;
const ListSection = styled.section`
  height: 100%;
`;
const IntroSection = styled.section`
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 18px;
`;
const AuthBox = styled.div`
  a {
    color: #fff;
    padding: 0.45rem;
    margin: 0 0.25rem;
  }
`;
const LoginBtn = styled(Link)``;
const LogoutBtn = styled.button`
  all: unset;
`;
const JoinBtn = styled(Link)``;

const List = styled.ul`
  display: flex;
  width: 100%;
  height: 100%;
`;
const Item = styled.li`
  width: 80px;
  height: 100%;
  ${props =>
    props.current ? { backgroundColor: "black", color: "#fff" } : "transparent"}
`;
const Slink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #fff;
  padding: 0 0.45rem;
  margin: 0 0.25rem;
`;
const Header = props => {
  return (
    <HeaderH>
      <ListSection>
        <List>
          <Item current={props.location.pathname === "/"}>
            <Slink to="/">자랑툰</Slink>
          </Item>
          <Item>
            <Slink to="/">커밍쑨</Slink>
          </Item>
          <Item>
            <Slink to="/">커밍쑨</Slink>
          </Item>
        </List>
      </ListSection>
      <IntroSection>
        <AuthBox>
          <>
            <LoginBtn to="/login">로그인</LoginBtn>
            <JoinBtn to="/register">회원가입</JoinBtn>
          </>
        </AuthBox>
      </IntroSection>
    </HeaderH>
  );
};
export default withRouter(Header);
