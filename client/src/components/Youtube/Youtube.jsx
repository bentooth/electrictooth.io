import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import YouTube from 'react-youtube-embed';
import ReactHtmlParser from 'react-html-parser';

// Youtube
const YouTubeContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	box-shadow: 0px 6px 6px -3px rgba(0, 0, 0, 0.2),0px 10px 14px 1px rgba(0, 0, 0, 0.14),0px 4px 18px 3px rgba(0, 0, 0, 0.12)
`;

const YouTubeTitle = styled(Link)`
	background-color: #387D7A;
	color: white;
	padding: 20px;
	flex: 0 1 auto;
	width: 100%
	text-align: center;
	margin-bottom: 15px;
	font-size: 16px;
	font-weight: bold;
	text-decoration: none;

	transition: color 1s;

  &:hover {
    color: #09a9b3;
    transition: all 0.3s ease 0s;
  }
`;

const YouTubePlayer = styled.div`
	flex: 0 1 auto;
	width: 100%
	padding: 0 15px;
	margin-bottom: 15px;
`;

const YouTubeText = styled.div`
	border-style: solid;
	border-width: 2px;
	border-color: #99ffff;
	flex: 0 1 auto;
	width: 97.5%
	font-size: 14px;
	margin-bottom: 15px;
	padding: 15px;
`;

const Footer = styled.div`
	background-color: #387D7A;
	color: white;
	flex: 0 1 auto;
	height: 5px;
	width: 100%
	text-align: center;
	font-size: 16px;
	opacity: 0.8;
`;

const Youtube = ({ title, yt_id, body, post_url }) => {
    return (
        <YouTubeContainer>

          <YouTubeTitle to={`/music/${post_url}`}>{title}</YouTubeTitle>

          <YouTubePlayer>
            <YouTube id={yt_id} />
          </YouTubePlayer>

          {body !== '' && <YouTubeText>{ReactHtmlParser(body)}</YouTubeText>}

          <Footer />
        </YouTubeContainer>
    )
}

export default withRouter(Youtube)
