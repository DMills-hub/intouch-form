import styled from "styled-components";

const Button = styled.button<{
  bg: string;
  color: string;
  width?: string;
  disableHover?: boolean;
}>`
  border-radius: 5px;
  padding: 10px;
  background-color: ${(props) => props.bg};
  color: ${(props) => props.color};
  border: none;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  ${(props) =>
    !props.disableHover &&
    `&:hover {
    transform: scale(1.1);
  }`}

  margin: 5px;
  ${(props) => `width: ${props.width};` ?? ""}
`;

export default Button;
