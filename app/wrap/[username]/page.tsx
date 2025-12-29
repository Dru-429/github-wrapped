import { WrapPageClient } from "./wrap-page-client"

export default async function WrapPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params

  return <WrapPageClient username={username} />
}
