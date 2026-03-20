export interface Industry {
  id: string;
  name: string;
  socCode: string; // E.g., 11-0000 Management Occupations
}

export interface JobRole {
  id: string;
  industryId: string;
  name: string;
}

export interface Skill {
  id: string;
  roleId?: string; // Optional if it's a generic skill, but mostly ties to a role for this demo
  name: string;
  type: 'core' | 'advanced' | 'tool';
  tier?: 'standard' | 'pro' | 'master'; // Monetization
}

export interface TaxonomyData {
  industries: Industry[];
  roles: JobRole[];
  skills: Skill[];
}

// Fixed mock data
const mockIndustries: Industry[] = [
  { id: 'ind_1', name: 'Management Occupations', socCode: '11-0000' },
  { id: 'ind_2', name: 'Computer and Mathematical Occupations', socCode: '15-0000' },
  { id: 'ind_3', name: 'Healthcare Practitioners', socCode: '29-0000' },
  { id: 'ind_4', name: 'Business and Financial Operations', socCode: '13-0000' },
  { id: 'ind_5', name: 'Architecture and Engineering', socCode: '17-0000' },
];

const mockRoles: JobRole[] = [
  { id: 'rol_1', industryId: 'ind_2', name: 'Frontend Engineer' },
  { id: 'rol_2', industryId: 'ind_2', name: 'Backend Engineer' },
  { id: 'rol_3', industryId: 'ind_2', name: 'Machine Learning Engineer' },
  { id: 'rol_4', industryId: 'ind_1', name: 'Product Manager' },
  { id: 'rol_5', industryId: 'ind_1', name: 'Chief Executive Officer' },
  { id: 'rol_6', industryId: 'ind_3', name: 'Registered Nurse' },
];

const mockSkills: Skill[] = [
  // Frontend
  { id: 'sk_1', roleId: 'rol_1', name: 'React', type: 'core', tier: 'standard' },
  { id: 'sk_2', roleId: 'rol_1', name: 'TypeScript', type: 'core', tier: 'standard' },
  { id: 'sk_3', roleId: 'rol_1', name: 'Framer Motion', type: 'advanced', tier: 'pro' },
  { id: 'sk_4', roleId: 'rol_1', name: 'WebGL', type: 'advanced', tier: 'master' },
  
  // Backend
  { id: 'sk_5', roleId: 'rol_2', name: 'Node.js', type: 'core', tier: 'standard' },
  { id: 'sk_6', roleId: 'rol_2', name: 'PostgreSQL', type: 'core', tier: 'standard' },
  { id: 'sk_7', roleId: 'rol_2', name: 'Kubernetes', type: 'advanced', tier: 'pro' },
  { id: 'sk_8', roleId: 'rol_2', name: 'Distributed Systems', type: 'advanced', tier: 'master' },
  
  // ML
  { id: 'sk_9', roleId: 'rol_3', name: 'Python', type: 'core', tier: 'standard' },
  { id: 'sk_10', roleId: 'rol_3', name: 'PyTorch', type: 'core', tier: 'standard' },
  { id: 'sk_11', roleId: 'rol_3', name: 'Transformer Architecture', type: 'advanced', tier: 'master' },
];

// Mock Service mimicking Node.js backend controller with Network latency
export const fetchIndustries = async (query?: string): Promise<Industry[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (query) {
          const lowerQuery = query.toLowerCase();
          resolve(mockIndustries.filter(i => i.name.toLowerCase().includes(lowerQuery) || i.socCode.includes(lowerQuery)));
        } else {
          resolve(mockIndustries);
        }
      } catch (err) {
        reject(new Error('Failed to fetch industries. Please try again.'));
      }
    }, 600); // 600ms network delay
  });
};

export const fetchRolesByIndustry = async (industryId: string, query?: string): Promise<JobRole[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (!industryId) {
          throw new Error('Industry ID is required to fetch roles.');
        }
        let matchingRoles = mockRoles.filter(r => r.industryId === industryId);
        
        if (query) {
          const lowerQuery = query.toLowerCase();
          matchingRoles = matchingRoles.filter(r => r.name.toLowerCase().includes(lowerQuery));
        }
        
        resolve(matchingRoles);
      } catch (err: any) {
        reject(new Error(err.message || 'Failed to fetch job roles.'));
      }
    }, 500);
  });
};

export const fetchSkillsByRole = async (roleId: string, query?: string): Promise<Skill[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (!roleId) {
          throw new Error('Role ID is required to fetch skills.');
        }
        let matchingSkills = mockSkills.filter(s => s.roleId === roleId);
        
        if (query) {
          const lowerQuery = query.toLowerCase();
          matchingSkills = matchingSkills.filter(s => s.name.toLowerCase().includes(lowerQuery));
        }
        
        resolve(matchingSkills);
      } catch (err: any) {
        reject(new Error(err.message || 'Failed to fetch skills.'));
      }
    }, 700);
  });
};
