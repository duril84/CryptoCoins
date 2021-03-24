import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`

const Loading = ({ type, color }) => (
  <LoadingContainer>
    <ReactLoading type={type} color={color} height={'5rem'} width={'5rem'} />
  </LoadingContainer>
);

export default Loading;
