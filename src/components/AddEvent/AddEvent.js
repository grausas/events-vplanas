import { useState, useEffect, useCallback } from "react";
import AutoSuggest from "react-autosuggest";
// Styles
import {
  AddObjectButton,
  FormWrapper,
  InputWrapper,
  CloseImage,
  ConfirmButton,
  CheckBoxWrapper,
  ClearButton,
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
  isEditing,
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
  const [weekDayArr, setWeekDayArr] = useState([]);

  const weekday = [
    { day: "Pirmadienis", value: 1 },
    { day: "Antradienis", value: 2 },
    { day: "Trečiadienis", value: 3 },
    { day: "Ketvirtadienis", value: 4 },
    { day: "Penktadienis", value: 5 },
    { day: "Šeštadienis", value: 6 },
    { day: "Sekmadienis", value: 0 },
  ];

  // Clicked checkboxes add to array
  const [checkedItems, setCheckeditems] = useState(weekday);
  const handleOnChange = useCallback(
    (e) => {
      const index = e.target.name;
      let items = [...checkedItems];
      items[index].isChecked = e.target.checked;
      setCheckeditems(items);
    },
    [checkedItems]
  );
  // Clear all checkboxes
  const handleClearCheckbox = () => {
    let items = [...checkedItems];
    items.map((item) => {
      if (item.isChecked === true) {
        return (item.isChecked = false);
      } else return null;
    });
    setCheckeditems(items);
  };

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

  //
  const handleWeekdays = (e) => {
    var itemValue = Number(e.target.value);
    var isChecked = e.target.checked;

    const dates = getDates(
      new Date(addNewFeature.RENGINIO_PRADZIA),
      new Date(addNewFeature.RENGINIO_PABAIGA)
    );

    const finishDayTime = new Date(addNewFeature.RENGINIO_PABAIGA);
    const hours = finishDayTime.getHours();
    const minutes = finishDayTime.getMinutes();

    dates.map((date) => {
      if (date.getDay() === itemValue && isChecked) {
        const finishDay = new Date(new Date(date).setHours(hours, minutes));
        return (
          setWeekDayArr([...weekDayArr, itemValue]),
          startDateArr.push({
            id: itemValue,
            startDay: date,
            finishDay: finishDay,
          })
        );
      } else if (!isChecked) {
        let filteredArray = startDateArr.filter(
          (item) => item.id !== itemValue
        );
        let filteredWeekDayArr = weekDayArr.filter(
          (item) => item !== itemValue
        );
        return (
          setStartDateArr(filteredArray), setWeekDayArr(filteredWeekDayArr)
        );
      } else {
        return null;
      }
    });
  };

  // sort string Savaites_dienos
  useEffect(() => {
    setAddNewFeature({
      ...addNewFeature,
      startDateArr,
      Savaites_dienos: weekDayArr.sort((a, b) => a - b).toString(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDateArr, weekDayArr]);

  // suggestion organization
  const lowerEvents =
    events.features &&
    events.features.map((item) => item.attributes.ORGANIZATORIUS);

  const uniqueEvents = [...new Set(lowerEvents)];
  function getSuggestions(value) {
    return uniqueEvents.filter(
      (language) => language.toLowerCase().indexOf(value.toLowerCase()) >= 0
    );
  }
  // suggestion name
  const lowerEventsName =
    events.features &&
    events.features.map((item) => item.attributes.PAVADINIMAS);

  const uniqueEventsName = [...new Set(lowerEventsName)];
  function getSuggestionsName(value) {
    return uniqueEventsName.filter(
      (language) => language.toLowerCase().indexOf(value.toLowerCase()) >= 0
    );
  }

  const handleChangeStartTime = (date) => {
    if (addNewFeature.RENGINIO_PRADZIA) {
      const [month, day, year] = [
        addNewFeature.RENGINIO_PRADZIA.getMonth(),
        addNewFeature.RENGINIO_PRADZIA.getDate(),
        addNewFeature.RENGINIO_PRADZIA.getFullYear(),
      ];
      if (date && addNewFeature.RENGINIO_PRADZIA) {
        const [hours, minutes] = [date.getHours(), date.getMinutes()];
        const newDate = new Date(date.setFullYear(year, [month], [day]));
        newDate.setHours(hours, [minutes]);
        setAddNewFeature({
          ...addNewFeature,
          RENGINIO_PRADZIA: newDate,
        });
      }
    } else {
      setAddNewFeature({
        ...addNewFeature,
        RENGINIO_PRADZIA: date,
      });
    }
  };
  const handleChangeFinishTime = (date) => {
    if (addNewFeature.RENGINIO_PABAIGA) {
      const [month, day, year] = [
        addNewFeature.RENGINIO_PABAIGA.getMonth(),
        addNewFeature.RENGINIO_PABAIGA.getDate(),
        addNewFeature.RENGINIO_PABAIGA.getFullYear(),
      ];
      if (date) {
        const [hours, minutes] = [date.getHours(), date.getMinutes()];
        const newDate = new Date(date.setFullYear(year, [month], [day]));
        newDate.setHours(hours, [minutes]);
        setAddNewFeature({
          ...addNewFeature,
          RENGINIO_PABAIGA: newDate,
        });
      }
    } else {
      setAddNewFeature({
        ...addNewFeature,
        RENGINIO_PABAIGA: date,
      });
    }
  };

  const handleAddFormSubmit = (e) => {
    handleSubmit(e);
    setStartDateArr([]);
    setWeekDayArr([]);
    handleClearCheckbox();
    setValueName("");
    setValue("");
    handleOpen();
  };

  const handleClearButton = () => {
    handleCancel();
    setStartDateArr([]);
    handleOpen();
  };

  return isLoggedIn ? (
    <>
      <AddObjectButton>
        {addNewFeature.geometry && addNewFeature.geometry.length > 0 ? (
          <span onClick={handleOpen}>Užpildykite duomenis</span>
        ) : (
          <span>Nubraižykite objektą</span>
        )}
      </AddObjectButton>
      {show && (
        <FormWrapper isEditing={isEditing}>
          <CloseImage src={CloseIcon} alt="close-icon" onClick={handleOpen} />
          <>
            <form onSubmit={handleAddFormSubmit}>
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
                handleChangeTime={handleChangeStartTime}
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
                handleChangeTime={handleChangeFinishTime}
              />
              <CheckBoxWrapper onChange={handleWeekdays}>
                {checkedItems &&
                  checkedItems.map((item, index) => {
                    return (
                      <span key={index}>
                        <CheckBox
                          type="checkbox"
                          name={index}
                          color="primary"
                          label={item.day}
                          id={item.value}
                          value={item.value}
                          checked={item.isChecked}
                          handleCheckboxChange={handleOnChange}
                        />
                      </span>
                    );
                  })}
              </CheckBoxWrapper>
              <InputWrapper>
                <span>Pavadinimas</span>
                <AutoSuggest
                  suggestions={suggestionsName.slice(0, 8)}
                  onSuggestionsClearRequested={() => setSuggestionsName([])}
                  onSuggestionsFetchRequested={({ value }) => {
                    setValueName(value);
                    setSuggestionsName(getSuggestionsName(value));
                  }}
                  getSuggestionValue={(suggestionsName) => suggestionsName}
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
                  suggestions={suggestions.slice(0, 8)}
                  onSuggestionsClearRequested={() => setSuggestions([])}
                  onSuggestionsFetchRequested={({ value }) => {
                    setValue(value);
                    setSuggestions(getSuggestions(value));
                  }}
                  getSuggestionValue={(suggestion) => suggestion}
                  renderSuggestion={(suggestion) => <span>{suggestion}</span>}
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
              <ConfirmButton type="submit">PRIDĖTI RENGINĮ</ConfirmButton>
              <ClearButton type="reset" handleClick={handleClearButton}>
                ATŠAUKTI
              </ClearButton>
            </form>
          </>
        </FormWrapper>
      )}
    </>
  ) : null;
};

export default AddEvent;
