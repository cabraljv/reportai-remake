import styled from 'styled-components';

interface Props {
  opened: boolean;
}

export const Container = styled.div`
  height: 100vh;
  width: 250px;
  background: #fff6f6;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(${(p: Props) => (p.opened ? '0' : '-300px')});
  transition: transform 800ms ease;
  z-index: 5;
  box-shadow: 1px 0 5px rgba(0, 0, 0, 0.2);
  padding-top: 80px;
  padding-left: 50px;
  button {
    display: flex;
    flex-direction: row;
    background: transparent;
    border: 0;
    align-items: center;
    margin: 10px 0;
    padding: 5px;
    p {
      color: #858585;
      margin-left: 15px;
      font-size: 1.1em;
    }
  }
`;