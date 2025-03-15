export default async function ProjectBoard({ params }) {
  const { id } = params;

  return (
    <div>
      <h1>Welcome to project Board view - this page is still under construction</h1>
      <p>{id}</p>
      {/* Render other project details here */}
    </div>
  );
}
