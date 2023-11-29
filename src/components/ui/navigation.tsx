import NextLink from "next/link";

export default function Pagination({
  path = "articles",
  pages = [],
  current_page = 1,
}: {
  path: string;
  pages: number[];
  current_page: number;
}) {
  return (
    <div className="flex items-center space-x-1 mt-8">
      {pages.map((page) => (
        <NextLink
          key={page}
          href={`/${path}/${page}`}
          className={`px-4 py-2 border hover:bg-black hover:text-white ${
            current_page === page && "bg-black text-white"
          }`}
        >
          {page}
        </NextLink>
      ))}
    </div>
  );
}
