import React from 'react';
import styled from 'styled-components';
import { getPoster } from '../util';
import Navbar from './Navbar';

const Main = styled.div<{ background?: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  min-height: 100vh;
  flex-direction: column;

  background: url(${(props) => props.background});
  background-color: ${(props) =>
    props.background ? 'rgba(0,0,0,0.8)' : '#2d2d2d'};
  background-repeat: no-repeat;
  background-blend-mode: multiply;
  transition: all 1s ease-in-out;
  background-size: cover;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  children: React.ReactChild | React.ReactChild[];
  background?: string;
}

function Layout({ children, background }: Props) {
  return (
    <Main background={background}>
      <Navbar />
      <Content>{children}</Content>
    </Main>
  );
}

export default Layout;
