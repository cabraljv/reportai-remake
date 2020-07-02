import styled from 'styled-components';
interface Props {
  open: boolean;
}
export const Container = styled.div`
  z-index: 20;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: ${(p: Props) => (p.open ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  && > div {
    background: #fff;
    padding: 20px 40px;
    border-radius: 20px;
  }
`;
