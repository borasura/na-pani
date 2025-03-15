export default async function ProjectSettings({ params }) {
  const { id } = await params;

  return (
    <div>
      <h1>Welcome to project Settings view - this page is still under construction</h1>
      <p>{id}</p>
      {/* Render other project details here */}
    </div>
  );
}
