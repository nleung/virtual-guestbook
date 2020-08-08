import React from 'react';
import Post from './Post';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import AddPostButton from './AddPostButton';
import './Gallery.css'

class Gallery extends React.Component {
  render() {
    return (
      <div>
        <img className="Gallery-header-image"
          src="https://qa-media-api.xogrp.com/images/d0b995a2-0670-4093-ba5b-99611a8c427e~rt_auto-rs_3000.h?ordering=explicit"
        />
        <div className="Gallery-header">MELISSA & SAMUEL'S GUESTBOOK</div>
        <div className="Gallery-add-post-button">
          <AddPostButton />
        </div>
        <Container>
          <Row>
            <Col lg>
              <Post name="Harry & Megan" comment="Congratulations on your big day!" imageURL="https://www.hellomagazine.com/imagenes/brides/2019123182528/stylish-celebrity-wedding-guests-2019/0-397-808/stylish-celebrity-wedding-guests-m.jpg"/>
            </Col>
            <Col lg>
              <Post name="William & Kate" comment="So happy for you guys!" imageURL="https://ta-images.condecdn.net/image/67yAm7JKPEv/crop/405/f/Duchess-of-Cambridge-at-Zara-Philips-tatler-14mar17-getty_b.jpg"/>
            </Col>
            <Col lg>
              <Post name="Queen E" comment="Chip chip cheerio" imageURL="https://media1.popsugar-assets.com/files/thumbor/5eZOJ8KSZdob-ilYldZOP73QJGw/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2018/05/19/691/n/1922564/0e4d4d7ff9755d30_GettyImages-960084754/i/Queen-Elizabeth-Dress-Royal-Wedding-2018.jpg"/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Gallery
