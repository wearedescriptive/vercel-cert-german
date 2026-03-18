import { getBreakingNews } from "@/lib/data";

export default async function Home() {
  const [breakingNews] = await Promise.all([getBreakingNews()]);

  console.log({ breakingNews });

  return <main>main content!</main>;
}
