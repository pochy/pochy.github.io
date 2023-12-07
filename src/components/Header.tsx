import Link from "next/link";

export default function Header() {
  return (
    <header className="">
      <div className="max-w-4xl mx-auto flex justify-between items-center mt-5 px-4">
        <ul className="flex">
          <li className="pr-2">
            <Link href="/">トップ</Link>
          </li>
        </ul>
        <ul className="flex">
          <li>
            <a href="/blog" className="text-2xl font-bold">
              Blog
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
