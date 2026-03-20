import { determineDomain } from '../utils/domainFramework';
import { CandidateReport } from '../models/memoryDb';

export const generateReport = (filename: string, jobRole: string, isReassess: boolean = false): CandidateReport => {
    const jobDomainFramework = determineDomain(jobRole);
    const jobDomainName = jobDomainFramework ? jobDomainFramework.name : 'Unknown Domain';

    filename = filename.toLowerCase();
    let candidateDomainName = 'Software Development'; 
    if (filename.includes('cyber') || filename.includes('soc') || filename.includes('security')) {
        candidateDomainName = 'Cybersecurity';
    } else if (filename.includes('design') || filename.includes('ui') || filename.includes('ux')) {
        candidateDomainName = 'UI / UX Design';
    } else if (filename.includes('backend') || filename.includes('dev')) {
        candidateDomainName = 'Software Development';
    }

    const isExactMatch = candidateDomainName === jobDomainName;
    const domainMatchStatus = isExactMatch ? 'Match' : 'Mismatch';
    
    const variationScore = isReassess ? Math.floor(Math.random() * 5 - 2) : 0;
    
    let domainRelevance = isExactMatch ? 32 + variationScore : 10 + Math.floor(Math.random() * 5);
    const skillMatch = isExactMatch ? 20 + Math.floor(Math.random() * 5) : 5 + Math.floor(Math.random() * 5); 
    const experienceMatch = isExactMatch ? 12 + Math.floor(Math.random() * 3) : 8; 
    const educationMatch = 8; 
    const certifications = isExactMatch ? 8 : 2; 
    const supportingSkills = 4; 

    const baseScore = domainRelevance + skillMatch + experienceMatch + educationMatch + certifications + supportingSkills;

    const scoreBreakdown = {
        total: baseScore,
        domainRelevance,
        skillMatch,
        experienceMatch,
        educationMatch,
        certifications,
        supportingSkills
    };

    const matchedSkills = isExactMatch && jobDomainFramework 
        ? jobDomainFramework.requiredSkills.slice(0, 5) 
        : ['Basic Communication', 'MS Office'];
        
    const missingCriticalSkills = isExactMatch && jobDomainFramework
        ? jobDomainFramework.requiredSkills.slice(5, 7)
        : jobDomainFramework ? jobDomainFramework.requiredSkills.slice(0, 4) : ['Core Domain Skills'];

    const criticalGaps = isExactMatch 
        ? ['Requires deeper architectural knowledge for senior tasks.']
        : ['Fundamental domain mismatch.', 'Lack of core technical foundation for this role.'];

    return {
        id: Math.random().toString(36).substr(2, 9),
        candidateName: filename.replace('.pdf', ''),
        date: new Date().toISOString().split('T')[0],
        jobRole,
        score: baseScore,
        scoreBreakdown,
        topSkills: matchedSkills,
        strengths: isExactMatch ? ['Strong domain alignment', 'Good foundational skills'] : ['Translatable soft skills'],
        weaknesses: criticalGaps,
        candidateDomain: candidateDomainName,
        jobDomain: jobDomainName,
        domainMatchStatus,
        matchedSkills,
        missingCriticalSkills,
        experienceEvaluation: isExactMatch 
            ? 'Candidate has relevant years of experience aligning directly with core job requirements.'
            : 'Experience is heavily centered in a contrasting domain, making direct contribution difficult.',
        educationAlignment: 'Degree holds partial relevance to technical requirements.',
        criticalGaps,
        roleSuitability: isExactMatch 
            ? `Excellent candidate for ${jobRole}. Strong ${jobDomainName} ecosystem skills.`
            : `Candidate demonstrates strong knowledge in ${candidateDomainName}, but job requires ${jobDomainName}. Mismatch detected.`,
        recommendation: baseScore > 75 ? 'Highly Suitable' : baseScore > 60 ? 'Moderately Suitable' : baseScore > 40 ? 'Low Suitability' : 'Not Suitable'
    };
};
