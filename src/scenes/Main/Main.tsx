import React, { useCallback, useState } from "react";
import { Breadcrumb } from "semantic-ui-react";
import styled from "styled-components";
import StepOneForm from "./components/StepOneForm";
import StepTwoForm from "./components/StepTwoForm";
import Details from "./components/Details";
import { FieldValues } from "react-hook-form";
import Card from "components/styled-components/Card";
import Confirmation from "./components/Confirmation";

const MainContainer = styled.div`
  height: 100%;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: auto;
`;

const BreadCrumbContainer = styled.div`
  margin-top: 10px;
`;

const StyledCard = styled(Card)`
  min-width: 400px;

  @media (max-width: 425px) {
    min-width: 80%;
  }
`;

type CurrentBreadcrumb = "stepOne" | "stepTwo" | "details" | "confirmation";

const Main = () => {
  const [data, setData] = useState<{ [key: string]: any }>({});
  const [currentBreadcrumb, setCurrentBreadcrumb] =
    useState<CurrentBreadcrumb>("stepOne");

  const onSubmit = useCallback(
    (values: FieldValues) => {
      setData((prevState) => ({ ...prevState, ...values }));
      switch (currentBreadcrumb) {
        case "stepOne":
          setCurrentBreadcrumb("stepTwo");
          return;
        case "stepTwo":
          setCurrentBreadcrumb("details");
          return;
        case "details":
          setCurrentBreadcrumb("confirmation");
          return;
        default:
          return;
      }
    },
    [setData, currentBreadcrumb, setCurrentBreadcrumb]
  );

  const isActiveBreadcrumb = useCallback(
    (breadCrumb: CurrentBreadcrumb) => {
      return currentBreadcrumb === breadCrumb;
    },
    [currentBreadcrumb]
  );

  const onChangeBreadcrumb = useCallback(
    (newBreadCrumb: CurrentBreadcrumb) => {
      setCurrentBreadcrumb((prevState) => {
        if (newBreadCrumb === "stepOne") return newBreadCrumb;
        if (newBreadCrumb === "stepTwo" && Object.keys(data).length >= 2) {
          return newBreadCrumb;
        }
        if (newBreadCrumb === "details" && Object.keys(data).length === 4) {
          return newBreadCrumb;
        }
        return prevState;
      });
    },
    [setCurrentBreadcrumb, data]
  );

  return (
    <MainContainer>
      <FormContainer>
        <StyledCard>
          {isActiveBreadcrumb("stepOne") && (
            <StepOneForm
              defaultValues={{ name: data.name, phoneNumber: data.phoneNumber }}
              onSubmit={onSubmit}
            />
          )}
          {isActiveBreadcrumb("stepTwo") && (
            <StepTwoForm
              defaultValues={{
                email: data.email,
                dateOfBirth: data.dateOfBirth,
              }}
              onSubmit={onSubmit}
            />
          )}
          {isActiveBreadcrumb("details") && (
            <Details onConfirm={() => onSubmit({})} data={data} />
          )}
          {isActiveBreadcrumb("confirmation") && (
            <Confirmation name={data.name ?? "Unknown"} />
          )}
        </StyledCard>
        <BreadCrumbContainer>
          <Breadcrumb>
            <Breadcrumb.Section
              active={isActiveBreadcrumb("stepOne")}
              link={!isActiveBreadcrumb("stepOne")}
              onClick={() => onChangeBreadcrumb("stepOne")}
            >
              Step 1
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon="right chevron" />
            <Breadcrumb.Section
              active={isActiveBreadcrumb("stepTwo")}
              link={!isActiveBreadcrumb("stepTwo")}
              onClick={() => onChangeBreadcrumb("stepTwo")}
            >
              Step 2
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon="right chevron" />
            <Breadcrumb.Section
              active={isActiveBreadcrumb("details")}
              link={!isActiveBreadcrumb("details")}
              onClick={() => onChangeBreadcrumb("details")}
            >
              Details
            </Breadcrumb.Section>
            <Breadcrumb.Divider icon="right chevron" />
            <Breadcrumb.Section
              active={isActiveBreadcrumb("confirmation")}
              link={!isActiveBreadcrumb("confirmation")}
            >
              Confirmation
            </Breadcrumb.Section>
          </Breadcrumb>
        </BreadCrumbContainer>
      </FormContainer>
    </MainContainer>
  );
};

export default Main;
