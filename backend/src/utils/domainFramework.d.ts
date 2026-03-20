export interface DomainFramework {
    name: string;
    roles: string[];
    requiredSkills: string[];
    supportingSkills: string[];
    education: string[];
    certifications: string[];
}
export declare const DOMAIN_FRAMEWORKS: Record<string, DomainFramework>;
export declare function determineDomain(jobRole: string): DomainFramework | null;
//# sourceMappingURL=domainFramework.d.ts.map