import EditStudioForm from "@/components/EditStudioForm";

export const metadata = {
  title: "Update Studio | StudioSpace",
};

export default async function EditStudioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditStudioForm id={id} />;
}
