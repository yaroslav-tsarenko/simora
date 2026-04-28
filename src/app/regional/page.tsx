'use client';

import { useState } from 'react';
import { Globe, MapPin, CheckCircle } from 'lucide-react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { PlanCard } from '@/components/cards/PlanCard';
import { useApp } from '@/hooks/AppProvider';
import { regionalPlans } from '@/data/regional';
import { EsimPlan } from '@/types';

const regionIcons: Record<string, string> = {
  Europe: '🇪🇺',
  Asia: '🌏',
  'Middle East': '🕌',
  Americas: '🌎',
};

export default function RegionalPage() {
  const { addToCart } = useApp();
  const [addedId, setAddedId] = useState<string | null>(null);

  function handleBuy(plan: EsimPlan, regionName: string) {
    addToCart({
      planId: plan.id,
      name: `${regionName} eSIM`,
      data: plan.data,
      validity: plan.validity,
      price: plan.price,
      coverage: plan.coverage,
    });
    setAddedId(plan.id);
    setTimeout(() => setAddedId(null), 2000);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <AnimatedSection>
        <SectionHeader
          title="Regional eSIM Plans"
          subtitle="One eSIM for an entire region. Perfect for multi-country trips without swapping SIMs at every border."
        />
      </AnimatedSection>

      {/* Added-to-cart toast */}
      {addedId && (
        <div className="fixed top-24 right-6 z-50 flex items-center gap-2 rounded-xl bg-success px-5 py-3 text-white shadow-lg animate-in fade-in slide-in-from-top-2">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">Added to cart</span>
        </div>
      )}

      <div className="mt-16 space-y-20">
        {regionalPlans.map((region, idx) => (
          <AnimatedSection key={region.id} delay={idx * 0.1}>
            <div className="rounded-3xl border border-border bg-surface/30 p-6 sm:p-10">
              {/* Region header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{regionIcons[region.region]}</span>
                  <h3 className="text-2xl font-bold text-text sm:text-3xl">
                    {region.region}
                  </h3>
                </div>
                <p className="text-text-light text-lg max-w-3xl">
                  {region.description}
                </p>

                {/* Countries covered */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {region.countries.map((country) => (
                    <span
                      key={country}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3 py-1 text-sm text-text-light"
                    >
                      <MapPin className="h-3 w-3 text-primary" />
                      {country}
                    </span>
                  ))}
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
                    <Globe className="h-3 w-3" />
                    and more
                  </span>
                </div>
              </div>

              {/* Plan cards grid */}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {region.plans.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    onBuy={(p) => handleBuy(p, region.region)}
                  />
                ))}
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
