import React from 'react';
import styled from 'styled-components';
import { getPoster } from '../util';

const AbsoluteLabel = styled.h1`
  top: -5%;
  left: 10%;
  z-index: 0;
  font-size: 8rem;
  font-weight: 800;
  color: #272727;
  position: absolute;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
`;

const GridContainer = styled.div`
  z-index: 10;
  width: 100vw;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  max-width: 60%;
  position: relative;
  align-items: center;
  padding-bottom: 2rem;
`;

const GridElement = styled.div<{ poster: string }>`
  height: 140px;
  flex: 1 0 24%;
  background: gray;
  background-size: cover;
  background-repeat: no-repeat;
  transition: all 120ms ease-in-out;
  background-blend-mode: multiply;
  background-color: rgba(0, 0, 0, 0.65);
  background-image: url(${(props) => props.poster});

  &:hover {
    transform: scale(1.1);
    background-color: rgba(0, 0, 0, 0);
  }
`;

const InnerGridElement = styled.div`
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  height: inherit;
  flex-direction: column;
  justify-content: flex-end;
`;

const MovieTitle = styled.p`
  margin: 0;
  color: white;
  font-weight: 300;
  margin-bottom: 0.6rem;
`;

const Indicator = styled.div`
  width: 20px;
  height: 2px;
  background-color: #e6411a;
`;

interface Props {
  movies: any[];
  hoverOver?: (el: any) => void;
}

function Grid({ movies, hoverOver }: Props) {
  let timeout: any = undefined;

  const handleHoverOver = (el: any) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      hoverOver!(el);
    }, 1000);
  };

  return (
    <>
      <AbsoluteLabel>Popular</AbsoluteLabel>
      <GridContainer>
        {movies.map((el, idx) => (
          <GridElement
            key={idx}
            poster={getPoster(el.backdrop_path, '500')}
            onMouseEnter={() => handleHoverOver(el)}
          >
            <InnerGridElement className="inner-element">
              <MovieTitle>{el.title}</MovieTitle>
              <Indicator />
            </InnerGridElement>
          </GridElement>
        ))}
      </GridContainer>
    </>
  );
}

export default Grid;
