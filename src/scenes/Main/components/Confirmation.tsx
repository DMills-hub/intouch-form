import React from "react";
import { Icon } from "semantic-ui-react";
import styled from "styled-components";

interface ConfirmationProps {
  name: string;
}

const ConfirmationContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Confirmation = (props: ConfirmationProps) => {
  const { name } = props;
  return (
    <ConfirmationContainer>
      <Icon name="check circle" color="green" />
      <p>Thank you for signing up - {name}</p>
    </ConfirmationContainer>
  );
};

export default Confirmation;
