import { useEffect } from "react";
// styles
import { SliderDiv, IconDiv, Icon } from "./DateSlider.style";
// hooks
import { useOpenClose } from "../../hooks/useOpenClose";
// icon
import TimelineIcon from "../../assets/icons/timeline.png";
// esri modules
import TimeSliderModule from "@arcgis/core/widgets/TimeSlider";

const TimeSlider = ({ layer, view }) => {
  const { handleOpen, show } = useOpenClose();

  // Create a time slider to update layerView filter
  useEffect(() => {
    if (layer) {
      const timeSlider = new TimeSliderModule({
        container: "dateSlider",
        mode: "time-window",
        layout: "compact",
        view: view,
      });

      // wait until the layer view is loaded
      timeSlider.when(function () {
        let timeLayerView;
        view.whenLayerView(layer).then((layerView) => {
          timeLayerView = layerView;
          const fullTimeExtent = layer.timeInfo.fullTimeExtent;
          const start = fullTimeExtent.start;
          const end = fullTimeExtent.end;

          // set up time slider properties based on layer timeInfo
          timeSlider.fullTimeExtent = fullTimeExtent;
          timeSlider.timeExtent = {
            start: start,
            end: end,
          };
          timeSlider.stops = {
            interval: layer.timeInfo.interval,
          };
        });

        timeSlider.watch("timeExtent", (value) => {
          timeLayerView.filter = {
            timeExtent: value,
          };
        });
        timeSlider.render();
      });
    }
  });

  return (
    <>
      <IconDiv>
        <Icon Icon src={TimelineIcon} alt="home-icon" onClick={handleOpen} />
      </IconDiv>

      <SliderDiv>{show && <div id="dateSlider"></div>}</SliderDiv>
    </>
  );
};

export default TimeSlider;
