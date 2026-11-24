import Hero from '@/components/home/Hero';
import CoreFunctions from '@/components/home/CoreFunctions';
import ProductFamilies from '@/components/home/ProductFamilies';
import IndustriesWeServe from '@/components/home/IndustriesWeServe';
import WhyEngineersChoosePDC from '@/components/home/WhyEngineersChoosePDC';
import { coreFunctions } from '@/data/site';

export default function Home() {
  return (
    <>
      <Hero />
      <CoreFunctions items={coreFunctions} />
      <ProductFamilies />
      <IndustriesWeServe />
      <WhyEngineersChoosePDC />
    </>
  );
}
