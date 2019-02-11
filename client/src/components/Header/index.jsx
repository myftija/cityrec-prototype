import React from 'react';
import styled from 'styled-components';
import logo from './logo.svg';
import logoInverted from './logo_inverted.svg';

const Container = styled.div.attrs({
  className: 'container-fluid'
})`
  padding: 15px;
`;

const Logo = styled.img.attrs(({ inverted }) => ({
  src: inverted ? logoInverted : logo
}))`
  margin: auto;
  display: block;
  cursor: pointer;
`;

const Header = props => {
  const { inverted, history, location } = props;

  const onLogoClick = () => {
    if (location.pathname.startsWith('/itupferl')) {
      history.push(`/itupferl/${location.search}`);
    } else {
      history.push(`/${location.search}`);
    }
  }

  return (
    <Container>
      <Logo inverted={inverted} onClick={onLogoClick} />
    </Container>
  );
}

export default Header;