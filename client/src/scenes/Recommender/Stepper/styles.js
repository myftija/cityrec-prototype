import styled, { keyframes, css } from 'styled-components';
import icon from '../../../images/arrow.svg';

export const Container = styled.div.attrs({
  className: 'container-fluid stepper'
})`
  position: fixed;
  padding: 0 !important;
  bottom: 0;
  background-color: #FEFEFE;
  border-top: 1px solid #E0E5F2;
  text-align: center;
`;

export const StepContainer = styled.div`
  display: inline-flex;
  width: 100%;
`;

export const Icon = styled.span`
  width: 12px;
  height: 12px;
  mask: url(${icon}) no-repeat center center;
  mask-size: contain;
  background-color: ${p => p.theme.secondaryText};
  display: inline-block;
  margin: 0 0 -1px 3px;
  transition: all 200ms ease-in-out;
`;

const slide = keyframes`
  from {
    transform: translate(0px);
  }

  to {
    transform: translate(9px);
  }
`;

const animation = css`
  ${slide} 600ms ease-in-out infinite alternate;
`;

export const NextButton = styled.button.attrs(({ enabled, disabledMessage }) => ({
  'data-tip': enabled ? '' : disabledMessage
}))`
  background-color: transparent;
  outline: none;
  border: none;
  display: block;
  margin: 20px auto 4px;
  padding: 0;
  color: ${p => p.enabled ? p.theme.primary : `${p.theme.secondaryText}80`};
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2.8px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 200ms ease-in-out;

  &:hover, :focus, :active {
    outline: none;
  }

  & ${Icon} {
    background-color: ${p => p.enabled ? p.theme.primary : `${p.theme.secondaryText}80`};
    animation: ${p => p.enabled ? animation : 'none'};
  }
`;

export const CompletedMessage = styled.div`
  font-size: 14px;
  color: ${p => p.theme.primaryText};
  font-weight: 600;
  line-height: 21px;
  display: inline-block;
  margin: 20px auto 4px;
`;
