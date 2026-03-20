export interface DomainFramework {
    name: string;
    roles: string[];
    requiredSkills: string[];
    supportingSkills: string[];
    education: string[];
    certifications: string[];
}

export const DOMAIN_FRAMEWORKS: Record<string, DomainFramework> = {
    'Software Development': {
        name: 'Software Development',
        roles: ['Software Engineer', 'Backend Developer', 'Frontend Developer', 'Full Stack Developer', 'Application Developer'],
        requiredSkills: ['Java', 'Python', 'C++', 'JavaScript', 'TypeScript', 'React', 'Angular', 'NodeJS', 'Spring Boot', 'Git', 'Docker', 'CI/CD', 'REST APIs'],
        supportingSkills: ['Agile', 'Scrum', 'System Design'],
        education: ['Computer Science', 'Software Engineering', 'Information Technology'],
        certifications: ['AWS Developer', 'Azure Developer']
    },
    'Cybersecurity': {
        name: 'Cybersecurity',
        roles: ['SOC Analyst', 'Security Analyst', 'Penetration Tester', 'Security Engineer', 'Threat Intelligence Analyst'],
        requiredSkills: ['SIEM tools', 'Splunk', 'QRadar', 'Incident Response', 'Threat Detection', 'Network Security', 'Vulnerability Assessment', 'MITRE ATT&CK', 'NIST', 'Wireshark', 'Burp Suite', 'Metasploit'],
        supportingSkills: ['Linux Proxy', 'Bash'],
        education: ['Cybersecurity', 'Computer Science', 'Information Security'],
        certifications: ['CEH', 'CompTIA Security+', 'CISSP']
    },
    'Web Development': {
        name: 'Web Development',
        roles: ['Frontend Developer', 'UI Developer', 'Web Engineer'],
        requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React', 'NextJS', 'Vue', 'Git', 'Docker', 'Webpack'],
        supportingSkills: ['Figma', 'SEO', 'Accessibility'],
        education: ['Computer Science', 'Web Development', 'Software Engineering'],
        certifications: []
    },
    'UI / UX Design': {
        name: 'UI / UX Design',
        roles: ['UI Designer', 'UX Designer', 'Product Designer'],
        requiredSkills: ['User research', 'Wireframing', 'Prototyping', 'Design thinking', 'Figma', 'Adobe XD', 'Sketch'],
        supportingSkills: ['CSS', 'HTML', 'Responsive Design'],
        education: ['Design', 'Human Computer Interaction', 'Visual Communication'],
        certifications: []
    },
    'Accounting': {
        name: 'Accounting',
        roles: ['Accountant', 'Financial Analyst', 'Auditor'],
        requiredSkills: ['Financial reporting', 'Bookkeeping', 'Taxation', 'Budgeting', 'Tally', 'QuickBooks', 'Excel'],
        supportingSkills: ['GAAP', 'IFRS'],
        education: ['Accounting', 'Commerce', 'Finance'],
        certifications: ['CA', 'CPA']
    },
    'Finance': {
        name: 'Finance',
        roles: ['Investment Analyst', 'Financial Consultant', 'Risk Analyst'],
        requiredSkills: ['Financial modeling', 'Valuation', 'Market analysis', 'Excel', 'Power BI', 'Python for finance'],
        supportingSkills: ['SQL', 'Tableau'],
        education: ['Finance', 'Economics', 'Business Administration'],
        certifications: ['CFA']
    },
    'Database Engineering': {
        name: 'Database Engineering',
        roles: ['Database Administrator', 'Data Engineer', 'Database Architect'],
        requiredSkills: ['SQL', 'PostgreSQL', 'MongoDB', 'Data modeling', 'ETL pipelines', 'Hadoop', 'Spark'],
        supportingSkills: ['Python', 'AWS RDS'],
        education: ['Computer Science', 'Data Engineering'],
        certifications: ['AWS Certified Database']
    },
    'Data Science': {
        name: 'Data Science',
        roles: ['Data Scientist', 'Machine Learning Engineer', 'AI Engineer'],
        requiredSkills: ['Python', 'Machine Learning', 'Statistics', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Scikit-learn'],
        supportingSkills: ['SQL', 'Data Visualization', 'NLP'],
        education: ['Computer Science', 'Data Science', 'Statistics'],
        certifications: ['AWS Certified Machine Learning']
    },
    'DevOps': {
        name: 'DevOps',
        roles: ['DevOps Engineer', 'Cloud Engineer', 'Site Reliability Engineer'],
        requiredSkills: ['Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'AWS', 'Azure', 'GCP'],
        supportingSkills: ['Linux', 'Python', 'Go'],
        education: ['Computer Science', 'Cloud Engineering'],
        certifications: ['AWS Certified DevOps Engineer', 'CKA']
    },
    'Network Engineering': {
        name: 'Network Engineering',
        roles: ['Network Engineer', 'Infrastructure Engineer'],
        requiredSkills: ['Routing', 'Switching', 'Network Security'],
        supportingSkills: ['Firewalls', 'VPNs', 'Linux'],
        education: ['Networking', 'Information Technology'],
        certifications: ['CCNA', 'CCNP']
    }
};

export function determineDomain(jobRole: string): DomainFramework | null {
    const roleLower = jobRole.toLowerCase();
    for (const key of Object.keys(DOMAIN_FRAMEWORKS)) {
        const domain = DOMAIN_FRAMEWORKS[key];
        for (const role of domain.roles) {
            if (roleLower.includes(role.toLowerCase()) || role.toLowerCase().includes(roleLower)) {
                return domain;
            }
        }
    }
    return null;
}
