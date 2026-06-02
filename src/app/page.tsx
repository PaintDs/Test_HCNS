import Navigation from "@/components/Navigation";
import VideoFeed from "@/components/VideoFeed";

export default function Home() {
  return (
    <div className="flex bg-black min-h-screen text-white overflow-hidden relative">
      {/* Navigation: Sidebar on PC, Bottom Bar on Mobile */}
      <Navigation />

      {/* Video Feed area offset by sidebar on md screen size */}
      <main className="flex-1 md:pl-64 h-screen w-full relative">
        <VideoFeed />
      </main>
    </div>
  );
}
