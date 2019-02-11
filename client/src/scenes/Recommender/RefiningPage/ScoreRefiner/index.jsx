import React from 'react'
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  width: 100%;
`;

const flash = keyframes`
  from {
    background-color: #88D68F;
  }

  to {
    background-color: #DFE5EF;
  }
`;

const Question = styled.div.attrs(({shouldFlash}) => ({
  className: shouldFlash ? 'flash' : ''
}))`
  font-size: 14px;
  color: ${p => p.theme.primaryText};
  text-align: center;
  margin-bottom: 6px;

  > span {
    background: #DFE5EF;
    border-radius: 4px;
    padding: 1px 4px;
    font-weight: 700;
  }

  &.flash {
    > span {
      animation: ${flash} 1100ms ease-in-out;
    }
  }
`;

const Option = styled.div.attrs(({isSelected}) => ({
  className: isSelected ? 'selected' : ''
}))`
  position: relative;
  width: 20%;
  line-height: 14px;  
  cursor: pointer;

  & span {
    font-family: 'PT Serif', serif;
    font-weight: 400;
    font-style: italic;
    font-size: 13px;
    color: ${p => p.theme.primaryText};
    margin-top: -2px;
  }
`;

const OptionIcon = styled.div`
  background: #FFFFFF;
  width: 27px;
  height: 27px;
  border: 1px solid #C8CFE3;
  font-weight: 700;
  font-size: 14px;
  color: ${p => p.theme.primaryText};
  text-align: center;
  border-radius: 100px;
  line-height: 27px;
  margin: auto;
  position: relative;
  z-index: 2;
  transition: all 200ms ease-in-out;

  ${Option}:hover & {
    background: ${p => p.theme.fadedLightblue};
  }
  ${Option}.selected & {
    background: ${p => p.selectedBackgroundColor};
    color: ${p => p.selectedColor};
    border: 1px solid ${p => p.selectedBorderColor};
  }
`;

const OptionsContainer = styled.div`
  display: inline-flex;
  width: 100%;
`;

const ConnectingLine = styled.div`
  height: 1px;
  background-color: #C8CFE3;
  position: absolute;
  top: 13px;
  left: 0;
  right: 0;
  z-index: 0;

  ${Option}:first-child & {
    left: 50%
  }
  ${Option}:last-child & {
    right: 50%
  }
`;

const options = [
  {
    symbol: '--',
    value: -2,
    description: 'should be much lower',
    selectedColor: '#4a201f',
    selectedBackgroundColor: '#F17B7B',
    selectedBorderColor: '#DF7070'
  },
  {
    symbol: '-',
    value: -1,
    description: 'should be a bit lower',
    selectedColor: '#4a201f',
    selectedBackgroundColor: '#F17B7B',
    selectedBorderColor: '#DF7070'
  },
  {
    symbol: '=',
    value: 0,
    description: 'just right',
    selectedColor: '#ffffff',
    selectedBackgroundColor: '#2E71F0',
    selectedBorderColor: "#245FCF"
  },
  {
    symbol: '+',
    value: 1,
    description: 'should be a bit higher',
    selectedColor: '#0c5813',
    selectedBackgroundColor: '#88D68F',
    selectedBorderColor: '#62BE6A'
  },
  {
    symbol: '++',
    value: 2,
    description: 'should be much higher',
    selectedColor: '#0c5813',
    selectedBackgroundColor: '#88D68F',
    selectedBorderColor: '#62BE6A'
  },
]

class ScoreRefiner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldFlash: true,
      previousAspectName: ''
    }
  }

  static getDerivedStateFromProps(props, state) { 
    if (props.aspectName !== state.previousAspectName) {
      return { shouldFlash: true, previousAspectName: props.aspectName };
    }
    return null;
  }
  
  onRefinementOptionClick = (aspect, value) => () => {
    const { handleRefinementAction } = this.props;
    handleRefinementAction(aspect, value);
  }
  
  handleAnimationEnd = () => {
    this.setState({ shouldFlash: false });
  }

  render() {
    const { selectedValue, aspectName, aspectCodeName } = this.props;
    const { shouldFlash } = this.state;
    
    const renderedOptions = options.map((o, i) => 
      <Option key={i} isSelected={selectedValue === o.value} onClick={this.onRefinementOptionClick(aspectCodeName, o.value)}>
        <OptionIcon
          selectedColor={o.selectedColor}
          selectedBackgroundColor={o.selectedBackgroundColor}
          selectedBorderColor={o.selectedBorderColor}>
          {o.symbol}
        </OptionIcon>
        <ConnectingLine />
        <span>{o.description}</span>
      </Option>
    );

    return (
      <Container>
        <Question shouldFlash={shouldFlash}>
          How did you find the <span onAnimationEnd={this.handleAnimationEnd}>{aspectName}</span> aspect/score of the initial recommendations?
        </Question>
        <OptionsContainer>
          {renderedOptions}
        </OptionsContainer>
      </Container>
    );
  }
}

export default ScoreRefiner;