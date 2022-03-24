import { useState } from "react";
// styles
import {
  Wrapper,
  Button,
  ButtonsDiv,
  CloseImage,
  DeleteImage,
} from "./EditEvent.style";
// components
import { InputField, DatePicker, ConfirmModal } from "../index";
//utils
import { CategoryData } from "../../utils/CategoryData";
// Icon
import CloseIcon from "../../assets/icons/close.png";
import DeleteIcon from "../../assets/icons/delete.svg";

const EditEvent = ({
  handleSubmit,
  handleDeleteConfirm,
  setQueryPoint,
  queryPoint,
  handleChange,
}) => {
  const [popup, setPopup] = useState({
    show: false,
  });

  const handleDelete = (id) => {
    setPopup({
      show: true,
    });
  };

  const handleDeleteFalse = () => {
    setPopup({
      show: false,
    });
  };

  const handleChangeStartTime = (date) => {
    const startDate = new Date(queryPoint.RENGINIO_PRADZIA);
    if (startDate) {
      const [month, day, year] = [
        startDate.getMonth(),
        startDate.getDate(),
        startDate.getFullYear(),
      ];
      if (date && startDate) {
        const [hours, minutes] = [date.getHours(), date.getMinutes()];
        const newDate = new Date(date.setFullYear(year, [month], [day]));
        newDate.setHours(hours, [minutes]);
        setQueryPoint({
          ...queryPoint,
          RENGINIO_PRADZIA: newDate,
        });
      }
    } else {
      setQueryPoint({
        ...queryPoint,
        RENGINIO_PRADZIA: date,
      });
    }
  };
  const handleChangeFinishTime = (date) => {
    const finishDate = new Date(queryPoint.RENGINIO_PRADZIA);
    if (finishDate) {
      const [month, day, year] = [
        finishDate.getMonth(),
        finishDate.getDate(),
        finishDate.getFullYear(),
      ];
      if (date) {
        const [hours, minutes] = [date.getHours(), date.getMinutes()];
        const newDate = new Date(date.setFullYear(year, [month], [day]));
        newDate.setHours(hours, [minutes]);
        setQueryPoint({
          ...queryPoint,
          RENGINIO_PABAIGA: newDate,
        });
      }
    } else {
      setQueryPoint({
        ...queryPoint,
        RENGINIO_PABAIGA: date,
      });
    }
  };

  const result = CategoryData.find(
    ({ id }) => id === Number(queryPoint.KATEGORIJA)
  );

  return (
    <>
      {!popup.show ? (
        <Wrapper>
          <CloseImage src={CloseIcon} alt="close-icon" onClick={handleChange} />
          <h3>Redaguoti renginį</h3>
          <form>
            <DatePicker
              height="small"
              timeTitle="Pradžios laikas"
              dateTitle="Pradžios data"
              selected={queryPoint.RENGINIO_PRADZIA}
              handleChange={(date) => {
                setQueryPoint({
                  ...queryPoint,
                  RENGINIO_PRADZIA: date,
                });
              }}
              handleChangeTime={handleChangeStartTime}
            />
            <DatePicker
              height="small"
              timeTitle="Pabaigos laikas"
              dateTitle="Pabaigos data"
              selected={queryPoint.RENGINIO_PABAIGA}
              handleChange={(date) => {
                setQueryPoint({
                  ...queryPoint,
                  RENGINIO_PABAIGA: date,
                });
              }}
              handleChangeTime={handleChangeFinishTime}
            />
            <InputField
              type="text"
              labelText="Pavadinimas"
              defaultValue={queryPoint.PAVADINIMAS}
              handleChange={(e) => {
                setQueryPoint({
                  ...queryPoint,
                  PAVADINIMAS: e.target.value,
                });
              }}
            />
            <InputField
              type="text"
              labelText="Organizatorius"
              defaultValue={queryPoint.ORGANIZATORIUS}
              handleChange={(e) => {
                setQueryPoint({
                  ...queryPoint,
                  ORGANIZATORIUS: e.target.value,
                });
              }}
            />
            <InputField
              type="dropdown"
              options={CategoryData}
              labelText="Kategorija"
              defaultValue={result.value && result.value}
              handleChange={(e) => {
                console.log(e.target.value);
                setQueryPoint({
                  ...queryPoint,
                  KATEGORIJA: e.target.value,
                });
              }}
            />
            <InputField
              type="longtext"
              labelText="Pastabos"
              defaultValue={queryPoint.PASTABOS}
              handleChange={(e) => {
                setQueryPoint({
                  ...queryPoint,
                  PASTABOS: e.target.value,
                });
              }}
            />
            <InputField
              type="longtext"
              labelText="Aprašymas"
              defaultValue={queryPoint.APRASYMAS}
              handleChange={(e) => {
                setQueryPoint({
                  ...queryPoint,
                  APRASYMAS: e.target.value,
                });
              }}
            />

            <InputField
              type="text"
              labelText="Renginio puslapis"
              defaultValue={queryPoint.WEBPAGE}
              handleChange={(e) => {
                setQueryPoint({
                  ...queryPoint,
                  WEBPAGE: e.target.value,
                });
              }}
            />
          </form>
          <ButtonsDiv>
            <Button handleClick={handleSubmit}>ATNAUJINTI</Button>
            <Button handleClick={handleDelete}>
              <DeleteImage src={DeleteIcon} alt="delete-icon" />
              IŠTRINTI
            </Button>
          </ButtonsDiv>
        </Wrapper>
      ) : (
        popup.show && (
          <ConfirmModal
            text={`Ar tikrai norite ištrinti renginį "${queryPoint.PAVADINIMAS}"?`}
            confirmText="IŠTRINTI"
            cancelText="ATŠAUKTI"
            handleCancel={handleDeleteFalse}
            handleSubmit={handleDeleteConfirm}
          />
        )
      )}
    </>
  );
};

export default EditEvent;
