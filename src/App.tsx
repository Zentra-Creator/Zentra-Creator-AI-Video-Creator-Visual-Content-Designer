/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PortfolioGrid } from './components/PortfolioGrid';
import { VideoLightbox } from './components/VideoLightbox';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { About } from './components/About';
import { ContactCTA } from './components/ContactCTA';
import { Footer } from './components/Footer';
import { Project, ProjectCategory } from './types/portfolio';
import { PORTFOLIO_PROJECTS, WORKFLOW_REEL_PROJECT } from './data/portfolioData';

function PortfolioApp() {
  const { theme } = useTheme();
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [selectedService, setSelectedService] = useState<string>('AI Video Advertising');
  const [portfolioCategory, setPortfolioCategory] = useState<ProjectCategory>('All');

  // Handle opening featured video from Hero or Showreel
  const handleOpenFeaturedVideo = (projectId?: string) => {
    if (projectId === 'idea-to-execution') {
      setActiveProject(WORKFLOW_REEL_PROJECT);
      return;
    }
    if (projectId) {
      const found = PORTFOLIO_PROJECTS.find((p) => p.id === projectId);
      if (found) {
        setActiveProject(found);
        return;
      }
    }
    // Open the primary showcase project
    const featured = PORTFOLIO_PROJECTS.find((p) => p.featured) || PORTFOLIO_PROJECTS[0];
    setActiveProject(featured);
  };

  // Handle scroll / focus to contact
  const handleOpenContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      // Focus on first input after scroll
      setTimeout(() => {
        const input = el.querySelector('input') as HTMLInputElement | null;
        input?.focus();
      }, 600);
    }
  };

  // Handle inquiry from specific project lightbox or service
  const handleInquireProject = (title: string) => {
    setSelectedService(`Project like "${title}"`);
    handleOpenContact();
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedService(serviceName);
    handleOpenContact();
  };

  const handleCategorySelectFromHero = (category: string) => {
    setPortfolioCategory(category as ProjectCategory);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-[#08080a] text-[#F4F4F5]'
          : 'bg-[#FAF9F6] text-neutral-900'
      }`}
    >
      {/* Sticky Navigation */}
      <Navbar onOpenContact={handleOpenContact} />

      <main>
        {/* Hero Section */}
        <Hero
          onPlayFeaturedVideo={handleOpenFeaturedVideo}
          onOpenContact={handleOpenContact}
          onSelectCategory={handleCategorySelectFromHero}
        />

        {/* Selected Work Portfolio Grid with Filter System */}
        <PortfolioGrid
          onOpenProject={(proj) => setActiveProject(proj)}
          activeCategory={portfolioCategory}
          onSelectCategory={setPortfolioCategory}
        />

        {/* Workflow & Collaboration — From Idea to Final Visual + Showreel Reel */}
        <Process onOpenFeaturedVideo={handleOpenFeaturedVideo} />

        {/* What I Create — Services Section */}
        <Services
          onSelectService={handleSelectService}
          onOpenProject={(proj) => setActiveProject(proj)}
        />

        {/* About Section — Personal Story of Oluwatobiloba */}
        <About onOpenContact={handleOpenContact} />

        {/* Final CTA & Project Inquiry Section */}
        <ContactCTA initialService={selectedService} />
      </main>

      {/* Global Brand Footer */}
      <Footer />

      {/* Full-Screen Video Lightbox Modal */}
      <VideoLightbox
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onInquire={handleInquireProject}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}
