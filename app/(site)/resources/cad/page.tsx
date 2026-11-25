import { generateCategoryMetadata, renderCategoryPage } from '@/components/resources/CategoryPageView';

export function generateMetadata() {
  return generateCategoryMetadata('cad');
}

export default function CadPage() {
  return renderCategoryPage({ category: 'cad' });
}
