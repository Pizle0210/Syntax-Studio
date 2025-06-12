export default function Snippet({ params }: { params: { id: string } }) {
  return <div> {params.id} Page</div>;
}
