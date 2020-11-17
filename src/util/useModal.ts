import React from 'react';

function useModal() {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const toggle = () => {
    setIsVisible(!isVisible);
  };

  const setVisibility = (value: boolean) => {
    setIsVisible(value);
  };

  return {
    isVisible,
    toggle,
    setVisibility,
  };
}

export default useModal;
