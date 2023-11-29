import { Rss } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-4xl w-full mx-auto h-24 flex items-center justify-center">
        <div className="flex">
          <span>© kenta nakajima</span>
          <a href="/rss/feed.xml" className="ml-5">
            <Rss color="#f26522" />
          </a>
        </div>
      </div>
    </footer>
  );
}
