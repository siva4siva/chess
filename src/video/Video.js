import React, { Component } from 'react';


class Video extends Component {
  componentDidMount() {
    let localStream;
    // Video element where stream will be placed.
    const localVideo = document.querySelector('video');
    // Initializes media stream.
    navigator.mediaDevices.getUserMedia({ video: true, })
      .then((mediaStream) => {
        localStream = mediaStream;
        localVideo.srcObject = mediaStream;
      }).catch((error) => {
        console.log('navigator.getUserMedia error: ', error);
      });
  }

  render() {
    return (
      <div>
        <h1>mirror</h1>
        <video autoPlay playsInline></video>
      </div>
    );
  }
}

export default Video;