import Link from "next/link";

import { getBreakingNews } from "@/lib/data";

export async function BreakingNews() {
  const { data } = await getBreakingNews();
  const { urgent, articleId, headline } = data;

  return (
    <div>
      <Link prefetch href={`/articles/${articleId}`}>
        {headline}
      </Link>
    </div>
  );
}
