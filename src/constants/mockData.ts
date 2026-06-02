export interface VideoData {
  id: string;
  videoUrl: string;
  authorName: string;
  description: string;
  likesCount: number;
}

export const mockVideos: VideoData[] = [
  {
    id: "1",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    authorName: "blender_animation",
    description: "Big Buck Bunny - An absolute classic open-source film! 🐰 #blender #classic #animation",
    likesCount: 0
  },
  {
    id: "2",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
    authorName: "happy_friday",
    description: "Chasing that Friday feeling! Weekend is finally here, let's go! 🎉 #friday #weekend #vibes",
    likesCount: 0
  },
  {
    id: "3",
    videoUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    authorName: "sintel_official",
    description: "Sintel Trailer - An epic search for a baby dragon. Incredible visuals by Blender Institute! 🐉 #fantasy #cgi #trailer",
    likesCount: 0
  }
];
