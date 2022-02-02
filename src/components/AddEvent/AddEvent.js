import { useState, useEffect } from "react";
import AutoSuggest from "react-autosuggest";
// Styles
import {
  AddObjectButton,
  FormWrapper,
  InputWrapper,
  CloseImage,
  ConfirmButton,
  CheckBoxWrapper,
} from "./AddEvent.style";
// hooks
import { useOpenClose } from "../../hooks/useOpenClose";
//icons
import CloseIcon from "../../assets/icons/close.png";
// components
import { InputField, DatePicker, CheckBox } from "../index";
//utils
import { CategoryData } from "../../utils/CategoryData";

const AddEvent = ({
  handleSubmit,
  handleCordinates,
  isEditing,
  handleUpdate,
  handleCancel,
  setAddNewFeature,
  addNewFeature,
  startDate,
  events,
  isLoggedIn,
}) => {
  const { handleOpen, show } = useOpenClose();
  const [value, setValue] = useState("");
  const [valueName, setValueName] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsName, setSuggestionsName] = useState([]);
  const [startDateArr, setStartDateArr] = useState([]);
  const [weekDayArr, setweekDayArr] = useState([]);

  const lowerEvents =
    events.features &&
    events.features.map(
      (item) =>
        item.attributes.ORGANIZATORIUS &&
        item.attributes.ORGANIZATORIUS.toLowerCase()
    );

  const lowerEventsName =
    events.features &&
    events.features.map(
      (item) =>
        item.attributes.PAVADINIMAS && item.attributes.PAVADINIMAS.toLowerCase()
    );

  const weekday = [
    { day: "Pirmadienis", value: 1 },
    { day: "Antradienis", value: 2 },
    { day: "Trečiadienis", value: 3 },
    { day: "Ketvirtadienis", value: 4 },
    { day: "Penktadienis", value: 5 },
    { day: "Šeštadienis", value: 6 },
    { day: "Sekmadienis", value: 0 },
  ];

  const d = new Date();
  const day = d.getDay();

  console.log("addNewFeature", addNewFeature);
  console.log("weekDayArr", weekDayArr);

  // get all days between two dates
  function getDates(startDate, endDate) {
    const dates = [];
    let currentDate = startDate;
    const addDays = function (days) {
      const date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  }

  const handleChangeTest = (e) => {
    var itemValue = Number(e.target.value);
    var isChecked = e.target.checked;

    const dates = getDates(
      new Date(addNewFeature.RENGINIO_PRADZIA),
      new Date(addNewFeature.RENGINIO_PABAIGA)
    );

    dates.map((date) => {
      if (date.getDay() === itemValue && isChecked) {
        console.log(date);
        return setStartDateArr([
          ...startDateArr,
          {
            id: itemValue,
            StartDay: date,
          },
        ]);
      } else if (!isChecked) {
        let filteredArray = startDateArr.filter(
          (item) => item.id !== itemValue
        );
        return setStartDateArr(filteredArray);
      } else {
        return null;
      }
    });
    //-----------------------------
    //   var itemValue = Number(e.target.value);
    //   var isChecked = e.target.checked;

    //   const date = new Date();
    //   const formateDate = new Date(
    //     date.setDate(date.getDate() + Number(e.target.value - day + 1))
    //   );

    //   console.log("formateDate", formateDate);

    //   if (isChecked) {
    //     setweekDayArr([...weekDayArr, itemValue]);
    //     // setAddNewFeature({
    //     //   ...addNewFeature,
    //     //   Savaites_dienos: weekDayArr.toString(),
    //     // });
    //     if (addNewFeature.RENGINIO_PRADZIA === undefined) {
    //       setAddNewFeature({
    //         ...addNewFeature,
    //         RENGINIO_PRADZIA: formateDate,
    //         RENGINIO_PABAIGA: formateDate,
    //         Savaites_dienos: weekDayArr.toString(),
    //       });
    //     } else {
    //       const newStartDate = new Date(addNewFeature.RENGINIO_PRADZIA);
    //       const newFinishDate = new Date(addNewFeature.RENGINIO_PABAIGA);

    //       console.log("newStartDate", newStartDate);
    //       console.log("newFinishDate", newFinishDate);

    //       const formatedStartDate = new Date(
    //         newStartDate.setDate(
    //           newStartDate.getDate() +
    //             Number(e.target.value - newStartDate.getDay() + 1)
    //         )
    //       );

    //       console.log("formatedStartDate", formatedStartDate);
    //       const formatedFinishDate = new Date(
    //         newFinishDate.setDate(
    //           newFinishDate.getDate() +
    //             Number(e.target.value - newFinishDate.getDay() + 1)
    //         )
    //       );
    //       console.log("formatedFinishDate", formatedFinishDate);

    //       // while (formatedStartDate < formatedFinishDate) {
    //       //   if (formatedStartDate.getDay() === itemValue) {
    //       //     numberOfDates++;
    //       //     console.log("numberOfDates", numberOfDates);
    //       //   }
    //       //   formatedStartDate.setDate(formatedStartDate.getDate() + 1);
    //       // }
    //       if (
    //         formatedStartDate.getDate() !==
    //         addNewFeature.RENGINIO_PRADZIA.getDate()
    //       ) {
    //         setStartDateArr([
    //           ...startDateArr,
    //           {
    //             id: itemValue,
    //             StartDay: formatedStartDate,
    //             FinishDay: formatedFinishDate,
    //           },
    //         ]);
    //       }
    //     }
    //   } else if (!isChecked) {
    //     let filteredArray = startDateArr.filter((item) => item.id !== itemValue);
    //     let filteredWeekDayArr = weekDayArr.filter((item) => item !== itemValue);
    //     setStartDateArr(filteredArray);
    //     setweekDayArr(filteredWeekDayArr);
    //   }
  };

  useEffect(() => {
    setAddNewFeature({
      ...addNewFeature,
      startDateArr,
      Savaites_dienos: weekDayArr.toString(),
    });
  }, [startDateArr]);

  // suggestion organization
  const uniqueEvents = [...new Set(lowerEvents)];
  function getSuggestions(value) {
    return uniqueEvents.filter((language) =>
      language.startsWith(value.trim().toLowerCase())
    );
  }
  // suggestion name
  const uniqueEventsName = [...new Set(lowerEventsName)];

  function getSuggestionsName(value) {
    return uniqueEventsName.filter((language) =>
      language.startsWith(value.trim().toLowerCase())
    );
  }
  return (
    <>
      {isLoggedIn && (
        <div>
          {!show ? (
            <AddObjectButton>
              <span onClick={handleOpen}>Pridėti objektą</span>
            </AddObjectButton>
          ) : (
            <FormWrapper isEditing={isEditing}>
              <CloseImage
                src={CloseIcon}
                alt="close-icon"
                onClick={handleOpen}
              />
              {!isEditing ? (
                <>
                  <ConfirmButton
                    handleClick={() => {
                      handleUpdate();
                    }}
                  >
                    REDAGUOTI OBJEKTĄ
                  </ConfirmButton>
                  <form onSubmit={handleSubmit}>
                    <h3>Pridėti renginį</h3>
                    <DatePicker
                      placeholderTextDate="Data"
                      placeholderTextTime="Laikas"
                      timeTitle="Pradžios laikas"
                      dateTitle="Pradžios data"
                      required
                      selected={
                        addNewFeature.RENGINIO_PRADZIA !== undefined
                          ? addNewFeature.RENGINIO_PRADZIA
                          : startDate
                      }
                      handleChange={(date) => {
                        setAddNewFeature({
                          ...addNewFeature,
                          RENGINIO_PRADZIA: date,
                        });
                      }}
                    />
                    <DatePicker
                      placeholderTextDate="Data"
                      placeholderTextTime="Laikas"
                      timeTitle="Pabaigos laikas"
                      dateTitle="Pabaigos data"
                      required
                      selected={
                        addNewFeature.RENGINIO_PABAIGA !== undefined
                          ? addNewFeature.RENGINIO_PABAIGA
                          : startDate
                      }
                      handleChange={(date) => {
                        setAddNewFeature({
                          ...addNewFeature,
                          RENGINIO_PABAIGA: date,
                        });
                      }}
                    />
                    <CheckBoxWrapper onChange={handleChangeTest}>
                      {weekday &&
                        weekday.map((item) => {
                          return (
                            <span key={item.value}>
                              <CheckBox
                                label={item.day}
                                id={item.value}
                                value={item.value}
                              />
                            </span>
                          );
                        })}
                    </CheckBoxWrapper>
                    <InputWrapper>
                      <span>Pavadinimas</span>
                      <AutoSuggest
                        suggestions={suggestionsName}
                        onSuggestionsClearRequested={() =>
                          setSuggestionsName([])
                        }
                        onSuggestionsFetchRequested={({ value }) => {
                          setValueName(value);
                          setSuggestionsName(getSuggestionsName(value));
                        }}
                        getSuggestionValue={(suggestionsName) =>
                          suggestionsName
                        }
                        renderSuggestion={(suggestionsName) => (
                          <span>{suggestionsName}</span>
                        )}
                        inputProps={{
                          placeholder: "Pavadinimas",
                          value: valueName,
                          onChange: (_, { newValue }) => {
                            setValueName(newValue);
                            setAddNewFeature({
                              ...addNewFeature,
                              PAVADINIMAS: newValue,
                            });
                          },
                        }}
                        highlightFirstSuggestion={true}
                      />
                      <span>Organizatorius</span>
                      <AutoSuggest
                        suggestions={suggestions}
                        onSuggestionsClearRequested={() => setSuggestions([])}
                        onSuggestionsFetchRequested={({ value }) => {
                          setValue(value);
                          setSuggestions(getSuggestions(value));
                        }}
                        getSuggestionValue={(suggestion) => suggestion}
                        renderSuggestion={(suggestion) => (
                          <span>{suggestion}</span>
                        )}
                        inputProps={{
                          placeholder: "Organizatorius",
                          value: value,
                          onChange: (_, { newValue }) => {
                            setValue(newValue);
                            setAddNewFeature({
                              ...addNewFeature,
                              ORGANIZATORIUS: newValue,
                            });
                          },
                        }}
                        highlightFirstSuggestion={true}
                      />
                      <InputField
                        options={CategoryData}
                        type="dropdown"
                        labelText="Kategorija"
                        id="kategorija"
                        placeholder="Kategorija"
                        required
                        handleChange={(e) => {
                          setAddNewFeature({
                            ...addNewFeature,
                            KATEGORIJA: e.target.value,
                          });
                        }}
                      />

                      <InputField
                        type="longtext"
                        labelText="Pastabos"
                        placeholder="Pastabos"
                        id="pastabos"
                        handleChange={(e) => {
                          setAddNewFeature({
                            ...addNewFeature,
                            PASTABOS: e.target.value,
                          });
                        }}
                      />
                      <InputField
                        type="longtext"
                        labelText="Aprašymas"
                        placeholder="Aprašymas"
                        id="aprasymas"
                        handleChange={(e) => {
                          setAddNewFeature({
                            ...addNewFeature,
                            APRASYMAS: e.target.value,
                          });
                        }}
                      />
                      <InputField
                        type="text"
                        labelText="Renginio puslapis"
                        id="puslapis"
                        placeholder="Renginio puslapis"
                        handleChange={(e) => {
                          setAddNewFeature({
                            ...addNewFeature,
                            WEBPAGE: e.target.value,
                          });
                        }}
                      />
                    </InputWrapper>
                    <ConfirmButton>PRIDĖTI RENGINĮ</ConfirmButton>
                    <ConfirmButton
                      handleClick={() => {
                        handleCancel();
                        setStartDateArr([]);
                      }}
                    >
                      ATŠAUKTI
                    </ConfirmButton>
                  </form>
                </>
              ) : (
                <>
                  <p>
                    {addNewFeature.geometry === undefined
                      ? "Pasirinkite pridėti objektą"
                      : "Užpildykite objekto duomenis"}
                  </p>
                  <ConfirmButton handleClick={handleCordinates}>
                    {addNewFeature.geometry === undefined
                      ? "Pridėti objektą"
                      : "Pildyti"}
                  </ConfirmButton>
                </>
              )}
            </FormWrapper>
          )}
        </div>
      )}
    </>
  );
};

export default AddEvent;
