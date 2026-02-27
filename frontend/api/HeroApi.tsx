async function getComments() {
  const res = await fetch("http://localhost:3000/api/comments"); // Use full URL if calling internal API
  // The return value is *not* serialized, so you can return Date, Map, Set, etc.
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page() {
  const comments = await getComments();

  return (
    <main>
      <h1>Comments</h1>
      <ul>
        {comments.map((comment: any) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </main>
  );
}
