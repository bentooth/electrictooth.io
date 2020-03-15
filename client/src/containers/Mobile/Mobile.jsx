import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Switch, Redirect, withRouter, Route } from 'react-router-dom';

import Blog from 'containers/Blog';
import Music from 'containers/Music';

import { connect } from 'react-redux';

const MobileContainer = styled.div`
  display: flex
  flex-direction: column
`;
const MobileHeader = styled.div`
  align-self: center;
`;
const MobileContent = styled.div``;
const Logo = styled.img`
  height: 30vw;
`;

class Mobile extends Component {
  render() {
    return (
      <Fragment>
        <MobileContainer>
          <MobileHeader>
            <a href={`/`}>
              <Logo src={`/uploads/logo.svg`} alt='logo' />
            </a>
          </MobileHeader>

          <MobileContent>
            <Switch>
              <Route path='/music/:post_url' component={Music} />
              <Route path='/:id' component={Blog} />
              <Route exact path='/' component={Blog} />
              <Redirect to='/' />
            </Switch>
          </MobileContent>
        </MobileContainer>
      </Fragment>
    );
  }
}

export default withRouter(
  connect(
    (state) => ({
      options: state.playlist.options,
    }),
    null,
  )(Mobile),
);
