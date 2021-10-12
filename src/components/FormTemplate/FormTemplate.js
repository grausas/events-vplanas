import { useState } from "react";

// styles
import { Wrapper } from "./FormTemplate.style";
// components
import { InputField, Button } from "../index";

const FormTemplate = ({ fields, handleSubmit, buttonName }) => {
  const [fieldValues, setFieldValues] = useState({});

  return (
    <Wrapper>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(fieldValues);
        }}
      >
        {fields.map((field) => (
          <InputField
            type={field.type}
            key={field.id}
            labelText={field.labelText}
            placeholder={field.placeholder}
            required={field.required}
            handleChange={(e) =>
              setFieldValues({ ...fieldValues, [field.id]: e.target.value })
            }
          />
        ))}
        <Button type="submit">{buttonName}</Button>
      </form>
    </Wrapper>
  );
};

export default FormTemplate;
