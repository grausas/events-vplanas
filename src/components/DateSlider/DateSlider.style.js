import styled from "styled-components";

export const Wrapper = styled.div``;

export const IconDiv = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 20px;
  bottom: 145px;
  border: 1px solid var(--darkSilver);
  border-radius: 10px;
  padding: 5px;
  background-color: var(--white);
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;

export const Icon = styled.img`
  width: 22px;
`;

export const SliderDiv = styled.div`
  position: absolute;
  max-width: 600px;
  width: 100%;
  left: calc(50% - 300px);
  bottom: 40px;
  display: ${(props) => (props.display ? "none" : "block")};

  /* style for Time Line widget */
  .esri-time-slider {
    /* max-width: 600px !important; */
    width: 100% !important;
    min-width: 0 !important;
    height: 120px !important;
  }

  .esri-ui-manual-container > .esri-component {
    display: none !important;
  }

  .esri-time-slider__playback-controls {
    flex-direction: column;
  }

  .esri-time-slider__slider .esri-slider {
    margin-top: 0px !important;
  }
  .esri-time-slider__layout--wide .esri-time-slider__time-extent {
    width: 100% !important;
    flex-flow: row !important;
    padding: 10px 0;
    border-left: none !important;
  }
  .esri-time-slider__slider .esri-slider__tick.minorTick {
    display: none !important;
    visibility: hidden;
  }
  .esri-time-slider__row:nth-child(3) {
    height: 0;
  }

  .esri-slider {
    height: 60% !important;
  }
  .esri-time-slider__animation {
    display: none !important;
  }
  .esri-time-slider__min {
    display: none !important;
  }

  .esri-time-slider__max {
    display: none !important;
  }

  .esri-time-slider__previous {
    display: none;
  }

  .esri-time-slider__next {
    display: none;
  }
  /*  ---------  */
`;
