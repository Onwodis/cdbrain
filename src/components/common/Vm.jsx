// VimeoEmbed.js
import React from 'react';

const VimeoEmbed = ({ videoId }) => {
  return (
    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
      <iframe
        src={`https://player.vimeo.com/video/${videoId}/title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" width="720" height="1272" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write"`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title="Vimeo Video"
      ></iframe>
    </div>
  );
};

export default VimeoEmbed;
