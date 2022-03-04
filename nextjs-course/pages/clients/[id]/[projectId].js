import { useRouter } from "next/router";

export default function SelectedClientProjectPage() {
  const router = useRouter();

  console.log(router.query);

  return (
    <div>
      <h1>The Project Page for a Specific Project({router.query.projectId}) for a Selected Client({router.query.id})</h1>
    </div>
  );
}