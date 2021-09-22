import React, { useCallback } from "react";
import styled from "styled-components";
import { keyRegex } from "util/regex";
import { Header } from "semantic-ui-react";
import Button from "components/styled-components/Button";

interface DetailsProps {
  data: { [key: string]: any };
  onConfirm: () => void;
}

const DetailsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

const Details = (props: DetailsProps) => {
  const { data, onConfirm } = props;

  const formatData = useCallback((value: any) => {
    if (typeof value.getMonth === "function") {
      const date = value as Date;
      return date.toLocaleDateString();
    }
    return value;
  }, []);

  const formatKey = useCallback((key: string) => {
    const result = key.replace(keyRegex, " $1");
    const formattedKey = result.charAt(0).toUpperCase() + result.slice(1);
    return formattedKey;
  }, []);

  return (
    <DetailsContainer>
      <Header>User Details</Header>
      {Object.keys(data).map((key) => {
        return (
          <p>
            {formatKey(key)}: {formatData(data[key])}
          </p>
        );
      })}
      <Button onClick={onConfirm} bg="orange" color="white">
        Confirm
      </Button>
    </DetailsContainer>
  );
};

export default Details;
