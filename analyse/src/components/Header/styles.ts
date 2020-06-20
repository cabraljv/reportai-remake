import styled from 'styled-components';

export const Container = styled.div`
  height: 65px;
  width: 100%;
  background: #ff5f5f;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  button {
    background: transparent;
    cursor: pointer;
    padding: 10px;
    border: none;
    img {
      height: 20px;
    }
  }
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    h1 {
      color: #fff;
      font-size: 1.6em;
      margin-left: 10px;
    }
  }
  h2 {
    color: #fff;
    font-weight: normal;
    font-size: 1.3em;
  }
`;
