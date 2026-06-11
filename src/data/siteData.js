// ============================================
// RASC TRADING — SITE DATA
// All content data for the website
// ============================================

import {
  FiHome,
  FiLayers,
  FiDroplet,
  FiGrid,
  FiCloud,
  FiTool,
  FiZap,
  FiSquare,
  FiBriefcase,
  FiPackage,
  FiBox,
  FiRefreshCw,
  FiAward,
  FiCheckCircle,
  FiShield,
  FiHeart,
  FiMessageSquare,
  FiClipboard,
  FiCheck,
} from 'react-icons/fi';

// ============================================
// SERVICES (13 items)
// ============================================
export const services = [
  {
    id: 'building',
    title: 'Building',
    description:
      'From foundations to finishing touches, we deliver complete building solutions with structural integrity and architectural precision that stand the test of time.',
    image: '/images/services/building.jpg',
    icon: FiHome,
  },
  {
    id: 'renovations',
    title: 'Renovations',
    description:
      'Transform your existing spaces with our expert renovation services. We breathe new life into properties while preserving their character and enhancing functionality.',
    image: '/images/services/renovations.jpg',
    icon: FiRefreshCw,
  },
  {
    id: 'ceilings',
    title: 'Ceilings & Partitions',
    description:
      'Precision-installed ceilings and partition walls that define spaces with elegance. From suspended ceilings to drywalling, our finishes are flawless.',
    image: '/images/services/ceilings.jpg',
    icon: FiLayers,
  },
  {
    id: 'painting',
    title: 'Painting',
    description:
      'Professional interior and exterior painting services using premium-grade coatings. We deliver smooth, lasting finishes that elevate any environment.',
    image: '/images/services/painting.jpg',
    icon: FiDroplet,
  },
  {
    id: 'flooring',
    title: 'Flooring',
    description:
      'Expert flooring installation spanning vinyl, laminate, hardwood, and epoxy. We create surfaces that combine beauty with exceptional durability.',
    image: '/images/services/flooring.jpg',
    icon: FiGrid,
  },
  {
    id: 'tiling',
    title: 'Tiling',
    description:
      'Meticulous tiling for floors, walls, and wet areas. Our craftsmen ensure perfect alignment, grout consistency, and waterproofing for lasting results.',
    image: '/images/services/tiling.jpg',
    icon: FiGrid,
  },
  {
    id: 'roofing',
    title: 'Roofing',
    description:
      'Complete roofing solutions including new installations, repairs, and waterproofing. We protect your investment from the top down.',
    image: '/images/services/roofing.jpg',
    icon: FiCloud,
  },
  {
    id: 'plumbing',
    title: 'Plumbing',
    description:
      'Full-service plumbing from rough-in to finish. Installations, repairs, and maintenance performed to the highest industry standards.',
    image: '/images/services/plumbing.jpg',
    icon: FiTool,
  },
  {
    id: 'electrical',
    title: 'Electrical',
    description:
      'Licensed electrical installations, rewiring, and compliance certificates. Safety and reliability are our top priorities in every connection.',
    image: '/images/services/electrical.jpg',
    icon: FiZap,
  },
  {
    id: 'windows-doors',
    title: 'Aluminium Windows & Doors',
    description:
      'Custom aluminium window and door systems that maximize natural light, improve insulation, and add contemporary elegance to any structure.',
    image: '/images/services/windows-doors.jpg',
    icon: FiSquare,
  },
  {
    id: 'commercial',
    title: 'Commercial Fit-Outs',
    description:
      'End-to-end commercial interior fit-outs designed for functionality and brand identity. From offices to retail spaces, we deliver turnkey solutions.',
    image: '/images/services/commercial.jpg',
    icon: FiBriefcase,
  },
  {
    id: 'white-boxing',
    title: 'White Boxing',
    description:
      'Professional white-box preparation for commercial and retail spaces. We strip, repair, and prime spaces ready for tenant customisation.',
    image: '/images/services/white-boxing.jpg',
    icon: FiPackage,
  },
  {
    id: 'nutec',
    title: 'Nutec Houses',
    description:
      'Affordable, durable Nutec house construction. Quick build times and versatile designs make these ideal for residential and commercial applications.',
    image: '/images/services/nutec.jpg',
    icon: FiBox,
  },
];


// ============================================
// PROJECTS (12 items)
// ============================================
export const projects = [
  {
    id: 1,
    title: 'Modern Residence',
    category: 'Residential',
    image: '/images/projects/project-1.jpg',
  },
  {
    id: 2,
    title: 'Office Complex Renovation',
    category: 'Commercial',
    image: '/images/projects/project-2.jpg',
  },
  {
    id: 3,
    title: 'Luxury Kitchen Remodel',
    category: 'Renovation',
    image: '/images/projects/project-3.jpg',
  },
  {
    id: 4,
    title: 'Retail Store Fit-Out',
    category: 'Commercial',
    image: '/images/projects/project-4.jpg',
  },
  {
    id: 5,
    title: 'Contemporary Townhouse',
    category: 'Residential',
    image: '/images/projects/project-5.jpg',
  },
  {
    id: 6,
    title: 'Industrial Warehouse Conversion',
    category: 'Commercial',
    image: '/images/projects/project-6.jpg',
  },
  {
    id: 7,
    title: 'Family Home Extension',
    category: 'Residential',
    image: '/images/projects/project-7.jpg',
  },
  {
    id: 8,
    title: 'Restaurant Interior',
    category: 'Commercial',
    image: '/images/projects/project-8.jpg',
  },
  {
    id: 9,
    title: 'Nutec Housing Development',
    category: 'Residential',
    image: '/images/projects/project-9.jpg',
  },
  {
    id: 10,
    title: 'Corporate Office White-Box',
    category: 'Commercial',
    image: '/images/projects/project-10.jpg',
  },
  {
    id: 11,
    title: 'Bathroom & Tiling Renovation',
    category: 'Renovation',
    image: '/images/projects/project-11.jpg',
  },
  {
    id: 12,
    title: 'Multi-Unit Residential Complex',
    category: 'Residential',
    image: '/images/projects/project-12.jpg',
  },
];


