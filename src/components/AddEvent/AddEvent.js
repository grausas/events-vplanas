import { useState } from "react";

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
  titleText,
  buttonTitle,
  buttonTitleCancel,
  spanText,
  buttonText,
  isEditing,
  handleUpdate,
  handleCancel,
  setAddNewFeature,
  addNewFeature,
  startDate,
}) => {
  const { handleOpen, show } = useOpenClose();

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
                Redaguoti objektą
              </ConfirmButton>
              <form onSubmit={handleSubmit}>
                <h3>{titleText}</h3>
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
                  <InputField
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
                <ConfirmButton>{buttonText}</ConfirmButton>
                <ConfirmButton handleClick={handleCancel}>
                  {buttonTitleCancel}
                </ConfirmButton>
              </form>
            </>
          ) : (
            <>
              <p>{spanText}</p>
              <ConfirmButton handleClick={handleCordinates}>
                {buttonTitle}
              </ConfirmButton>
            </>
          )}
        </FormWrapper>
      )}
    </div>
  );
};

export default AddEvent;
