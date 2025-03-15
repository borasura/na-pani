export default async function ProjectOverview({ params }) {
  const { id } = params;

  return (
    <div>
      <h1>Welcome to project Overview view - this page is still under construction</h1>
      <p>{id}</p>
      {/* Render other project details here */}
    </div>
  );
}
