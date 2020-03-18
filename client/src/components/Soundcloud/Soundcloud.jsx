import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import SC from 'soundcloud';
import Audio from 'components/Audio';
import ReactHtmlParser from 'react-html-parser';

const SoundCloudContainer = styled.div`
	display: flex
	flex-direction: column
  align-items: center
  box-shadow: 0px 6px 6px -3px rgba(0, 0, 0, 0.2),0px 10px 14px 1px rgba(0, 0, 0, 0.14),0px 4px 18px 3px rgba(0, 0, 0, 0.12)
`;
const SoundCloudArt = styled.div`
  width: 70%
  padding-bottom: 5px
`;
const SoundCloudText = styled.div`
  width: 70%
  font-size: 14px
  text-align: center
`;
const SoundCloudTitle = styled(Link)`
	background-color: #387D7A
	color: white
	padding: 20px
	flex: 0 1 auto
	width: 100%
	text-align: center
	margin-bottom: 15px
	font-size: 16px
  font-weight: bold
  text-decoration: none
  transition: color 1s

  &:hover {
    color: #09a9b3
    transition: all 0.3s ease 0s
  }
`;
const SoundCloudAudio = styled.div`
  width: 70%;
`;
const Footer = styled.div`
	background-color: #387D7A
	height: 5px
	width: 100%
  opacity: 0.8
`;
const BlogImage = styled.img`
    align-self: center
    height: 100%
    width: 100%
`;

class Soundcloud extends Component {
  constructor() {
    super();
    this.state = {
      stream: null,
      art: null,
    };

    SC.initialize({ client_id: 'qar87rq7vEGGfgjM0PqrmTBUYhSzUcQ5' });
  }

  componentDidMount() {
    this._init();
  }

  _init = async () => {
    const { sc_id } = this.props;

    if (sc_id !== undefined) {
      let response = await SC.get(`tracks/${sc_id}`);

      try {
        let art = response.artwork_url.replace('large', 't500x500');

        this.setState({
          stream: response.stream_url,
          art: art,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  render() {
    const { title, body, post_url } = this.props;
    const { stream, art } = this.state;

    return (
      <div>
        {stream && (
          <SoundCloudContainer>
            <SoundCloudTitle to={`/music/${post_url}`}>{title}</SoundCloudTitle>

            <SoundCloudArt>
              {art ? (
                <BlogImage src={art} />
              ) : (
                <BlogImage src={`/uploads/clouds.jpg`} />
              )}
            </SoundCloudArt>

            <SoundCloudText>{ReactHtmlParser(body)}</SoundCloudText>

            <SoundCloudAudio>
              <Audio
                src={`${stream}?client_id=qar87rq7vEGGfgjM0PqrmTBUYhSzUcQ5`}
              />
            </SoundCloudAudio>

            <Footer />
          </SoundCloudContainer>
        )}
      </div>
    );
  }
}

export default withRouter(Soundcloud);
