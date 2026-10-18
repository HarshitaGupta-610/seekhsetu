import { FeatureHub } from '@/components/journey/feature-hub'
import { createSeedOpportunities } from '@/lib/data/opportunities'

export default function OpportunitiesPage() {
  return <FeatureHub kind="opportunities" title="Opportunity board" description="Explore learning programmes, workshops, competitions and community experiences. Always verify details on the official organiser website before applying." items={createSeedOpportunities().map((o) => ({ id: o.id, title: o.title, description: `${o.source} · ${o.description}`, meta: o.category }))} />
}
