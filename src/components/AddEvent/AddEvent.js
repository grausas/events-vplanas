import { useState } from "react";
import AutoSuggest from "react-autosuggest";
// Styles
import {
  AddObjectButton,
  FormWrapper,
  InputWrapper,
  CloseImage,
  ConfirmButton,
} from "./AddEvent.style";
// hooks
import { useOpenClose } from "../../hooks/useOpenClose";
//icons
import CloseIcon from "../../assets/icons/close.png";
// components
import { InputField, DatePicker } from "../index";
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

  console.log("lowerEvents", lowerEvents);

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
  const day = (d.getDay(), 2);
  if (day !== 1) d.setHours(-24 * (day - 1));
  console.log(day);

  const handleChangeTest = (e) => {
    console.log(e.target.value);
    const date = new Date();
    // console.log("newDate", date.setDate(date.getDate() + value));
    const formateDate = date.setDate(
      date.getDate() + Number(e.target.value - day)
    );
    console.log("formateDate", new Date(formateDate));
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
                      placeholder: "Pavadinimas",
                      value: value,
                      onChange: (_, { newValue }) => {
                        setValue(newValue);
                        setAddNewFeature({
                          ...addNewFeature,
                          PAVADINIMAS: newValue,
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
                  {weekday &&
                    weekday.map((item) => {
                      return (
                        <span key={item.value}>
                          {console.log(item)}
                          <label htmlFor="date">{item.day}</label>
                          <input
                            type="checkbox"
                            id="date"
                            defaultChecked={item.value === day ? "checked" : ""}
                            onChange={handleChangeTest}
                            value={item.value}
                          />
                        </span>
                      );
                    })}

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
