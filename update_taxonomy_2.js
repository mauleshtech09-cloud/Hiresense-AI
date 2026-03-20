const fs = require('fs');

const path = 'c:/Antigravity/HireSense/Hiresense-AI/frontend/src/data/taxonomy.json';
const dataRaw = fs.readFileSync(path, 'utf8');
const taxonomy = JSON.parse(dataRaw);

const newIndustries = [
  {
    "id": "21-0000",
    "name": "Community and Social Service",
    "roles": [
      {
        "title": "Clinical Social Worker",
        "type": "Common",
        "skills": ["Case Management", "Psychosocial Assessment", "Crisis Intervention", "Treatment Planning"],
        "weights": { "domain": 30, "skills": 25, "experience": 20, "education": 20, "certs": 0, "support": 5 }
      },
      {
        "title": "Substance Abuse Counselor",
        "type": "Common",
        "skills": ["Addiction Therapy", "Motivational Interviewing", "Relapse Prevention", "Group Therapy"],
        "weights": { "domain": 30, "skills": 25, "experience": 25, "education": 15, "certs": 0, "support": 5 }
      },
      {
        "title": "Marriage and Family Therapist",
        "type": "Common",
        "skills": ["Family Systems", "Couples Therapy", "Diagnostic Assessment", "Mediation"],
        "weights": { "domain": 30, "skills": 25, "experience": 20, "education": 20, "certs": 0, "support": 5 }
      },
      {
        "title": "Rehabilitation Counselor",
        "type": "Common",
        "skills": ["Vocational Assessment", "Case Management", "ADA Compliance", "Career Counseling"],
        "weights": { "domain": 30, "skills": 25, "experience": 20, "education": 20, "certs": 0, "support": 5 }
      },
      {
        "title": "Health Educator",
        "type": "Common",
        "skills": ["Program Development", "Public Health", "Curriculum Design", "Community Outreach"],
        "weights": { "domain": 30, "skills": 25, "experience": 20, "education": 20, "certs": 0, "support": 5 }
      },
      {
        "title": "Community Health Worker",
        "type": "Common",
        "skills": ["Patient Navigation", "Health Advocacy", "Resource Allocation", "Field Data Collection"],
        "weights": { "domain": 25, "skills": 30, "experience": 25, "education": 15, "certs": 0, "support": 5 }
      },
      {
        "title": "Probation Officer",
        "type": "Common",
        "skills": ["Parole Compliance", "Risk Assessment", "Legal Documentation", "Criminal Justice Software"],
        "weights": { "domain": 30, "skills": 25, "experience": 25, "education": 15, "certs": 0, "support": 5 }
      },
      {
        "title": "Digital Wellbeing Consultant",
        "type": "Rare",
        "skills": ["Screen Time Management", "Tech Addiction Therapy", "Cyberbullying Intervention", "Digital Detox Planning"],
        "weights": { "domain": 50, "skills": 20, "experience": 15, "education": 10, "certs": 0, "support": 5 }
      },
      {
        "title": "Geriatric Care Manager",
        "type": "Rare",
        "skills": ["Elder Care Planning", "Medicare Navigation", "Dementia Support", "Family Mediation"],
        "weights": { "domain": 50, "skills": 20, "experience": 20, "education": 5, "certs": 0, "support": 5 }
      },
      {
        "title": "Refugee Integration Specialist",
        "type": "Rare",
        "skills": ["Cross-Cultural Counseling", "Asylum Law Basics", "Trauma-Informed Care", "Language Acquisition Support"],
        "weights": { "domain": 50, "skills": 20, "experience": 15, "education": 10, "certs": 0, "support": 5 }
      }
    ]
  },
  {
    "id": "23-0000",
    "name": "Legal Occupations",
    "roles": [
      {
        "title": "Corporate Attorney",
        "type": "Common",
        "skills": ["Mergers & Acquisitions", "Contract Negotiation", "Securities Regulation", "Corporate Governance"],
        "weights": { "domain": 40, "skills": 20, "experience": 15, "education": 5, "certs": 15, "support": 5 }
      },
      {
        "title": "Intellectual Property Lawyer",
        "type": "Common",
        "skills": ["Patent Prosecution", "Trademark Registration", "Copyright Law", "IP Portfolio"],
        "weights": { "domain": 40, "skills": 20, "experience": 15, "education": 5, "certs": 15, "support": 5 }
      },
      {
        "title": "Paralegal",
        "type": "Common",
        "skills": ["Legal Research", "Document Discovery", "LexisNexis/Westlaw", "Pleadings Drafting"],
        "weights": { "domain": 40, "skills": 20, "experience": 15, "education": 5, "certs": 15, "support": 5 }
      },
      {
        "title": "Compliance Officer",
        "type": "Common",
        "skills": ["Regulatory Audits", "Risk Mitigation", "Anti-Money Laundering", "Policy Formulation"],
        "weights": { "domain": 40, "skills": 20, "experience": 15, "education": 5, "certs": 15, "support": 5 }
      },
      {
        "title": "Title Examiner",
        "type": "Common",
        "skills": ["Deed Analysis", "Property Law", "Real Estate Tax", "Escrow Processes"],
        "weights": { "domain": 40, "skills": 25, "experience": 10, "education": 5, "certs": 15, "support": 5 }
      },
      {
        "title": "Arbitrator",
        "type": "Common",
        "skills": ["Dispute Resolution", "Mediation", "Conflict De-escalation", "Evidence Evaluation"],
        "weights": { "domain": 40, "skills": 15, "experience": 20, "education": 5, "certs": 15, "support": 5 }
      },
      {
        "title": "Litigation Consultant",
        "type": "Common",
        "skills": ["Trial Strategy", "Jury Selection", "Witness Preparation", "Case Analytics"],
        "weights": { "domain": 40, "skills": 20, "experience": 15, "education": 5, "certs": 15, "support": 5 }
      },
      {
        "title": "Smart Contract Auditor",
        "type": "Rare",
        "skills": ["Solidity Auditing", "Decentralized Arbitration", "On-Chain Forensics", "Crypto Regulations"],
        "weights": { "domain": 50, "skills": 15, "experience": 10, "education": 5, "certs": 15, "support": 5 }
      },
      {
        "title": "Legal Technologist",
        "type": "Rare",
        "skills": ["Legal Operations", "E-Discovery Management", "Workflow Automation", "Legal Analytics"],
        "weights": { "domain": 45, "skills": 20, "experience": 10, "education": 5, "certs": 15, "support": 5 }
      },
      {
        "title": "IP Strategist for AI",
        "type": "Rare",
        "skills": ["AI Copyright Law", "Patent Strategy", "Open Source Licensing", "Tech Transfer Agreements"],
        "weights": { "domain": 50, "skills": 15, "experience": 10, "education": 5, "certs": 15, "support": 5 }
      }
    ]
  },
  {
    "id": "25-0000",
    "name": "Educational Instruction and Library",
    "roles": [
      {
        "title": "Curriculum Developer",
        "type": "Common",
        "skills": ["Instructional Design", "LMS Integration", "Needs Assessment", "Standardized Testing"],
        "weights": { "domain": 25, "skills": 25, "experience": 20, "education": 25, "certs": 0, "support": 5 }
      },
      {
        "title": "Special Education Teacher",
        "type": "Common",
        "skills": ["IEP Development", "Behavior Management", "Adaptive Technologies", "Autism Support"],
        "weights": { "domain": 25, "skills": 20, "experience": 20, "education": 30, "certs": 0, "support": 5 }
      },
      {
        "title": "University Professor",
        "type": "Common",
        "skills": ["Academic Research", "Grant Writing", "Lecture Delivery", "Peer Review"],
        "weights": { "domain": 30, "skills": 15, "experience": 20, "education": 30, "certs": 0, "support": 5 }
      },
      {
        "title": "Instructional Coordinator",
        "type": "Common",
        "skills": ["Teacher Assessment", "Curriculum Mapping", "Professional Development", "Data-Driven Instruction"],
        "weights": { "domain": 25, "skills": 25, "experience": 20, "education": 25, "certs": 0, "support": 5 }
      },
      {
        "title": "Academic Librarian",
        "type": "Common",
        "skills": ["Information Literacy", "Archive Management", "Cataloging Systems", "Database Research"],
        "weights": { "domain": 25, "skills": 20, "experience": 20, "education": 30, "certs": 0, "support": 5 }
      },
      {
        "title": "E-Learning Specialist",
        "type": "Common",
        "skills": ["Articulate Storyline", "SCORM", "Video Course Editing", "Gamification"],
        "weights": { "domain": 25, "skills": 30, "experience": 20, "education": 20, "certs": 0, "support": 5 }
      },
      {
        "title": "School Counselor",
        "type": "Common",
        "skills": ["College Admissions", "Mental Health Triage", "Bullying Prevention", "Test Administration"],
        "weights": { "domain": 25, "skills": 20, "experience": 20, "education": 30, "certs": 0, "support": 5 }
      },
      {
        "title": "EdTech Experience Designer",
        "type": "Rare",
        "skills": ["UX/UI for EdTech", "Gamified Learning", "Accessibility Standards", "Interactive Media"],
        "weights": { "domain": 45, "skills": 20, "experience": 10, "education": 20, "certs": 0, "support": 5 }
      },
      {
        "title": "Learning Analytics Specialist",
        "type": "Rare",
        "skills": ["Educational Data Mining", "Student Success Modeling", "Predictive Analytics", "LMS Admin"],
        "weights": { "domain": 50, "skills": 15, "experience": 10, "education": 20, "certs": 0, "support": 5 }
      },
      {
        "title": "Micro-credentialing Strategist",
        "type": "Rare",
        "skills": ["Digital Badging", "Skills Taxonomy Mapping", "Workforce Alignment", "Credential Frameworks"],
        "weights": { "domain": 45, "skills": 20, "experience": 10, "education": 20, "certs": 0, "support": 5 }
      }
    ]
  },
  {
    "id": "27-0000",
    "name": "Arts, Design, Entertainment, Sports, and Media",
    "roles": [
      {
        "title": "Art Director",
        "type": "Common",
        "skills": ["Visual Storytelling", "Brand Identity", "Adobe Creative Suite", "Typography"],
        "weights": { "domain": 20, "skills": 45, "experience": 20, "education": 10, "certs": 0, "support": 5 }
      },
      {
        "title": "Graphic Designer",
        "type": "Common",
        "skills": ["Vector Layouts", "Illustration", "InDesign", "Print Production"],
        "weights": { "domain": 15, "skills": 50, "experience": 20, "education": 10, "certs": 0, "support": 5 }
      },
      {
        "title": "Video Editor",
        "type": "Common",
        "skills": ["Premiere Pro", "After Effects", "Color Grading", "Audio Mixing"],
        "weights": { "domain": 15, "skills": 45, "experience": 25, "education": 10, "certs": 0, "support": 5 }
      },
      {
        "title": "Copywriter",
        "type": "Common",
        "skills": ["SEO Content", "Advertising Copy", "Proofreading", "A/B Concepting"],
        "weights": { "domain": 20, "skills": 45, "experience": 20, "education": 10, "certs": 0, "support": 5 }
      },
      {
        "title": "Broadcast Technician",
        "type": "Common",
        "skills": ["Signal Routing", "Live Streaming", "A/V Equipment", "Transmission Control"],
        "weights": { "domain": 20, "skills": 45, "experience": 20, "education": 10, "certs": 0, "support": 5 }
      },
      {
        "title": "User Interface Designer",
        "type": "Common",
        "skills": ["Figma", "Component Libraries", "Prototyping", "Interaction Design"],
        "weights": { "domain": 15, "skills": 50, "experience": 20, "education": 10, "certs": 0, "support": 5 }
      },
      {
        "title": "Public Relations Specialist",
        "type": "Common",
        "skills": ["Media Pitching", "Crisis Communication", "Press Releases", "Campaign Analytics"],
        "weights": { "domain": 20, "skills": 45, "experience": 20, "education": 10, "certs": 0, "support": 5 }
      },
      {
        "title": "VR/AR Experience Designer",
        "type": "Rare",
        "skills": ["Spatial Computing", "Unity/Unreal Engine", "3D Modeling", "Immersive Narrative"],
        "weights": { "domain": 45, "skills": 45, "experience": 5, "education": 0, "certs": 0, "support": 5 }
      },
      {
        "title": "Prompt Engineer (Creative)",
        "type": "Rare",
        "skills": ["Midjourney Tuning", "Latent Space Exploration", "AI Model Fine-tuning", "Generative Concepting"],
        "weights": { "domain": 45, "skills": 45, "experience": 5, "education": 0, "certs": 0, "support": 5 }
      },
      {
        "title": "Sound Scraper/Audio Forensics",
        "type": "Rare",
        "skills": ["Audio Restoration", "Spectral Analysis", "Acoustic Fingerprinting", "Noise Reduction"],
        "weights": { "domain": 50, "skills": 45, "experience": 0, "education": 0, "certs": 0, "support": 5 }
      }
    ]
  },
  {
    "id": "29-0000",
    "name": "Healthcare Practitioners and Technical",
    "roles": [
      {
        "title": "Registered Nurse",
        "type": "Common",
        "skills": ["Patient Assessment", "IV Therapy", "EHR Systems", "BLS/ACLS"],
        "weights": { "domain": 40, "skills": 15, "experience": 15, "education": 10, "certs": 15, "support": 5 }
      },
      {
        "title": "Physical Therapist",
        "type": "Common",
        "skills": ["Kinesiology", "Manual Therapy", "Gait Analysis", "Rehabilitation Programming"],
        "weights": { "domain": 40, "skills": 15, "experience": 15, "education": 10, "certs": 15, "support": 5 }
      },
      {
        "title": "Pharmacist",
        "type": "Common",
        "skills": ["Pharmacokinetics", "Drug Interactions", "Sterile Compounding", "Patient Counseling"],
        "weights": { "domain": 45, "skills": 15, "experience": 10, "education": 10, "certs": 15, "support": 5 }
      },
      {
        "title": "Medical Technologist",
        "type": "Common",
        "skills": ["Clinical Chemistry", "Hematology Analysis", "LIMS", "Pathogen Culturing"],
        "weights": { "domain": 40, "skills": 20, "experience": 10, "education": 10, "certs": 15, "support": 5 }
      },
      {
        "title": "Radiologic Technologist",
        "type": "Common",
        "skills": ["MRI Operations", "CT Scanning", "Radiation Safety", "Image Quality Control"],
        "weights": { "domain": 40, "skills": 20, "experience": 10, "education": 10, "certs": 15, "support": 5 }
      },
      {
        "title": "Dietitian",
        "type": "Common",
        "skills": ["Medical Nutrition Therapy", "Anthropometric Assessment", "Menu Planning", "Malnutrition Diagnosis"],
        "weights": { "domain": 40, "skills": 15, "experience": 15, "education": 10, "certs": 15, "support": 5 }
      },
      {
        "title": "Respiratory Therapist",
        "type": "Common",
        "skills": ["Ventilator Management", "Blood Gas Analysis", "Airway Clearance", "Pulmonary Function Testing"],
        "weights": { "domain": 40, "skills": 15, "experience": 15, "education": 10, "certs": 15, "support": 5 }
      },
      {
        "title": "Telemedicine Specialist",
        "type": "Rare",
        "skills": ["Virtual Diagnostics", "HIPAA Compliance", "Remote Patient Monitoring", "Digital Triage"],
        "weights": { "domain": 50, "skills": 10, "experience": 10, "education": 10, "certs": 15, "support": 5 }
      },
      {
        "title": "Bio-Informatics Clinician",
        "type": "Rare",
        "skills": ["Clinical Data Modeling", "Genomic Integration", "EHR Optimization", "Healthcare Analytics"],
        "weights": { "domain": 50, "skills": 10, "experience": 10, "education": 10, "certs": 15, "support": 5 }
      },
      {
        "title": "Genomic Counselor",
        "type": "Rare",
        "skills": ["Genetic Risk Assessment", "Patient Advocacy", "Pedigree Analysis", "Variant Interpretation"],
        "weights": { "domain": 50, "skills": 10, "experience": 10, "education": 10, "certs": 15, "support": 5 }
      }
    ]
  }
];

// Replace existing industries with these updated ones or append if missing
const idsToReplace = newIndustries.map(ind => ind.id);
taxonomy.industries = taxonomy.industries.filter(ind => !idsToReplace.includes(ind.id));
taxonomy.industries.push(...newIndustries);

// Sort them back by ID to keep it tidy
taxonomy.industries.sort((a, b) => a.id.localeCompare(b.id));

fs.writeFileSync(path, JSON.stringify(taxonomy, null, 2));
console.log('Successfully updated the feature-1 taxonomy.json with Industry 3.txt batch.');
