import React, { Component } from 'react';
import styled from 'styled-components';
import PostSelector from 'components/PostSelector';
import posts from 'data.json';

const MusicContainer = styled.div`
  margin-bottom: 75px;
`;

class Music extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: null,
    };
  }

  componentWillMount() {
    this.setState({
      post: posts.posts.find(
        (p) => p.post_url === this.props.match.params.post_url,
      ),
    });
  }

  render() {
    return (
      <MusicContainer>
        <PostSelector post={this.state.post} />
      </MusicContainer>
    );
  }
}

export default Music;
