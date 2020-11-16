import React from 'react';
import styled from 'styled-components';
import { Logo } from './Logo';
import Search from './Search';

const Container = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: space-between;
  z-index: 9999;
`;

const Inner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.6rem 2rem;
  justify-content: space-between;
`;

function Navbar() {
  return (
    <Container>
      <Inner>
        <Logo>MOVIEFLIX</Logo>

        <Search />
      </Inner>
    </Container>
  );
}

export default Navbar;
