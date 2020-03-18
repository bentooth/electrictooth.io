import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { Switch, Redirect, withRouter, Route } from 'react-router-dom';

import Blog from 'containers/Blog';
import Music from 'containers/Music';

import { connect } from 'react-redux';

//come node crap about scrypt? run -> npm rebuild scrypt --update-binary
// ET COLORS #09a9b3, #58638e

const DesktopContainer = styled.div`
  display: flex
  flex-direction: column
  align-items: center
`;
const DesktopHeader = styled.div``;
const DesktopContent = styled.div`
  width: 50vw;
`;

const Logo = styled.img`
  height: 10vw;
`;

class Desktop extends Component {
  render() {
    return (
      <Fragment>
        <DesktopContainer>
          <DesktopHeader>
            <a href={`/`}>
              <Logo src={`${process.env.PUBLIC_URL}/logo.svg`} alt='logo' />
            </a>
          </DesktopHeader>

          <DesktopContent>
            <Switch>
              <Route path='/music/:post_url' component={Music} />
              <Route path='/:id' component={Blog} />
              <Route exact path='/' component={Blog} />
              <Redirect to='/' />
            </Switch>
          </DesktopContent>
        </DesktopContainer>
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
  )(Desktop),
);
