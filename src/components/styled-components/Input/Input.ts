import styled from "styled-components";

const Input = styled.input<{ width?: number }>`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid lightgrey;
  margin: 5px;
  ${(props) => props.width && `width: ${props.width}px;`}
  :focus {
    outline-color: lightblue;
  }
`;

export default Input;
