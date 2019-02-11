import React from 'react';
import { Container, StepContainer, NextButton, Icon } from './styles';
import ReactTooltip from 'react-tooltip';
import Step from './Step';

const Stepper = (props) => {
  const { steps, currentStep, nextStepEnabled } = props;

  const onNextClick = () => {
    if (nextStepEnabled) {
      steps[currentStep].onNextClick();
    }
  }

  const renderedSteps = steps.map((step, i) => {
    let stepState = "inactive";
    if (currentStep === i) {
      stepState = "active";
    } else if (currentStep > i) {
      stepState = "finished";
    }

    return (
      <Step key={i} name={step.name} state={stepState} />
    );
  });

  return (
    <Container>
      <ReactTooltip place="top" type="dark" effect="solid"/>
      <NextButton enabled={nextStepEnabled} disabledMessage={steps[currentStep].disabledMessage} onClick={onNextClick}>
        <span>{steps[currentStep].nextButtonText}</span>
        <Icon />
      </NextButton>
      <StepContainer>
        {renderedSteps}
      </StepContainer>
    </Container>
  );
}

export default Stepper;