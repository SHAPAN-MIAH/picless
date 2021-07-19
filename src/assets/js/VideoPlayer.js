import React, { useRef, useEffect,  useState} from 'react';
import videojs from 'video.js';
import * as Utils from '../../utils/Functions'

import 'video.js/dist/video-js.min.css';
import { number } from 'prop-types';



const VideoPlayer = ({ 
  src = '',
  type = '',
  options = {},
  aspect = '4:5',
  videoThreshol = .7,
  videoId = Utils.simpleKeyGenerator(5) | number
}) => {
  const videoRef = useRef(null);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const vjsPlayer = videojs(videoRef.current, options);
    setPlayer(vjsPlayer);

    vjsPlayer.on('play', () => {
    });

    vjsPlayer.on('pause', () => {
     });

    vjsPlayer.aspectRatio(aspect)

    return () => vjsPlayer.dispose();
  }, []);

  useEffect(() => {
    if (player !== null) {
      player.src({ src, type });
    }
  }, [src, type, player]);

  return (
    <div>
      <video id={videoId} ref={videoRef} className="video-js vjs-big-play-centered">
      </video>
    </div>
  );
};

export default VideoPlayer;