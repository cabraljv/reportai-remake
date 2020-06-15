import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    header {
      display: flex;
      flex-direction: row;
      align-items: center;
      h1 {
        color: #ff5f5f;
        font-size: 2.5em;
        width: 150px;
      }
      img {
        width: 300px;
      }
    }
    footer {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      button {
        width: 230px;
        height: 45px;
        display: flex;
        border-radius: 20px;
        margin: 10px;
        border: 0;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        div {
          height: 100%;
          width: 55px;
          border-top-left-radius: 20px;
          border-bottom-left-radius: 20px;
          align-items: center;
          justify-content: center;
          img {
            width: 20px;
          }
        }
        aside {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      button#googleButton {
        background: #fff;
        color: #555555;
        div {
          background: #f6f6f6;
        }
      }
      button#facebookButton {
        background: #5f6fff;
        color: #fff;
        div {
          background: #495bff;
        }
      }
    }
  }
`;
