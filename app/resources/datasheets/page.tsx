import { generateCategoryMetadata, renderCategoryPage } from '@/components/resources/CategoryPageView';

export function generateMetadata() {
  return generateCategoryMetadata('datasheets');
}

export default function DatasheetsPage() {
  return renderCategoryPage({ category: 'datasheets' });
}
