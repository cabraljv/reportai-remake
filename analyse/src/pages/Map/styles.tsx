import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  aside {
    width: 300px;
    height: 100vh;
    background: #fff;
    position: absolute;
    top: 0;
    right: 0;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    padding-top: 65px;
  }
`;
export const MapContainer = styled.div`
  position: absolute;
  top: 0;
  right: 300px;
  height: 100vh;
  width: 100%;
  padding-top: 65px;
`;
export const Marker = styled.div`
  img {
    width: 60px;
    height: 60px;
  }
`;
