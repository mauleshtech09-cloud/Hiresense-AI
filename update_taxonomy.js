const fs = require('fs');

const dataRaw = fs.readFileSync('c:/Antigravity/HireSense/Hiresense-AI/frontend/src/data/taxonomy.json', 'utf8');
const taxonomy = JSON.parse(dataRaw);

const newIndustries = [
  {
    "id": "33-0000",
    "name": "Protective Service Occupations",
    "roles": [
      {
        "title": "Police Officer",
        "type": "Common",
        "skills": ["Law Enforcement", "Patrol", "Crisis Negotiation", "Incident Reporting"],
        "weights": { "domain": 20, "skills": 20, "experience": 25, "education": 10, "certs": 20, "support": 5 }
      },
      {
        "title": "Firefighter",
        "type": "Common",
        "skills": ["Emergency Response", "Fire Suppression", "Rescue Operations", "Hazmat Handling"],
        "weights": { "domain": 20, "skills": 20, "experience": 25, "education": 10, "certs": 20, "support": 5 }
      },
      {
        "title": "Security Guard",
        "type": "Common",
        "skills": ["Surveillance", "Access Control", "Incident Logging", "Physical Security"],
        "weights": { "domain": 25, "skills": 20, "experience": 20, "education": 10, "certs": 15, "support": 10 }
      },
      {
        "title": "Correctional Officer",
        "type": "Common",
        "skills": ["Inmate Supervision", "Conflict Resolution", "Facility Inspection", "Security Protocol"],
        "weights": { "domain": 25, "skills": 20, "experience": 20, "education": 10, "certs": 15, "support": 10 }
      },
      {
        "title": "Private Investigator",
        "type": "Common",
        "skills": ["Background Checks", "Surveillance Techniques", "Evidence Collection", "Interrogation"],
        "weights": { "domain": 25, "skills": 25, "experience": 20, "education": 5, "certs": 20, "support": 5 }
      },
      {
        "title": "TSA Screener",
        "type": "Common",
        "skills": ["Baggage Screening", "Threat Detection", "Passenger Inspection", "X-Ray Operations"],
        "weights": { "domain": 30, "skills": 20, "experience": 15, "education": 10, "certs": 15, "support": 10 }
      },
      {
        "title": "Animal Control Officer",
        "type": "Common",
        "skills": ["Animal Capture", "Public Safety", "Veterinary First Aid", "Citation Issuance"],
        "weights": { "domain": 30, "skills": 20, "experience": 15, "education": 10, "certs": 15, "support": 10 }
      },
      {
        "title": "Cybersecurity First Responder",
        "type": "Rare",
        "skills": ["Digital Forensics", "Incident Triage", "Network Isolation", "Malware Analysis"],
        "weights": { "domain": 45, "skills": 15, "experience": 15, "education": 5, "certs": 15, "support": 5 }
      },
      {
        "title": "Counter-Terrorism Analyst",
        "type": "Rare",
        "skills": ["Threat Intelligence", "OSINT", "Geopolitical Analysis", "Signal Interception"],
        "weights": { "domain": 50, "skills": 10, "experience": 15, "education": 5, "certs": 15, "support": 5 }
      },
      {
        "title": "VIP Protection",
        "type": "Rare",
        "skills": ["Close Protection", "Route Reconnaissance", "Evasive Driving", "Crowd Control"],
        "weights": { "domain": 45, "skills": 15, "experience": 15, "education": 5, "certs": 15, "support": 5 }
      }
    ]
  },
  {
    "id": "35-0000",
    "name": "Food Preparation and Serving Related",
    "roles": [
      {
        "title": "Head Chef",
        "type": "Common",
        "skills": ["Menu Creation", "Kitchen Management", "Food Costing", "Culinary Techniques"],
        "weights": { "domain": 10, "skills": 40, "experience": 35, "education": 5, "certs": 5, "support": 5 }
      },
      {
        "title": "Line Cook",
        "type": "Common",
        "skills": ["Station Setup", "Grill Operations", "Prep Work", "Sanitation Standards"],
        "weights": { "domain": 10, "skills": 45, "experience": 30, "education": 5, "certs": 5, "support": 5 }
      },
      {
        "title": "Server",
        "type": "Common",
        "skills": ["Order Taking", "Table Service", "Menu Knowledge", "Upselling"],
        "weights": { "domain": 10, "skills": 45, "experience": 30, "education": 0, "certs": 5, "support": 10 }
      },
      {
        "title": "Bartender",
        "type": "Common",
        "skills": ["Mixology", "Customer Service", "Inventory Control", "Cash Handling"],
        "weights": { "domain": 10, "skills": 40, "experience": 35, "education": 0, "certs": 5, "support": 10 }
      },
      {
        "title": "Barista",
        "type": "Common",
        "skills": ["Espresso Extraction", "Latte Art", "Customer Engagement", "Machine Maintenance"],
        "weights": { "domain": 15, "skills": 40, "experience": 30, "education": 0, "certs": 5, "support": 10 }
      },
      {
        "title": "Food Prep Worker",
        "type": "Common",
        "skills": ["Ingredient Chopping", "Portion Control", "Cleaning", "Storage Operations"],
        "weights": { "domain": 15, "skills": 40, "experience": 30, "education": 0, "certs": 5, "support": 10 }
      },
      {
        "title": "Baker",
        "type": "Common",
        "skills": ["Dough Preparation", "Pastry Design", "Oven Management", "Recipe Scaling"],
        "weights": { "domain": 10, "skills": 45, "experience": 35, "education": 0, "certs": 5, "support": 5 }
      },
      {
        "title": "Molecular Gastronomist",
        "type": "Rare",
        "skills": ["Spherification", "Food Chemistry", "Liquid Nitrogen Cooling", "Texture Manipulation"],
        "weights": { "domain": 50, "skills": 25, "experience": 15, "education": 5, "certs": 0, "support": 5 }
      },
      {
        "title": "Food Stylist",
        "type": "Rare",
        "skills": ["Plating Aesthetics", "Photography Lighting", "Prop Selection", "Edible Adhesives"],
        "weights": { "domain": 45, "skills": 30, "experience": 15, "education": 5, "certs": 0, "support": 5 }
      },
      {
        "title": "Sensory Analyst",
        "type": "Rare",
        "skills": ["Flavor Profiling", "Panel Testing", "Statistics", "Aroma Recognition"],
        "weights": { "domain": 50, "skills": 25, "experience": 15, "education": 5, "certs": 0, "support": 5 }
      }
    ]
  },
  {
    "id": "37-0000",
    "name": "Building and Grounds Cleaning/Maintenance",
    "roles": [
      {
        "title": "Janitor",
        "type": "Common",
        "skills": ["Floor Polishing", "Waste Disposal", "Restroom Sanitization", "Inventory Restocking"],
        "weights": { "domain": 25, "skills": 30, "experience": 30, "education": 5, "certs": 0, "support": 10 }
      },
      {
        "title": "Landscaper",
        "type": "Common",
        "skills": ["Lawn Maintenance", "Planting", "Irrigation Systems", "Fertilizer Application"],
        "weights": { "domain": 25, "skills": 35, "experience": 25, "education": 0, "certs": 5, "support": 10 }
      },
      {
        "title": "Pest Control Worker",
        "type": "Common",
        "skills": ["Extermination Techniques", "Chemical Spraying", "Infestation Assessment", "Safety Compliance"],
        "weights": { "domain": 30, "skills": 25, "experience": 25, "education": 5, "certs": 10, "support": 5 }
      },
      {
        "title": "Maintenance Worker",
        "type": "Common",
        "skills": ["Plumbing Repair", "HVAC Troubleshooting", "Electrical Basics", "Carpentry"],
        "weights": { "domain": 25, "skills": 35, "experience": 30, "education": 5, "certs": 0, "support": 5 }
      },
      {
        "title": "Housekeeper",
        "type": "Common",
        "skills": ["Room Detailing", "Laundry Operations", "Stain Removal", "Guest Relations"],
        "weights": { "domain": 20, "skills": 35, "experience": 30, "education": 0, "certs": 0, "support": 15 }
      },
      {
        "title": "Facilities Groundskeeper",
        "type": "Common",
        "skills": ["Turf Management", "Snow Removal", "Equipment Maintenance", "Hardscaping"],
        "weights": { "domain": 25, "skills": 30, "experience": 30, "education": 0, "certs": 5, "support": 10 }
      },
      {
        "title": "Pool Cleaner",
        "type": "Common",
        "skills": ["Water Chemistry", "Filter Maintenance", "Pump Repair", "Vacuum Operations"],
        "weights": { "domain": 30, "skills": 30, "experience": 25, "education": 0, "certs": 10, "support": 5 }
      },
      {
        "title": "Smart Building Maintenance",
        "type": "Rare",
        "skills": ["IoT Sensor Calibration", "Automated HVAC", "Energy Grid Diagnostics", "Software Troubleshooting"],
        "weights": { "domain": 45, "skills": 30, "experience": 15, "education": 5, "certs": 0, "support": 5 }
      },
      {
        "title": "Vertical Forest Specialist",
        "type": "Rare",
        "skills": ["Urban Arboriculture", "Aeroponics", "High-Rise Rigging", "Micro-climate Management"],
        "weights": { "domain": 50, "skills": 25, "experience": 10, "education": 5, "certs": 5, "support": 5 }
      },
      {
        "title": "Bio-Hazard Remediation",
        "type": "Rare",
        "skills": ["Pathogen Decontamination", "Crime Scene Cleanup", "Protective Gear Protocol", "Chemical Disposal"],
        "weights": { "domain": 45, "skills": 25, "experience": 15, "education": 0, "certs": 10, "support": 5 }
      }
    ]
  },
  {
    "id": "39-0000",
    "name": "Personal Care and Service",
    "roles": [
      {
        "title": "Hair Stylist",
        "type": "Common",
        "skills": ["Hair Cutting", "Coloring Techniques", "Client Consultation", "Salon Hygiene"],
        "weights": { "domain": 30, "skills": 35, "experience": 20, "education": 5, "certs": 5, "support": 5 }
      },
      {
        "title": "Massage Therapist",
        "type": "Common",
        "skills": ["Deep Tissue", "Anatomy Knowledge", "Trigger Point Therapy", "Client Relaxation"],
        "weights": { "domain": 30, "skills": 30, "experience": 20, "education": 5, "certs": 10, "support": 5 }
      },
      {
        "title": "Childcare Worker",
        "type": "Common",
        "skills": ["Early Education", "Activity Planning", "Behavior Management", "Pediatric CPR"],
        "weights": { "domain": 25, "skills": 25, "experience": 25, "education": 10, "certs": 10, "support": 5 }
      },
      {
        "title": "Fitness Trainer",
        "type": "Common",
        "skills": ["Workout Programming", "Nutritional Guidance", "Form Correction", "Client Motivation"],
        "weights": { "domain": 25, "skills": 30, "experience": 25, "education": 5, "certs": 10, "support": 5 }
      },
      {
        "title": "Tour Guide",
        "type": "Common",
        "skills": ["Public Speaking", "Historical Knowledge", "Group Management", "Conflict Resolution"],
        "weights": { "domain": 30, "skills": 25, "experience": 25, "education": 10, "certs": 0, "support": 10 }
      },
      {
        "title": "Manicurist",
        "type": "Common",
        "skills": ["Nail Art", "Cuticle Care", "Acrylic Application", "Sanitation Procedures"],
        "weights": { "domain": 25, "skills": 35, "experience": 25, "education": 0, "certs": 10, "support": 5 }
      },
      {
        "title": "Pet Groomer",
        "type": "Common",
        "skills": ["Animal Restraint", "Coat Clipping", "Breed Standards", "Nail Trimming"],
        "weights": { "domain": 30, "skills": 30, "experience": 25, "education": 0, "certs": 5, "support": 10 }
      },
      {
        "title": "Bio-Hacking Coach",
        "type": "Rare",
        "skills": ["Nutrigenomics", "Sleep Optimization", "Wearable Analytics", "Cold Exposure Protocol"],
        "weights": { "domain": 45, "skills": 25, "experience": 15, "education": 10, "certs": 0, "support": 5 }
      },
      {
        "title": "Virtual Identity Stylist",
        "type": "Rare",
        "skills": ["Avatar Customization", "AR Wardrobe Design", "Digital Persona Branding", "Metaverse Aesthetics"],
        "weights": { "domain": 50, "skills": 25, "experience": 10, "education": 5, "certs": 0, "support": 10 }
      },
      {
        "title": "End-of-Life Doula",
        "type": "Rare",
        "skills": ["Grief Counseling", "Legacy Project Planning", "Comfort Care", "Family Mediation"],
        "weights": { "domain": 45, "skills": 20, "experience": 20, "education": 5, "certs": 5, "support": 5 }
      }
    ]
  },
  {
    "id": "41-0000",
    "name": "Sales and Related",
    "roles": [
      {
        "title": "Retail Sales Associate",
        "type": "Common",
        "skills": ["Customer Service", "POS Operations", "Visual Merchandising", "Product Knowledge"],
        "weights": { "domain": 10, "skills": 40, "experience": 30, "education": 5, "certs": 0, "support": 15 }
      },
      {
        "title": "Real Estate Agent",
        "type": "Common",
        "skills": ["Property Valuation", "Contract Negotiation", "Client Prospecting", "Market Analysis"],
        "weights": { "domain": 10, "skills": 45, "experience": 35, "education": 0, "certs": 5, "support": 5 }
      },
      {
        "title": "B2B Sales Representative",
        "type": "Common",
        "skills": ["Cold Calling", "Sales Presentations", "Pipeline Management", "CRM Software"],
        "weights": { "domain": 10, "skills": 45, "experience": 35, "education": 5, "certs": 0, "support": 5 }
      },
      {
        "title": "Insurance Sales Agent",
        "type": "Common",
        "skills": ["Policy Explanation", "Risk Assessment", "Lead Generation", "Client Retention"],
        "weights": { "domain": 10, "skills": 40, "experience": 35, "education": 5, "certs": 5, "support": 5 }
      },
      {
        "title": "Telemarketer",
        "type": "Common",
        "skills": ["Script Adherence", "Objection Handling", "High Volume Dialing", "Data Entry"],
        "weights": { "domain": 10, "skills": 40, "experience": 35, "education": 0, "certs": 0, "support": 15 }
      },
      {
        "title": "Sales Engineer",
        "type": "Common",
        "skills": ["Technical Presentations", "Product Demos", "Solution Architecting", "Proposal Writing"],
        "weights": { "domain": 15, "skills": 40, "experience": 35, "education": 5, "certs": 0, "support": 5 }
      },
      {
        "title": "Route Sales Driver",
        "type": "Common",
        "skills": ["Delivery Logistics", "Account Maintenance", "Invoice Processing", "Inventory Stocking"],
        "weights": { "domain": 10, "skills": 40, "experience": 35, "education": 0, "certs": 5, "support": 10 }
      },
      {
        "title": "SaaS Growth Hacker",
        "type": "Rare",
        "skills": ["Viral Coefficient Modeling", "Conversion Rate Optimization", "Automated Funnels", "A/B Testing"],
        "weights": { "domain": 45, "skills": 35, "experience": 15, "education": 0, "certs": 0, "support": 5 }
      },
      {
        "title": "High-Ticket Closer",
        "type": "Rare",
        "skills": ["Psychological Selling", "Value Articulation", "Deal Structuring", "Objection Reversal"],
        "weights": { "domain": 50, "skills": 30, "experience": 15, "education": 0, "certs": 0, "support": 5 }
      },
      {
        "title": "Customer Success Architect",
        "type": "Rare",
        "skills": ["Churn Mitigation", "Onboarding Strategy", "Account Expansion", "Health Metric Tracking"],
        "weights": { "domain": 45, "skills": 30, "experience": 15, "education": 5, "certs": 0, "support": 5 }
      }
    ]
  }
];

taxonomy.industries.push(...newIndustries);

fs.writeFileSync('c:/Antigravity/HireSense/Hiresense-AI/frontend/src/data/taxonomy.json', JSON.stringify(taxonomy, null, 2));
console.log('Successfully added the new industries.');
