import { FC } from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

interface YouTubeVideoDisplayProps {
  videoId: string;
  isPlayList?: boolean;
  title?: string;
  playlistCoverId?: string;
}

export const YouTubeVideoDisplay: FC<YouTubeVideoDisplayProps> = ({ videoId, title, isPlayList, playlistCoverId }) => {
  return (
    <>
      <div>
        <style jsx>{`
          /* Post-click styles */
          .yt-lite.lyt-activated {
            cursor: unset;
          }
        `}</style>
        <LiteYouTubeEmbed
          id={`${videoId}`}
          adNetwork={false}
          params={`loop=1&playlist=${videoId}`}
          aspectHeight={9}
          aspectWidth={16}
          playlist={isPlayList}
          playlistCoverId={playlistCoverId}
          poster="maxresdefault"
          title={title ?? 'Video Embed'}
          noCookie={true}
          wrapperClass="yt-lite bg-no-repeat bg-cover relative"
          iframeClass="top-0 w-full h-full"
          playerClass="lty-playbtn z-10"
        />
      </div>
    </>
  );
};
