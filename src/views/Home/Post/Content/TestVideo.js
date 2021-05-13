import React, { useRef, useEffect,  useState} from 'react';
import videojs from 'video.js';

import 'video.js/dist/video-js.min.css';



export const VideoPlayer = ({ 
  src = '',
  type = '',
  options = {}
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

    const optionsIntersection = {
      threshol: .5
    }

    const inter = new IntersectionObserver((entries) => {
      if(!entries[0].isIntersecting && !vjsPlayer.isDisposed_ && !vjsPlayer.paused()) {
            vjsPlayer.pause()
      }
    }, optionsIntersection)
    inter.observe(videoRef.current)

    return () => vjsPlayer.dispose();
  }, []);

  useEffect(() => {
    if (player !== null) {
      player.src({ src, type });
    }
  }, [src, type, player]);

  return (
    <div>
      
      <video ref={videoRef} className="video-js">
      </video>
    </div>
  );
};

export default VideoPlayer;