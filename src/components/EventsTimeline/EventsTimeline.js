// styles
import {
  Wrapper,
  TimelineContainer,
  TimelineItem,
  ItemContent,
  CategoryDiv,
  EventDate,
  Text,
  Circle,
  BackButton,
} from "./EventsTimeline.style";
// components
import { Category } from "../index";
// utils
import { CategoryData } from "../../utils/CategoryData";
// helpers
import { changeDate, changeTime } from "../../helpers/DateChange";
// icons
import Calendar from "../../assets/icons/calendar.png";

const EventsTimeline = ({
  events,
  handleEventOpen,
  clickedEvent,
  emptyTimeline,
  handleShowAll,
  eventsLength,
}) => {
  return (
    <Wrapper>
      {eventsLength && (
        <BackButton onClick={handleShowAll}>
          <span>{eventsLength}</span>
        </BackButton>
      )}
      {emptyTimeline && <h2>{emptyTimeline}</h2>}
      <TimelineContainer>
        {events &&
          events.map((event) => {
            const result = CategoryData.find(
              ({ id }) => id === event.attributes.KATEGORIJA
            );
            const startDate = new Date(event.attributes.RENGINIO_PRADZIA);
            const endDate = new Date(event.attributes.RENGINIO_PABAIGA);
            const eventStartDate = changeDate(startDate);
            const eventStartTime = changeTime(startDate);
            const eventFinishDate = changeDate(endDate);
            const eventFinishTime = changeTime(endDate);

            const oneDay = 1000 * 60 * 60 * 24;
            const diffInTime = endDate.getTime() - startDate.getTime();
            const diffInDays = Math.round(diffInTime / oneDay);

            return (
              <TimelineItem key={event.attributes.OBJECTID}>
                <ItemContent
                  onClick={() => handleEventOpen(event.attributes.OBJECTID)}
                  clickedEvent={
                    event.attributes.OBJECTID === clickedEvent
                      ? "clicked"
                      : null
                  }
                >
                  <CategoryDiv>
                    <Category
                      bgColor={event.attributes.KATEGORIJA}
                      text={result && result.text}
                      bgImage={event.attributes.KATEGORIJA}
                      display="show"
                    />
                  </CategoryDiv>
                  <Text>{event.attributes.PAVADINIMAS}</Text>
                  <EventDate>
                    <img src={Calendar} alt="calendar-icon" />
                    {event.attributes.Savaites_dienos === null ||
                    event.attributes.Savaites_dienos === "" ||
                    event.attributes.Savaites_dienos === "nera" ||
                    diffInDays <= 1 ||
                    (event.attributes.Savaites_dienos.length > 1 &&
                      event.attributes.Savaites_dienos.length < 12)
                      ? eventStartDate +
                        " " +
                        eventStartTime +
                        "-" +
                        eventFinishTime
                      : eventStartDate +
                        " " +
                        eventStartTime +
                        " || " +
                        eventFinishDate +
                        " " +
                        eventFinishTime}
                  </EventDate>
                  <Circle />
                </ItemContent>
              </TimelineItem>
            );
          })}
      </TimelineContainer>
    </Wrapper>
  );
};

export default EventsTimeline;
