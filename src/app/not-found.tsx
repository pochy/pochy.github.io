import NextLink from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>お探しの記事が見つかりませんでした。</h2>
      <NextLink href="/">トップへ戻る</NextLink>
    </div>
  );
}
