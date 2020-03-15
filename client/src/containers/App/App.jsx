import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { BrowserView, MobileView } from "react-device-detect";

import Desktop from 'containers/Desktop'
import Mobile from 'containers/Mobile'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as blogActions from 'redux/modules/blog';

class App extends Component {

  componentDidUpdate() {
    window.scrollTo(0, 0)
  }

  componentWillMount() {
    document.addEventListener('play', function (e) {
      let audioList = document.getElementsByTagName('audio');
      for (let i = 0, len = audioList.length; i < len; i++) {
        if (audioList[i] !== e.target) {
          audioList[i].pause();
        }
      }
    }, true);
  }

  render() {

    return (
      <Fragment>

        <BrowserView>
          <Desktop />
        </BrowserView>

        <MobileView>
          <Mobile />
        </MobileView>

      </Fragment>
    )
  }
}

export default withRouter(connect(
  state => ({
    updatedAt: state.blog.updatedAt
  }),
  dispatch => ({
    BlogActions: bindActionCreators(blogActions, dispatch)
  })
)(App));
