import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Close from 'react-ionicons/lib/IosClose';
import { format } from 'date-fns';
import Ratings from 'react-star-ratings';
import { getPoster } from '../util';
import { Caption } from './Caption';

const Backdrop = styled.div`
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 999;
  height: 100vh;
  display: flex;
  position: fixed;
  align-items: center;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);

  animation: fadeIn 220ms ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`;

const ModalContainer = styled.div`
  width: 800px;
  display: flex;
  color: white;
  max-width: 600px;
  position: relative;
  padding-bottom: 2rem;
  background: #2d2d2d;
  flex-direction: column;
`;

const InnerBackdrop = styled.div<{ background: string }>`
  width: 100%;
  height: 260px;
  background: url(${(props) => props.background});
  background-size: cover;
  background-repeat: no-repeat;
`;

const InfoBar = styled.div`
  display: flex;
  margin: 1rem;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ReleaseDate = styled.h4`
  margin: 0;
`;

const Overview = styled.p`
  margin: 0rem;
  margin-top: 0.4rem;
`;

const CloseButtonWrapper = styled.div`
  top: 1rem;
  right: 1rem;
  width: 2.3rem;
  height: 2.3rem;
  display: flex;
  cursor: pointer;
  background: black;
  position: absolute;
  border-radius: 100%;
  align-items: center;
  justify-content: center;
`;

interface Props {
  isVisible: boolean;
  close: () => void;
  data: {
    backdrop_path: string;
    overview: string;
    release_date: string;
    vote_average: string;
  };
}

const DetailViewModal = ({ isVisible, close, data }: Props) =>
  isVisible
    ? ReactDOM.createPortal(
        <>
          <Backdrop>
            <ModalContainer>
              <CloseButtonWrapper onClick={close}>
                <Close color="#fff" fontSize="2rem" />
              </CloseButtonWrapper>
              <InnerBackdrop
                background={getPoster(data.backdrop_path, '500')}
              />

              <InfoBar>
                <ReleaseDate>
                  <Caption>Release Date:</Caption>{' '}
                  {format(new Date(data.release_date), 'PP')}
                </ReleaseDate>
                <div>
                  <Caption>Rating:</Caption>
                  <Ratings
                    rating={Number(data.vote_average) / 2}
                    starRatedColor="#e6411a"
                    starDimension="1.5rem"
                    starSpacing="0"
                  />
                </div>
              </InfoBar>

              <div style={{ margin: '1rem' }}>
                <Caption>Overview</Caption>
                <Overview>{data.overview}</Overview>
              </div>
            </ModalContainer>
          </Backdrop>
        </>,
        document.body
      )
    : null;

export default DetailViewModal;
