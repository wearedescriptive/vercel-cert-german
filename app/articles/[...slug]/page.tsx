type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {}

export default async function ArticleDetails({ params }: Props) {
  return <div>article details page</div>;
}
