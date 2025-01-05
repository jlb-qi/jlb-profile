export interface ProjectData {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  overview: string;
  coreProblem: string;
  goal: string;
  technicalDetails: string[];
  keyFeatures: string[];
  technologies: string[];
  status: {
    currentState: string;
    challenges?: string;
    nextSteps?: string;
  };
}

export const projects: ProjectData[] = [
  {
    id: 1,
    slug: 'yoghurt',
    title: 'Yoghurt',
    shortDescription: 'A Web3 merch store for local clubs that rewards attendance using POAP integration and Polygon blockchain, enhancing club engagement through tokenized participation.',
    overview: 'Yoghurt was an experimental Web3 merchandise store designed to boost engagement for local clubs. The project aimed to solve the challenge of maintaining active participation by implementing a blockchain-based reward system for attendance.',
    coreProblem: 'Local clubs often struggle with consistent member participation and engagement. Traditional merchandise and loyalty programs fail to create meaningful connections between members and their clubs. The disconnect between attendance and rewards means that active participants aren\'t properly recognized, while passive members have equal access to club benefits.',
    goal: 'Create a system that strengthens the relationship between members and their clubs by making participation tangible and rewarding. By tokenizing attendance through POAP and linking it to exclusive merchandise access, we aimed to create a self-reinforcing cycle of engagement where active participation leads to meaningful rewards, which in turn encourages more participation.',
    technicalDetails: [
      'Built on Polygon network for cost-effective transactions',
      'Integrated with POAP (Proof of Attendance Protocol) for attendance verification',
      'Smart contracts for managing rewards and merchandise access',
      'Web3 wallet integration for seamless user experience'
    ],
    keyFeatures: [
      'Attendance tracking through POAP integration',
      'Exclusive merchandise access based on attendance records',
      'Reward point system on Polygon blockchain',
      'Club-specific customization options'
    ],
    technologies: ['Polygon', 'POAP', 'Web3.js', 'Smart Contracts', 'React', 'Solidity'],
    status: {
      currentState: 'Prototype completed',
      nextSteps: 'Alpha testing planned for summer 2025'
    }
  },
  {
    id: 2,
    slug: 'prytanis',
    title: 'Prytanis',
    shortDescription: 'An intelligent task management system combining GPT-4 with Neo4j graph database for contextual task prioritization and relationship mapping.',
    overview: 'Prytanis is a sophisticated task management system that leverages the power of GPT-4 and Neo4j graph database to create an intelligent, context-aware task prioritization system. It understands the relationships between tasks and can make smart decisions about task importance and scheduling.',
    coreProblem: 'Traditional task management systems treat tasks as isolated entities, failing to capture the complex web of relationships and dependencies between different tasks and projects. This leads to suboptimal prioritization and difficulty in understanding the broader impact of individual tasks on overall goals.',
    goal: 'Create an intelligent system that understands tasks in their full context, automatically identifies relationships between tasks, and provides smart prioritization recommendations based on the entire task ecosystem rather than just individual task attributes.',
    technicalDetails: [
      'Custom GPT model integration for natural language task processing',
      'Neo4j graph database for storing and querying task relationships',
      'RESTful API for seamless integration with existing tools',
      'Advanced query optimization for real-time relationship analysis',
      'Custom embeddings for semantic task similarity detection'
    ],
    keyFeatures: [
      'Natural language task input and processing',
      'Automatic relationship detection between tasks',
      'Context-aware priority recommendations',
      'Visual graph representation of task relationships',
      'Smart dependency management',
      'Temporal analysis for deadline optimization'
    ],
    technologies: ['GPT-4', 'Neo4j', 'Python', 'FastAPI', 'React', 'TypeScript', 'Docker'],
    status: {
      currentState: 'Functioning prototype completed',
      challenges: 'Ensuring proper context window to be able to make accurate recommendations',
      nextSteps: 'On the backburner for now'
    }
  },
  {
    id: 3,
    slug: 'haven',
    title: 'Haven',
    shortDescription: 'A transparent property management platform that bridges the communication gap between tenants and owners while providing clear cost breakdowns and document management.',
    overview: 'Haven is a comprehensive property management platform designed to create transparency and trust between property owners and tenants. It provides clear visibility into costs, streamlines documentation, and facilitates better communication between all parties involved in property management.',
    coreProblem: 'Property management often suffers from opacity in costs and fees, leading to mistrust and disputes between owners and tenants. Documentation is frequently scattered across different platforms and email threads, making it difficult to track important information. Hidden or unexpected costs create financial stress and damage relationships between stakeholders.',
    goal: 'Create a unified platform that brings transparency to property management by providing clear cost breakdowns, centralized document storage, and improved communication channels. The aim is to eliminate surprise expenses and reduce friction in property management relationships by making information easily accessible to all parties.',
    technicalDetails: [
      'Real-time cost tracking and breakdown visualization',
      'Secure document storage and management system',
      'Automated notification system for upcoming expenses',
      'Integration with common property management tools',
      'Role-based access control for different stakeholders',
      'Mobile-first responsive design'
    ],
    keyFeatures: [
      'Transparent utility and management fee tracking',
      'Centralized document repository',
      'Expense forecasting and budgeting tools',
      'Communication platform between owners and tenants',
      'Maintenance request tracking',
      'Digital lease management',
      'Cost history and analytics'
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'TypeScript', 'Express', 'Docker'],
    status: {
      currentState: 'In development',
      challenges: 'Integrating with various utility providers and payment systems',
      nextSteps: 'Building the document management system and implementing the notification engine'
    }
  },
  {
    id: 4,
    slug: 'elements',
    title: 'Elements',
    shortDescription: 'An NFT collection for World App that lets users collect periodic table elements, with minting probabilities based on their natural atmospheric abundance.',
    overview: 'Elements is an educational and collectible NFT project built on World Chain that combines chemistry with blockchain technology. Users can mint NFTs representing elements from the periodic table, with rarity determined by each element\'s actual abundance in Earth\'s atmosphere.',
    coreProblem: 'While many NFT projects rely on arbitrary rarity systems, there\'s an opportunity to create meaningful scarcity based on real-world scientific data. Additionally, there was a need to understand and demonstrate the capabilities of building on World Chain.',
    goal: 'Create an engaging NFT collection that ties digital scarcity to real-world chemical abundance while serving as a practical exploration of World Chain\'s development ecosystem and smart contract capabilities.',
    technicalDetails: [
      'Smart contracts built on World Chain',
      'Probability-based minting system reflecting atmospheric abundance',
      'Integration with World App ecosystem',
      'Metadata storage for element properties and characteristics',
      'Random number generation for element selection',
      'Interactive periodic table interface'
    ],
    keyFeatures: [
      'Scientific rarity system based on atmospheric abundance',
      'Detailed element information and properties',
      'Interactive periodic table visualization',
      'Integration with World ID for unique minting',
      'Element trading marketplace',
      'Collection completion tracking'
    ],
    technologies: [
      'World Chain',
      'Solidity',
      'World App SDK',
      'React',
      'TypeScript',
      'IPFS',
      'World ID'
    ],
    status: {
      currentState: 'Imminent launch',
      challenges: 'Fine-tuning minting probabilities to accurately reflect atmospheric ratios',
      nextSteps: 'Final testing and deployment to World Chain mainnet'
    }
  },
  {
    id: 5,
    slug: 'holidao',
    title: 'HoliDAO',
    shortDescription: 'A decentralized platform for solo travelers to pool resources and share luxury accommodations, creating pop-up coliving experiences in beautiful properties.',
    overview: 'HoliDAO reimagines group travel by connecting solo travelers who want to share premium accommodations. It uses DAO mechanisms to coordinate bookings, manage shared resources, and create temporary communities in stunning properties that would be out of reach for individual travelers.',
    coreProblem: 'Coordinating group trips is often challenging, and solo travelers miss out on amazing properties due to cost and size constraints. Traditional booking platforms don\'t facilitate resource pooling among strangers, and there\'s no structured way to create temporary travel communities around shared accommodations.',
    goal: 'Create a decentralized platform that enables solo travelers to pool resources, democratically manage shared accommodations, and form temporary communities in premium properties. The platform aims to make luxury travel more accessible while fostering meaningful connections between like-minded travelers.',
    technicalDetails: [
      'Smart contracts for resource pooling and governance',
      'Reputation system for community trust',
      'Automated booking and payment distribution',
      'Property verification and quality assurance',
      'Decentralized voting mechanism for property selection',
      'Integration with major booking platforms'
    ],
    keyFeatures: [
      'Decentralized property selection and booking',
      'Resource pooling through smart contracts',
      'Community governance and decision making',
      'Traveler reputation and verification system',
      'Flexible stay duration management',
      'Property curation and quality standards',
      'Pop-up community organization tools'
    ],
    technologies: [
      'Ethereum',
      'Solidity',
      'React',
      'Node.js',
      'IPFS',
      'Web3.js',
      'Arweave'
    ],
    status: {
      currentState: 'Concept phase',
      challenges: 'Designing trustworthy verification systems and legal framework for shared responsibility',
      nextSteps: 'Creating proof of concept for the resource pooling mechanism'
    }
  }
  // Add more projects here
];
