import styled from 'styled-components';

export const Container = styled.div`
  padding: 30px;
  overflow: auto;
  section#top {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    padding: 30px;
    padding-left: 10px;

    background: #fff;
  }
  h3 {
    color: #686868;
    font-size: 1.2rem;
    font-weight: normal;
    padding-left: 20px;
    padding-bottom: 10px;
  }
  section#button {
    margin-top: 15px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 15px;
    height: 250px;
    h6 {
      font-size: 3rem;
      padding-left: 20px;
      padding-bottom: 20px;
      font-weight: normal;
    }
    div.dashboard-item {
      background: #fff;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      padding: 30px;
    }
  }
`;
