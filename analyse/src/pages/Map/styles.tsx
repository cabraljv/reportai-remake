import styled from 'styled-components';
import ReactSelect from 'react-select';
interface IMarker {
  lat: number;
  lng: number;
}
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
    overflow-y: auto;
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
export const Marker = styled.div<IMarker>`
  cursor: pointer;
  img {
    height: 60px;
  }
  transform: translate(-19px, -60px);
`;
export const DatePickerStyled = styled.div`
  border: 2px solid #666;
  border-radius: 5px;
  cursor: pointer;
  padding: 2px 15px;
  margin-bottom: 10px;
  p {
    font-size: 1.1rem;
    color: #666;
  }
`;
export const Select = styled(ReactSelect)``;
export const Filters = styled.div`
  margin: 10px 30px;
  h3 {
    color: #ff5f5f;
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
  section {
    p:first-child {
      font-size: 1.1rem;
      color: #333;
      padding: 5px 0;
    }
  }
  button:last-child {
    background: #ff5f5f;
    color: #fff;
    border: 0;
    width: 100%;
    height: 40px;
    font-weight: bold;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 30px;
  }
`;
export const Actions = styled.div`
  border-top: 1px solid #bbb;
  margin-top: 20px;
  padding: 10px 30px;
  display: flex;
  flex-direction: column;
  section {
    margin-top: 20px;
  }
  section > p {
    font-size: 0.8rem;
  }
  button {
    margin-top: 10px;
    padding: 10px 0;
    font-size: 0.9rem;
    letter-spacing: 2px;
    color: #fff;
    background-color: #ff5f5f;
    border: 0;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
  }
  button#delete {
    border: 1px solid #ff5f5f;
    background: transparent;
    color: #ff5f5f;
    margin-top: 30px;
  }

  h3 {
    color: #ff5f5f;
    font-size: 1.5rem;
  }
`;
export const ReportDetails = styled.div`
  margin: 20px 50px;
  header {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;
    section {
      flex-direction: column;
      span {
        color: #ff5f5f;
        font-size: 0.8rem;
      }
      h3 {
        color: #ff5f5f;
        font-size: 1.5rem;
      }
    }
    p {
      font-size: 0.7rem;
      color: #777;
      width: 100px;
    }
  }
  section {
    display: flex;
    flex-direction: column;
    img {
      width: 100%;
      border-radius: 10px;
      margin-bottom: 30px;
    }
    span {
      color: #ff5f5f;
      font-size: 0.8rem;
      font-weight: bold;
    }
    div {
      height: 200px;
      width: 100%;
      background: #fff;
      border-radius: 15px;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
      padding: 8px;
    }
  }
`;
