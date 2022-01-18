import { useState } from "react";
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
}) => {
  const { handleOpen, show } = useOpenClose();
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const lowerEvents =
    events.features &&
    events.features.map(
      (item) =>
        item.attributes.ORGANIZATORIUS &&
        item.attributes.ORGANIZATORIUS.toLowerCase()
    );

  // console.log("lowerEvents", lowerEvents);

  const weekday = [
    { day: "Pirmadienis", value: 0 },
    { day: "Antradienis", value: 1 },
    { day: "Treciadienis", value: 2 },
    { day: "Ketvirtadinis", value: 3 },
    { day: "Penktadienis", value: 4 },
    { day: "Sestadienis", value: 5 },
    { day: "Sekmadienis", value: 6 },
  ];

  const d = new Date();
  const day = d.getDay();
  console.log("day", day);

  // sutvarkyti ir renginio pabaiga data

  const handleChangeTest = (e) => {
    console.log("etargetvalue", e.target.value);
    console.log("etargetchecked", e.target.checked);
    const date = new Date();
    // console.log("newDate", date.setDate(date.getDate() + value));
    const formateDate = new Date(
      date.setDate(date.getDate() + Number(e.target.value - day + 1))
    );
    setAddNewFeature({
      ...addNewFeature,
      StartDay: formateDate,
    });
    if (addNewFeature.RENGINIO_PRADZIA === undefined) {
      setAddNewFeature({
        ...addNewFeature,
        RENGINIO_PRADZIA: formateDate,
      });
    } else {
      const newStartDate = new Date(addNewFeature.RENGINIO_PRADZIA);
      const newFinishDate = new Date(addNewFeature.RENGINIO_PABAIGA);
      console.log("newDate1111", newStartDate);

      // console.log("newDateTRyrrr", new Date(newDate.setDate(newDate.getDay())));
      const formatedStartDate = new Date(
        newStartDate.setDate(
          newStartDate.getDate() +
            Number(e.target.value - newStartDate.getDay() + 1)
        )
      );
      const formatedFinishDate = new Date(
        newFinishDate.setDate(
          newFinishDate.getDate() +
            Number(e.target.value - newFinishDate.getDay() + 1)
        )
      );
      console.log("formatedDate2", formatedStartDate);
      setAddNewFeature({
        ...addNewFeature,
        StartDay: formatedStartDate,
        FinishDay: formatedFinishDate,
      });
      // setAddNewFeature({
      //   ...addNewFeature,
      //   FinishDay: formatedFinishDate,
      // });
    }
    console.log("formateDate", formateDate);
  };

  function getSuggestions(value) {
    return lowerEvents.filter((language) =>
      language.startsWith(value.trim().toLowerCase())
    );
  }
  return (
    <div>
      {!show ? (
        <AddObjectButton>
          <span onClick={handleOpen}>Pridėti objektą</span>
        </AddObjectButton>
      ) : (
        <FormWrapper isEditing={isEditing}>
          <CloseImage src={CloseIcon} alt="close-icon" onClick={handleOpen} />
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
                <InputWrapper>
                  <InputField
                    type="text"
                    labelText="Pavadinimas"
                    id="pavadinimas"
                    placeholder="Pavadinimas"
                    required
                    handleChange={(e) => {
                      setAddNewFeature({
                        ...addNewFeature,
                        PAVADINIMAS: e.target.value,
                      });
                    }}
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
                  {/* <InputField
                    type="text"
                    labelText="Organizatorius"
                    id="organizatorius"
                    placeholder="Organizatorius"
                    required
                    handleChange={(e) => {
                      setAddNewFeature({
                        ...addNewFeature,
                        ORGANIZATORIUS: e.target.value,
                      });
                    }}
                  /> */}
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
                  <CheckBoxWrapper>
                    {weekday &&
                      weekday.map((item) => {
                        return (
                          <span key={item.value}>
                            {/* <label htmlFor="date">{item.day}</label> */}
                            <CheckBox
                              label={item.day}
                              id={item.value}
                              handleValue={handleChangeTest}
                              value={item.value}
                            />
                          </span>
                        );
                      })}
                  </CheckBoxWrapper>

                  <InputField
                    type="text"
                    labelText="Renginio puslapis"
                    id="puslapis"
                    placeholder="Renginio puslapis"
                    required
                    handleChange={(e) => {
                      setAddNewFeature({
                        ...addNewFeature,
                        WEBPAGE: e.target.value,
                      });
                    }}
                  />
                </InputWrapper>
                <ConfirmButton>PRIDĖTI RENGINĮ</ConfirmButton>
                <ConfirmButton handleClick={handleCancel}>
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
  );
};

export default AddEvent;
