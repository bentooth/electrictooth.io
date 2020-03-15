import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const AudioSrc = styled.audio``;

const AudioPlayer = styled.div`
  display: flex
  padding-bottom: 10px
  padding-top: 10px
  margin-bottom: 10px
`;
const ButtonContainer = styled.div`
  width: 20px
  align-self: center
`;
const Button = styled.div`
  margin-top: 5px;
`;
const Timeline = styled.div`
  height: 20px
  border-radius: 15px
  background: rgba(0,0,0,.1)
`;
const TimelineDot = styled.div`
  width: 20px
  height: 20px
  border-radius: 50%
  background: #387D7A
`;
const TimelineContainer = styled.div`
  flex: 9
  align-self: center
  margin-left: 10px
`;

class Audio extends Component {
  state = {
    playing: false,
    onplayhead: false,
  };

  componentDidMount() {
    // play button event listenter
    let playButton = ReactDOM.findDOMNode(this.playButton);
    playButton.addEventListener('click', this.play);

    // timeupdate event listener
    //let audioSrc = ReactDOM.findDOMNode(this.audioSrc)
    this.audioSrc.addEventListener('timeupdate', this.timeUpdate, false);

    // Gets audio file duration
    this.audioSrc.addEventListener('canplaythrough', this.getDuration, false);

    // timeline width adjusted for timelineDot
    this.timelineWidth =
      this.timeline.offsetWidth - this.timelineDot.offsetWidth;

    // makes timelineDot draggable
    this.timelineDot.addEventListener('mousedown', this.mouseDown, false);
    window.addEventListener('mouseup', this.mouseUp, false);

    // makes timeline clickable
    this.timeline.addEventListener(
      'click',
      (event) => {
        this.moveplayhead(event);
        this.audioSrc.currentTime =
          this.audioSrc.duration * this.clickPercent(event);
      },
      false,
    );
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.mouseUp);
  }

  // mouseDown EventListener
  mouseDown = () => {
    this.setState({ onplayhead: true }, () => {
      window.addEventListener('mousemove', this.moveplayhead, true);
      this.audioSrc.removeEventListener('timeupdate', this.timeUpdate, false);
    });
  };

  // mouseUp EventListener
  // getting input from all mouse clicks
  mouseUp = (event) => {
    const { onplayhead } = this.state;

    // eslint-disable-next-line
    if (onplayhead) {
      this.moveplayhead(event);
      window.removeEventListener('mousemove', this.moveplayhead, true);
      // change current time
      this.audioSrc.currentTime =
        this.audioSrc.duration * this.clickPercent(event);
      this.audioSrc.addEventListener('timeupdate', this.timeUpdate, false);
    }

    this.setState({ onplayhead: false });
  };

  getDuration = () => {
    try {
      return this.audioSrc.duration;
    } catch (e) {
      console.log(e);
      return 0;
    }
  };

  // mousemove EventListener
  // Moves timelineDot as user drags
  moveplayhead = (event) => {
    let newMargLeft = event.clientX - this.getPosition(this.timeline);

    if (newMargLeft >= 0 && newMargLeft <= this.timelineWidth) {
      this.timelineDot.style.marginLeft = newMargLeft + 'px';
    }
    if (newMargLeft < 0) {
      this.timelineDot.style.marginLeft = '0px';
    }
    if (newMargLeft > this.timelineWidth) {
      this.timelineDot.style.marginLeft = this.timelineWidth + 'px';
    }
  };

  timeUpdate = () => {
    let playPercent =
      this.timelineWidth * (this.audioSrc.currentTime / this.audioSrc.duration);

    this.timelineDot.style.marginLeft = playPercent + 'px';

    // eslint-disable-next-line
    if (this.audioSrc.currentTime == this.audioSrc.duration) {
      this.setState({ playing: false });
    }
  };

  play = () => {
    this.audioSrc.paused
      ? this.setState({ playing: true }, () => this.audioSrc.play())
      : this.setState({ playing: false }, () => this.audioSrc.pause());
  };

  // getPosition
  // Returns elements left position relative to top-left of viewport
  getPosition(el) {
    return el.getBoundingClientRect().left;
  }

  clickPercent(event) {
    return (
      (event.clientX - this.getPosition(this.timeline)) / this.timelineWidth
    );
  }

  render() {
    const { playing } = this.state;

    return (
      <Fragment>
        <AudioSrc
          innerRef={(audioSrc) => (this.audioSrc = audioSrc)}
          preload='true'
        >
          <source src={this.props.src} />
        </AudioSrc>

        <AudioPlayer
          innerRef={(audioPlayer) => (this.audioPlayer = audioPlayer)}
        >
          <ButtonContainer>
            <Button innerRef={(playButton) => (this.playButton = playButton)}>
              {playing ? (
                <img
                  src={`${process.env.PUBLIC_URL}/pause-solid.svg`}
                  alt='logo'
                ></img>
              ) : (
                <img
                  src={`${process.env.PUBLIC_URL}/play-solid.svg`}
                  alt='logo'
                ></img>
              )}
            </Button>
          </ButtonContainer>

          <TimelineContainer>
            <Timeline innerRef={(timeline) => (this.timeline = timeline)}>
              <TimelineDot
                innerRef={(timelineDot) => (this.timelineDot = timelineDot)}
              />
            </Timeline>
          </TimelineContainer>
        </AudioPlayer>
      </Fragment>
    );
  }
}

export default Audio;
