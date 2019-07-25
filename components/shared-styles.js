import styled from "styled-components";

export const Button = styled.button`
  background-color: #f7f7f7;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;

  &:focus {
    outline: none;
  }
`;

export const Input = styled.input`
  border-radius: 0.25rem;
  border: 1px solid darkgray;
  font-size: 0.75rem;
  margin-top: 0.25rem;
  padding: 0.25rem;
  width: 100%;
`;
