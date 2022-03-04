import { useRouter } from "next/router";

export default function ClientProjectsPage() {
  const router = useRouter();

  console.log(router.query);
  return (
    <div>
      <h1>The Projects of a Given Client({router.query.id})</h1>
    </div>
  );
}
