import React, { Component } from 'react'
import styled from 'styled-components'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as blogActions from 'redux/modules/blog'
import PostSelector from 'components/PostSelector'

import { ScaleLoader } from 'react-spinners'

const Loader = styled.div`
	display: flex
	padding-top: 5vh
	padding-bottom: 90vh
	justify-content: center
`

const MusicContainer = styled.div`
	margin-bottom: 75px
`

class Music extends Component {
  constructor(props) {
    super(props)

    this.state = {
      post: null,
      loading: null,
      error: null
    }
  }

  componentWillMount() {
    const { BlogActions, match, post } = this.props


    if (_.isUndefined(post)) {
      
      this.setState({
        loading: true
      })

      BlogActions.findPost(match.params.post_url)
        .then(res => this.setState({
          post: res.data,
          loading: false
        }))
    }
  }

  render() {
    const { loading } = this.state

    return (
      <MusicContainer>
        {loading
          ? <Loader><ScaleLoader color={'#EFBDEB'} /></Loader>
          : <PostSelector post={this.props.post ? this.props.post : this.state.post} />
        }
      </MusicContainer>
    )
  }
}

export default connect(
  (state, { match }) => ({
    //eslint-disable-next-line 
    post: state.blog.posts.find(p => p.post_url == match.params.post_url)
  }),
  dispatch => ({
    BlogActions: bindActionCreators(blogActions, dispatch)
  })
)(Music)
