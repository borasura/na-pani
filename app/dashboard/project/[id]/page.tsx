// pages/projects/[id].js

//import { notFound } from 'next/navigation';

// Fetch the project data using the id
export default async function ProjectPage({ params }) {
  const { id } = params;

  // Fetch project data from your API or database
  //const project = await fetchProjectById(id); // Replace with your fetching logic

  // If no project is found, you can return a 404 error page
//   if (!project) {
//     notFound();
//   }

  return (
    <div>
      <h1>{id}</h1>
      <p>{id}</p>
      {/* Render other project details here */}
    </div>
  );
}

// async function fetchProjectById(id) {
//   // Simulating an API call or database query
//   // Replace with your actual data fetching logic
//   const response = await fetch(`https://your-api.com/projects/${id}`);
//   const data = await response.json();
//   return data;
// }
