import { services } from '../data/siteData';

// Map service ID to project categories
const serviceCategoryMapping = {
  building: ['Residential', 'Infrastructure'],
  renovations: ['Renovation'],
  ceilings: ['Renovation', 'Commercial'],
  painting: ['Renovation'],
  flooring: ['Renovation', 'Commercial'],
  tiling: ['Renovation'],
  roofing: ['Renovation', 'Residential'],
  plumbing: ['Renovation'],
  electrical: ['Commercial', 'Residential'],
  'windows-doors': ['Commercial', 'Residential'],
  commercial: ['Commercial'],
  'white-boxing': ['White Boxing'],
  nutec: ['Nutec']
};

/**
 * Resolves a project image for a given service ID based on the active projects in the database.
 * If no projects are loaded or matching projects don't exist, it falls back to the default static image.
 */
export const getServiceImage = (serviceId, projectsList) => {
  const defaultImage = `/images/services/${serviceId}.jpg`;
  
  if (!projectsList || projectsList.length === 0) {
    return defaultImage;
  }

  const categories = serviceCategoryMapping[serviceId] || ['Residential'];

  // Filter projects that match the categories for this service
  const matchingProjects = projectsList.filter(p => categories.includes(p.category));

  if (matchingProjects.length > 0) {
    // To ensure different services in the same category don't all show the exact same project image,
    // we distribute them based on the service's index in the global list.
    const serviceIndex = services.findIndex(s => s.id === serviceId);
    const index = serviceIndex !== -1 ? serviceIndex % matchingProjects.length : 0;
    return matchingProjects[index].image;
  }

  // Fallback to any project in the list if no category match is found
  const serviceIndex = services.findIndex(s => s.id === serviceId);
  const fallbackIndex = serviceIndex !== -1 ? serviceIndex % projectsList.length : 0;
  return projectsList[fallbackIndex].image;
};
