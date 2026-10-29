import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AboutSection } from './sections/about-section';
import { AdvantagesSection } from './sections/advantages-section';
import { ContactSection } from './sections/contact-section';
import { CtaSection } from './sections/cta-section';
import { ExpertiseSection } from './sections/expertise-section';
import { HeroSection } from './sections/hero-section';
import { PartnersSection } from './sections/partners-section';
import { ProductApproachSection } from './sections/product-approach-section';
import { SolutionsSection } from './sections/solutions-section';
import { StatsSection } from './sections/stats-section';
import { UseCasesSection } from './sections/use-cases-section';

@Component({
  selector: 'app-home',
  imports: [
    HeroSection,
    AboutSection,
    ExpertiseSection,
    SolutionsSection,
    StatsSection,
    AdvantagesSection,
    ProductApproachSection,
    UseCasesSection,
    PartnersSection,
    CtaSection,
    ContactSection,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero-section />
    <app-about-section />
    <app-expertise-section />
    <app-solutions-section />
    <app-stats-section />
    <app-advantages-section />
    <app-product-approach-section />
    <app-use-cases-section />
    <app-partners-section />
    <app-cta-section />
    <app-contact-section />
  `,
})
export class Home {}
