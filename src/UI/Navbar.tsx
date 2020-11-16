import React from 'react';
import styled from 'styled-components';
import { Logo } from './Logo';

const Container = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  margin-bottom: 6rem;
  justify-content: space-between;
`;

const Inner = styled.div`
  padding: 0.6rem 2rem;
`;

function Navbar() {
  return (
    <Container>
      <Inner>
        <Logo>MOVIEFLIX</Logo>
      </Inner>
    </Container>
  );
}

export default Navbar;
