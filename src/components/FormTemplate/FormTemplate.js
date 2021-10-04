import { useState } from "react";

// Styles
import { Wrapper, InputWrapper } from "./FormTemplate.style";

// components
import InputField from "../InputField/InputField";

const AddFeature = ({ fields, callback, buttonText }) => {
  const [fieldValues, setFieldValues] = useState({});

  return (
    <Wrapper>
      <h3>Pridėti renginį</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          callback(fieldValues);
        }}
      >
        {fields &&
          fields.map((field) => (
            <InputWrapper key={field.name}>
              <InputField
                inputId={field.name}
                type={field.type}
                key={field.name}
                IconClassName={field.IconClassName}
                name={field.name}
                labelText={field.labelText}
                placeholder={field.placeholder}
                required={field.required}
                minLength={field.minLength}
                maxLength={field.maxLength}
                handleChange={(e) =>
                  setFieldValues({
                    ...fieldValues,
                    [field.name]: e.target.value.split(" ").join(""),
                  })
                }
              />
            </InputWrapper>
          ))}
        <button type="submit">{buttonText}</button>
      </form>
    </Wrapper>
  );
};

export default AddFeature;
