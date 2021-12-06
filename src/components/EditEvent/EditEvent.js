// styles
import { Wrapper, Button, ButtonsDiv } from "./EditEvent.style";
// components
import { InputField, DatePicker } from "../index";
//utils
import { CategoryData } from "../../utils/CategoryData";

const EditEvent = ({
  handleSubmit,
  handleDelete,
  setQueryPoint,
  queryPoint,
}) => {
  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <h3>Redaguoti renginį</h3>
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
          defaultValue={queryPoint.KATEGORIJA}
          handleChange={(e) => {
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
        <DatePicker
          timeTitle="Pradžios laikas"
          dateTitle="Pradžios data"
          selected={queryPoint.RENGINIO_PRADZIA}
          handleChange={(date, e) => {
            setQueryPoint({
              ...queryPoint,
              RENGINIO_PRADZIA: date,
            });
          }}
        />
        <DatePicker
          timeTitle="Pabaigos laikas"
          dateTitle="Pabaigos data"
          selected={queryPoint.RENGINIO_PABAIGA}
          handleChange={(date) => {
            setQueryPoint({
              ...queryPoint,
              RENGINIO_PABAIGA: date,
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
        <ButtonsDiv>
          <Button>Patvirtinti</Button>
          <Button handleClick={handleDelete} type="delete">
            Ištrinti
          </Button>
        </ButtonsDiv>
      </form>
    </Wrapper>
  );
};

export default EditEvent;
