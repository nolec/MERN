import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link, Redirect } from "react-router-dom";
const Main = styled.main`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
`;

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 80px;
`;

const Item = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
`;
const GridBox = styled.div`
  color: #fff;
  height: 100%;
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(5, minmax(150px, 1fr));
  grid-template-rows: repeat(auto, minmax(300px, 1fr));
  grid-gap: 30px;
  ${Item}:first-child {
    grid-column: span 2;
    grid-row: span 2;
  }
`;
const ItemContent = styled.div``;
const Landing = () => (
  <Main>
    <Container>
      <GridBox>
        <Item>
          <ItemContent></ItemContent>
        </Item>
      </GridBox>
    </Container>
  </Main>
);
Landing.propTypes = {};

export default Landing;
