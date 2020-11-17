import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { format } from 'date-fns';
import Ratings from 'react-star-ratings';
import { getPoster } from '../util';
import { Caption } from './Caption';

const Backdrop = styled.div`
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  z-index: 999;
  height: 100vh;
  display: flex;
  position: fixed;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  background: rgba(0, 0, 0, 0.7);
  animation: fadeIn 220ms ease-in-out;
  overflow-y: hidden;

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
  width: 100%;
  display: flex;
  color: white;
  background: #2d2d2d;
  flex-direction: column;
  height: 100vh;
  padding: 0 2rem;
  position: relative;
  box-sizing: border-box;
  padding-top: 2rem;
`;

const FilterRow = styled.div`
  display: flex;
  margin: 2rem 0;
  flex-direction: column;
`;

const Results = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const List = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 1rem;
  padding-bottom: 4rem;
`;

const ListElement = styled.div`
  display: flex;
  flex: 0 1 24%;
  margin: 0.4rem;
  cursor: pointer;
  min-height: 200px;
  max-height: 200px;

  @media (max-width: 1850px) {
    flex: 0 1 32%;
  }

  @media (max-width: 1300px) {
    flex: 0 1 48%;
  }

  @media (max-width: 900px) {
    flex: 1 1 100%;
  }
`;

const Image = styled.div<{ background: string }>`
  display: flex;
  background: ${(props) =>
    props.background ? `url(${getPoster(props.background, '200')})` : `black`};
  background-size: auto;
  background-repeat: no-repeat;
  flex-basis: 200px;
`;

const Description = styled.div`
  flex: 1;
  display: flex;
  padding: 1rem;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.6);
`;

const Title = styled.h3`
  margin: 0;
  margin-bottom: 0.2rem;
`;

const Release = styled.span`
  margin: 0;
  font-size: 11px;
`;

const Overview = styled.p`
  margin: 0;
  font-size: 13px;
  overflow-y: scroll;
  white-space: pre-wrap;
  text-overflow: ellipsis;
`;

interface Props {
  isVisible: boolean;
  close: () => void;
  data?: any;
}

const DetailViewModal = ({ isVisible, data = [] }: Props) => {
  const [currentRating, setCurrentRating] = React.useState<number>(0);
  const [filteredData, setFilteredData] = React.useState<any>([]);

  React.useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleRatingChange = (rating: number) => {
    if (currentRating === rating) {
      setCurrentRating(0);
      setFilteredData(data);
    } else {
      setCurrentRating(rating);
      computeFilter(rating);
    }
  };

  const computeFilter = (rating: number) => {
    const filteredData = data;

    const newData = filteredData.filter(
      (el: any) =>
        el.vote_average / 2 > rating && el.vote_average / 2 < rating + 1
    );

    setFilteredData(newData);
  };

  return isVisible
    ? ReactDOM.createPortal(
        <>
          <Backdrop>
            <ModalContainer>
              <FilterRow>
                <Caption style={{ marginBottom: '1rem' }}>
                  Filter by Rating
                </Caption>
                <Ratings
                  rating={currentRating}
                  starRatedColor="#e6411a"
                  starDimension="2rem"
                  starSpacing="0"
                  changeRating={handleRatingChange}
                />
              </FilterRow>

              <Results>
                <Caption>Results</Caption>

                <List>
                  {!filteredData.length && <Title>No results found</Title>}
                  {!!filteredData.length &&
                    filteredData.map((el: any, idx: number) => (
                      <ListElement key={idx}>
                        <Image background={el.poster_path} />
                        <Description>
                          <Title>{el.title}</Title>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginBottom: '0.6rem',
                            }}
                          >
                            <Release>
                              {el.release_date
                                ? format(new Date(el.release_date), 'PP')
                                : 'N/A'}
                            </Release>
                            <Ratings
                              rating={Number(el.vote_average) / 2}
                              starRatedColor="#e6411a"
                              starDimension="1rem"
                              starSpacing="0"
                            />
                          </div>
                          <Overview>{el.overview}</Overview>
                        </Description>
                      </ListElement>
                    ))}
                </List>
              </Results>
            </ModalContainer>
          </Backdrop>
        </>,
        document.body
      )
    : null;
};

export default DetailViewModal;
