import { getBreakingNews } from "@/lib/data";

export async function BreakingNews() {
  const { data } = await getBreakingNews();
  return "hello";
}
