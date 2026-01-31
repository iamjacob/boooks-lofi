import ClientApp from "./client/ClientApp";

type Props = {
  params: Promise<{
    username: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { username } = await params;

  return (
    <ClientApp
      rawUsername={username}
      shelf="default"
      collection={null}
    />
  );
}
