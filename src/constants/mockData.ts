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
    likesCount: 14200
  },
  {
    id: "2",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
    authorName: "happy_friday",
    description: "Chasing that Friday feeling! Weekend is finally here, let's go! 🎉 #friday #weekend #vibes",
    likesCount: 9800
  },
  {
    id: "3",
    videoUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    authorName: "sintel_official",
    description: "Sintel Trailer - An epic search for a baby dragon. Incredible visuals by Blender Institute! 🐉 #fantasy #cgi #trailer",
    likesCount: 23500
  },
  {
    id: "4",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    authorName: "tech_blaze",
    description: "Chromecast in action! Sleek, fast, and stunning high definition playback. #chromecast #tech #gadgets",
    likesCount: 8120
  },
  {
    id: "5",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    authorName: "nature_escape",
    description: "Time to escape the ordinary. Breathe in the beauty of the outdoors. 🌲 #escape #adventure #nature",
    likesCount: 17430
  }
];
