import { useRouter } from 'next/router';

export default function PortfolioDetailPage() {
  const router = useRouter();

  console.log(router);
  console.log(router.pathname);
  console.log(router.query);

  return (
    <div>
      <h1>The Portfolio Detail Page For ProjectId: {router.query.projectId}</h1>
    </div>
  )
}