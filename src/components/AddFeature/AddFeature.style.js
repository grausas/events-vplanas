import styled from "styled-components";

export const Close = styled.div`
  position: absolute;
  max-height: 600px;
  top: 2%;
  border-radius: 5px;
  right: 20px;
  padding: 5px 10px;
  background: var(--grey);
  color: var(--white);
  font-weight: 600;
  cursor: pointer;
`;

export const FormWrapper = styled.div`
  position: absolute;
  width: 350px;
  max-height: 600px;
  border-radius: 5px;
  top: 2%;
  right: 20px;
  background-color: var(--white);
  color: var(--dark);
  box-shadow: 0px 5px 60px 0px rgba(0, 0, 0, 0.25);
  padding: 20px;

  h3 {
    margin-bottom: 10px;
  }
`;

export const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
  text-align: left;
`;

export const CloseImage = styled.img`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 22px;
  height: 22px;
  border-radius: 5px;
  padding: 3px;
  cursor: pointer;
`;
