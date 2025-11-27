import { getAllPortfolios } from '@/entities/portfolio';
import { PortfolioList } from '@/features/portfolio-list';

export default function PortfolioPage() {
  const portfolios = getAllPortfolios();

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">포트폴리오</h1>
      <PortfolioList portfolios={portfolios} />
    </div>
  );
}
