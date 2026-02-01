// app/[username]/library/page.tsx

import LibraryView from "@/ui/shells/LibraryView";

type Props = {
  params: Promise<{
    username: string; // will be "@ton" in URL
  }>;
};

export default async function Page({ params }: Props) {
  const { username } = await params;

  return <LibraryView rawUsername={username} />;
}
