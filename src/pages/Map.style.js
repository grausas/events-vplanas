import styled from "styled-components";

export const MapDiv = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  position: relative !important;
`;

export const SearchDiv = styled.div`
  position: absolute;
  right: 20px;
  top: 10px;
  box-shadow: 0px 5px 60px 0px rgba(0, 0, 0, 0.25);

  @media only screen and (max-width: 768px) {
    width: 150px;
  }
`;
