import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Audio from 'components/Audio';
import ReactHtmlParser from 'react-html-parser';

const ClassicContainer = styled.div`
	display: flex
	flex-direction: column
	align-items: center
	box-shadow: 0px 6px 6px -3px rgba(0, 0, 0, 0.2),0px 10px 14px 1px rgba(0, 0, 0, 0.14),0px 4px 18px 3px rgba(0, 0, 0, 0.12)
`;
const ClassicTitle = styled(Link)`
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
const ClassicArt = styled.div`
	flex: 0 1 auto
	width: 70%
	margin-bottom: 5px
`;
const ClassicText = styled.div`
	flex: 0 1 auto
	width: 70%
	font-size: 14px
	text-align: center
`;
const ClassicAudio = styled.div`
	flex: 0 1 auto
	width: 70%
`;
const Footer = styled.div`
	background-color: #387D7A
	color: white
	flex: 0 1 auto
	height: 5px
	width: 100%
	text-align: center
	font-size: 16px
	opacity: 0.8
`;
const BlogImage = styled.img`
    align-self: center
    height: 100%
    width: 100%
`;

const Classic = ({ title, img, body, post_url, et_stream }) => {
  return (
    <ClassicContainer>
      <ClassicTitle to={`/music/${post_url}`}>{title}</ClassicTitle>

      <ClassicArt>{img && <BlogImage src={`/uploads/${img}`} />}</ClassicArt>

      <ClassicText>{ReactHtmlParser(body)}</ClassicText>

      <ClassicAudio>
        <Audio src={`/api/stream/${et_stream}`} />
      </ClassicAudio>

      <Footer />
    </ClassicContainer>
  );
};

export default withRouter(Classic);
