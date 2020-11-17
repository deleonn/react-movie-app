import React from 'react';
import styled from 'styled-components';
import SearchIcon from 'react-ionicons/lib/MdSearch';
import CancelIcon from 'react-ionicons/lib/MdClose';
import { useModal, search } from '../util';
import Modal from './SearchModal';

const Container = styled.div<{ isSearching: boolean }>`
  opacity: ${(props) => (props.isSearching ? 1 : 0.6)};
  display: flex;

  &:hover {
    opacity: 1;
  }
`;

const Input = styled.input`
  color: white;
  outline: none;
  border: 1px solid #929292;
  background: rgba(0, 0, 0, 0.6);
  animation: expand 220ms ease-in;
  position: absolute;
  right: 4rem;
  padding: 0.3rem;
  width: 200px;

  @keyframes expand {
    from {
      width: 0;
    }

    to {
      width: 200px;
    }
  }
`;

function Search() {
  const { isVisible, setVisibility } = useModal();
  const [isSearching, setIsSearching] = React.useState<boolean>(false);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [movies, setMovies] = React.useState<any>([]);

  let timeout: any = '';

  React.useEffect(() => {
    if (searchQuery) {
      setVisibility(true);
    } else {
      setVisibility(false);
    }
  }, [searchQuery]);

  const handleSearch = () => {
    setIsSearching(true);
  };

  const cancelSearch = () => {
    setIsSearching(false);
    setSearchQuery('');
  };

  const handleSearchInput = (e: any) => {
    const value = e.currentTarget.value;
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      setSearchQuery(value);
      fetchMovies(value);
    }, 500);
  };

  const fetchMovies = async (value: string) => {
    if (value) {
      const params = {
        sort_by: 'popularity.desc',
        page: 1,
        language: 'en-US',
        query: value,
      };

      const request = await search(params);
      setMovies(request.data.results);
    }
  };

  return (
    <>
      <Container isSearching={isSearching}>
        {!isSearching && (
          <SearchIcon
            color="white"
            fontSize="1.8rem"
            style={{ cursor: 'pointer' }}
            onClick={handleSearch}
          />
        )}

        {isSearching && (
          <>
            <CancelIcon
              color="white"
              fontSize="1.8rem"
              style={{ cursor: 'pointer' }}
              onClick={cancelSearch}
            />
            <Input
              placeholder="Start typing to search..."
              onChange={(e) => handleSearchInput(e)}
            />
          </>
        )}
      </Container>

      <Modal
        isVisible={isVisible}
        close={() => setVisibility(false)}
        data={movies}
      />
    </>
  );
}

export default Search;
