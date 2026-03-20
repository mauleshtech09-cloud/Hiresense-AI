import { determineDomain } from '../utils/domainFramework';
import { CandidateReport } from '../models/memoryDb';

const calculateFinalScore = (extractedData: any): { total: number, breakdown: any } => {
    // Strict 100-point weights: Domain(35), Skills(25), Experience(15), Education(10), Certs(10), Support(5)
    
    let domainScore = extractedData.isExactMatch ? 35 : 15;
    
    // Skills only score if they are linked to a specific 'work_experience' ID
    let skillsScore = 0;
    const hasLinkedSkills = extractedData.skills && extractedData.skills.some((s: any) => s.work_experience_id);
    if (hasLinkedSkills) {
        skillsScore = extractedData.isExactMatch ? 25 : 10;
    }

    let expScore = extractedData.isExactMatch ? 15 : 8;
    let eduScore = 10;
    let certsScore = extractedData.isExactMatch ? 10 : 2;
    let supportScore = 5;

    const total = domainScore + skillsScore + expScore + eduScore + certsScore + supportScore;

    return {
        total,
        breakdown: {
            total,
            domainRelevance: domainScore,
            skillMatch: skillsScore,
            experienceMatch: expScore,
            educationMatch: eduScore,
            certifications: certsScore,
            supportingSkills: supportScore
        }
    };
};

export const generateReport = (filename: string, jobRole: string, isReassess: boolean = false, rawText: string = ''): CandidateReport => {
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
    
    // Simulated JSON extraction containing work_experience_id mappings 
    const extractedData = {
        isExactMatch,
        skills: [
            { name: "Core Technique", work_experience_id: "exp_01" }
        ]
    };

    const { total: baseScore, breakdown: scoreBreakdown } = calculateFinalScore(extractedData);

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