// ============================================
// TESTIMONIALS (3 items)
// ============================================
export const testimonials = [
  {
    id: 1,
    name: 'Sarah van der Merwe',
    role: 'Homeowner, Cape Town',
    text: 'RASC Trading transformed our outdated house into a modern dream home. Their attention to detail, professionalism, and commitment to quality exceeded every expectation. We couldn\'t be happier with the result.',
    rating: 5,
    image: '/images/testimonials/testimonial-1.png',
  },
  {
    id: 2,
    name: 'James Mokoena',
    role: 'Property Developer',
    text: 'We\'ve partnered with RASC on multiple commercial projects and they consistently deliver exceptional quality on time and within budget. Their team is reliable, skilled, and a pleasure to work with.',
    rating: 5,
    image: '/images/testimonials/testimonial-2.png',
  },
  {
    id: 3,
    name: 'Linda Naidoo',
    role: 'Business Owner, Johannesburg',
    text: 'From the initial consultation to the final walk-through, RASC Trading demonstrated true craftsmanship. Our office fit-out was completed seamlessly, and the space looks absolutely stunning.',
    rating: 5,
    image: '/images/testimonials/testimonial-3.jpg',
  },
];


// ============================================
// STATS (4 items)
// ============================================
export const stats = [
  {
    id: 1,
    value: 35,
    suffix: '+',
    label: 'Years of Experience',
    icon: FiAward,
  },
  {
    id: 2,
    value: 500,
    suffix: '+',
    label: 'Projects Completed',
    icon: FiCheckCircle,
  },
  {
    id: 3,
    value: 0,
    prefix: '',
    suffix: '',
    displayText: 'NHBRC',
    label: 'Certified Builder',
    icon: FiShield,
  },
  {
    id: 4,
    value: 100,
    suffix: '%',
    label: 'Client Satisfaction',
    icon: FiHeart,
  },
];


// ============================================
// PROCESS STEPS (4 items)
// ============================================
export const processSteps = [
  {
    id: 1,
    number: '01',
    title: 'Consultation',
    description:
      'We begin with a thorough discussion of your vision, requirements, and budget to understand exactly what you need.',
    icon: FiMessageSquare,
  },
  {
    id: 2,
    number: '02',
    title: 'Planning',
    description:
      'Our team creates detailed plans, timelines, and cost estimates, ensuring every aspect is mapped out before work begins.',
    icon: FiClipboard,
  },
  {
    id: 3,
    number: '03',
    title: 'Execution',
    description:
      'Skilled craftsmen bring your project to life with precision, quality materials, and strict adherence to safety standards.',
    icon: FiTool,
  },
  {
    id: 4,
    number: '04',
    title: 'Completion',
    description:
      'We conduct a final walkthrough, address every detail, and ensure your complete satisfaction before handover.',
    icon: FiCheck,
  },
];


// ============================================
// COMPANY INFO
// ============================================
export const companyInfo = {
  name: 'RASC Trading',
  fullName: 'Rocky and Son\'s Construction',
  established: 1990,
  ptyLtd: 2022,
  phone: '083 318 6161',
  email: 'info@rasctrading.co.za',
  nhbrc: '#4000019695',
  location: 'South Africa',
  tagline: 'Building Excellence, Transforming Spaces',
  description:
    'With over 35 years of construction expertise, RASC Trading delivers premium building, renovation, and fit-out services across South Africa. NHBRC certified and committed to excellence.',
  social: {
    facebook: 'https://facebook.com/rasctrading',
  },
};


// ============================================
// NAVIGATION LINKS
// ============================================
export const navigationLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
];


// ============================================
// CLIENT LOGOS
// ============================================
export const clientLogos = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  image: `/images/clients/client-${i + 1}.png`,
  alt: `Client ${i + 1}`,
}));


// ============================================
// VALUES (for About page)
// ============================================
export const values = [
  {
    id: 1,
    title: 'Quality Craftsmanship',
    description:
      'We take pride in delivering exceptional quality in every project. From materials to finishing touches, excellence is our standard.',
    icon: FiAward,
  },
  {
    id: 2,
    title: 'Integrity & Trust',
    description:
      'Honest communication, transparent pricing, and reliable timelines. We build lasting relationships founded on trust.',
    icon: FiShield,
  },
  {
    id: 3,
    title: 'Safety First',
    description:
      'Strict adherence to safety protocols and industry regulations. Every team member is trained and certified for safe operations.',
    icon: FiCheckCircle,
  },
  {
    id: 4,
    title: 'Innovation',
    description:
      'Embracing modern techniques and materials to deliver smarter, more efficient, and sustainable building solutions.',
    icon: FiRefreshCw,
  },
];


// ============================================
// PROJECT CATEGORIES (for Projects page filter)
// ============================================
export const projectCategories = [
  'All',
  'Residential',
  'Commercial',
  'Renovation',
];

