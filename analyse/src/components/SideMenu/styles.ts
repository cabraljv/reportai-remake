import styled from 'styled-components';

interface Props {
  open: boolean;
}

export const Container = styled.div`
  height: 100vh;
  width: 250px;
  background: #fff6f6;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(${(p: Props) => (p.open ? '0' : '-300px')});
  transition: transform 800ms ease;
  z-index: 5;
  box-shadow: 1px 0 5px rgba(0, 0, 0, 0.2);
  padding-top: 80px;
  padding-left: 10px;
  a {
    text-decoration: none;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    background: transparent;
    border: 0;
    align-items: center;
    padding: 5px 40px;
    margin: 10px 0;
    p {
      color: #858585;
      margin-left: 15px;
      font-size: 1.1em;
    }
  }
`;
