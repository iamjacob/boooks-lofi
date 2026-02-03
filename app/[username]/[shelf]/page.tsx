import ClientApp from "../../../_trash_here/client/ClientApp";

type Props = {
  params: Promise<{
    username: string;
    shelf: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { username, shelf } = await params;

  return (
    <ClientApp
      rawUsername={username}
      shelf={shelf}
      collection={null}
    />
  );
}
