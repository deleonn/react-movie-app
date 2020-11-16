import React from 'react';
import styled from 'styled-components';
import SearchIcon from 'react-ionicons/lib/MdSearch';
import CancelIcon from 'react-ionicons/lib/MdClose';

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
  const [isSearching, setIsSearching] = React.useState<boolean>(false);

  const handleSearch = () => {
    setIsSearching(true);
  };

  const cancelSearch = () => {
    setIsSearching(false);
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
            <Input placeholder="Start typing to search..." />
          </>
        )}
      </Container>
    </>
  );
}

export default Search;
