import styled from "styled-components";

export const MapDiv = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  position: relative !important;
`;

export const Content = styled.div``;

export const SearchDiv = styled.div`
  position: absolute;
  right: 20px;
  top: 10px;
  box-shadow: 0px 5px 60px 0px rgba(0, 0, 0, 0.25);
  border: 1px solid var(--darkSilver);
  border-radius: 5px;

  @media only screen and (max-width: 768px) {
    width: 150px;
    right: 10px;
    top: 5px;
  }

  .esri-search__container .esri-search__input {
    border-radius: 5px 0 0 5px;
  }
  .esri-search__container .esri-widget--button {
    border-radius: 0 5px 5px 0;
  }
`;

export const SketchDiv = styled.div`
  display: flex;
  flex-direction: column-reverse;
  position: absolute;
  right: 20px;
  top: 90px;
  box-shadow: 0px 5px 60px 0px rgba(0, 0, 0, 0.25);
  border: 1px solid var(--darkSilver);
  border-radius: 5px;

  .esri-editor__header {
    height: 30px;
  }

  .esri-feature-form__date-format-hint {
    display: none;
  }

  h4 {
    margin: 0;
  }

  .esri-editor__content {
    min-height: 0;
  }
`;
