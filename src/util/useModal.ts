import React from 'react';

function useModal() {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const toggle = () => {
    setIsVisible(!isVisible);
  };

  return {
    isVisible,
    toggle,
  };
}

export default useModal;
