import ClientApp from "../client/ClientApp";

type Props = {
  params: Promise<{
    shelf: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { shelf } = await params;

  return (
    <ClientApp
      rawUsername="__active__"
      shelf={shelf}
      collection={null}
    />
  );
}
