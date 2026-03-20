const fs = require('fs');

const path = 'c:/Antigravity/HireSense/Hiresense-AI/frontend/src/data/taxonomy.json';
const dataRaw = fs.readFileSync(path, 'utf8');
const taxonomy = JSON.parse(dataRaw);

const newIndustries = [
  // INDUSTRY 6
  {
    "id": "31-0000",
    "name": "Healthcare Support Occupations",
    "roles": [
      { "title": "Home Health Aide", "type": "Common", "skills": ["Personal Care", "Vitals Monitoring", "Mobility Assistance", "Patient Hygiene"], "weights": { "domain": 40, "skills": 20, "experience": 20, "education": 5, "certs": 10, "support": 5 } },
      { "title": "Nursing Assistant", "type": "Common", "skills": ["Clinical Support", "Bedside Care", "Charting", "Infection Control"], "weights": { "domain": 40, "skills": 20, "experience": 15, "education": 5, "certs": 15, "support": 5 } },
      { "title": "Medical Transcriptionist", "type": "Common", "skills": ["Dictation Analysis", "Anatomy Knowledge", "Typing Accurancy", "EHR Navigation"], "weights": { "domain": 45, "skills": 25, "experience": 15, "education": 0, "certs": 10, "support": 5 } },
      { "title": "Phlebotomist", "type": "Common", "skills": ["Venipuncture", "Specimen Labeling", "Tourniquet Application", "Biohazard Safety"], "weights": { "domain": 40, "skills": 20, "experience": 15, "education": 5, "certs": 15, "support": 5 } },
      { "title": "Physical Therapy Aide", "type": "Common", "skills": ["Equipment Setup", "Patient Escort", "Treatment Prep", "Sanitation"], "weights": { "domain": 40, "skills": 15, "experience": 20, "education": 5, "certs": 10, "support": 10 } },
      { "title": "Dental Assistant", "type": "Common", "skills": ["Chairside Assisting", "Instrument Sterilization", "X-Ray Processing", "Patient Prep"], "weights": { "domain": 40, "skills": 20, "experience": 15, "education": 5, "certs": 15, "support": 5 } },
      { "title": "Pharmacy Aide", "type": "Common", "skills": ["Inventory Stocking", "Prescription Labeling", "Clerical Duties", "Customer Service"], "weights": { "domain": 45, "skills": 15, "experience": 15, "education": 5, "certs": 10, "support": 10 } },
      { "title": "Patient Experience Designer", "type": "Rare", "skills": ["Journey Mapping", "Empathy Interviewing", "Facility Aesthetics", "Service Protocols"], "weights": { "domain": 45, "skills": 25, "experience": 15, "education": 10, "certs": 0, "support": 5 } },
      { "title": "Post-Acute Care Transition Specialist", "type": "Rare", "skills": ["Discharge Planning", "Home Evaluaton", "Care Coordination", "Readmission Mitigation"], "weights": { "domain": 50, "skills": 20, "experience": 15, "education": 10, "certs": 0, "support": 5 } },
      { "title": "Home Health Informatics Liaison", "type": "Rare", "skills": ["Remote Telemetry", "Data Interoperability", "Tech Onboarding", "Wearable Syncing"], "weights": { "domain": 45, "skills": 25, "experience": 10, "education": 10, "certs": 5, "support": 5 } }
    ]
  },
  {
    "id": "71-0000",
    "name": "Smart Manufacturing and Industry 4.0",
    "roles": [
      { "title": "Automation Engineer", "type": "Common", "skills": ["PLC Programming", "HMI Development", "Motor Drives", "System Integration"], "weights": { "domain": 20, "skills": 40, "experience": 20, "education": 15, "certs": 0, "support": 5 } },
      { "title": "Industrial IoT Developer", "type": "Common", "skills": ["Sensor Connectivity", "MQTT/OPC-UA", "Edge Computing", "Data Streaming"], "weights": { "domain": 15, "skills": 40, "experience": 20, "education": 20, "certs": 0, "support": 5 } },
      { "title": "Mechatronics Technician", "type": "Common", "skills": ["Electromechanical Repair", "Pneumatic Control", "Robotic Arm Tuning", "Preventative Maintenance"], "weights": { "domain": 20, "skills": 35, "experience": 25, "education": 15, "certs": 0, "support": 5 } },
      { "title": "SCADA Operator", "type": "Common", "skills": ["Alarm Management", "Process Visualization", "Historian Data", "Network Security"], "weights": { "domain": 20, "skills": 35, "experience": 20, "education": 15, "certs": 5, "support": 5 } },
      { "title": "Manufacturing Data Analyst", "type": "Common", "skills": ["OEE Calculation", "Predictive Maintenance", "Python Scripting", "Six Sigma"], "weights": { "domain": 20, "skills": 40, "experience": 15, "education": 20, "certs": 0, "support": 5 } },
      { "title": "Machine Vision Programmer", "type": "Common", "skills": ["Image Pattern Logic", "Camera Calibration", "Inspection Algorithms", "Defect Mapping"], "weights": { "domain": 15, "skills": 45, "experience": 15, "education": 20, "certs": 0, "support": 5 } },
      { "title": "AGV Fleet Controller", "type": "Common", "skills": ["Automated Routing", "Lidar Navigation", "Traffic Mapping", "Payload Dynamics"], "weights": { "domain": 20, "skills": 35, "experience": 20, "education": 15, "certs": 5, "support": 5 } },
      { "title": "Digital Twin Architect", "type": "Rare", "skills": ["Virtual Replication", "Simulation Sandboxing", "CAD/CAM Integration", "Real-Time Syncing"], "weights": { "domain": 45, "skills": 35, "experience": 5, "education": 10, "certs": 0, "support": 5 } },
      { "title": "Cyber-Physical Systems Auditor", "type": "Rare", "skills": ["Air-Gapped Assessment", "Hardware Exploitation", "ICS Protocols", "Vulnerability Mapping"], "weights": { "domain": 50, "skills": 35, "experience": 0, "education": 10, "certs": 0, "support": 5 } },
      { "title": "Cobot Integration Specialist", "type": "Rare", "skills": ["Human-Robot Collaboration", "Force Sensing", "Safety Zones", "Task Programming"], "weights": { "domain": 50, "skills": 35, "experience": 0, "education": 10, "certs": 0, "support": 5 } }
    ]
  },
  {
    "id": "73-0000",
    "name": "Neurotechnology and Brain-Computer Interface",
    "roles": [
      { "title": "Neural Systems Engineer", "type": "Common", "skills": ["Electrode Arrays", "Neural Decoding", "Signal Amplification", "Matlab/Python"], "weights": { "domain": 15, "skills": 40, "experience": 20, "education": 20, "certs": 0, "support": 5 } },
      { "title": "EEG Technician", "type": "Common", "skills": ["Electrode Placement", "Brainwave Monitoring", "Artifact Removal", "Clinical Protocols"], "weights": { "domain": 20, "skills": 35, "experience": 20, "education": 15, "certs": 5, "support": 5 } },
      { "title": "Cognitive Data Scientist", "type": "Common", "skills": ["Neural Networks", "Pattern Recognition", "FMRI Processing", "Behavioral Modeling"], "weights": { "domain": 15, "skills": 45, "experience": 15, "education": 20, "certs": 0, "support": 5 } },
      { "title": "Neuro-Hardware Designer", "type": "Common", "skills": ["Microfabrication", "Biocompatible Materials", "Wireless Telemetry", "Implant Prototyping"], "weights": { "domain": 15, "skills": 40, "experience": 20, "education": 20, "certs": 0, "support": 5 } },
      { "title": "Clinical Trial Coordinator", "type": "Common", "skills": ["Protocol Compliance", "Patient Consent", "Data Auditing", "IRB Documentation"], "weights": { "domain": 20, "skills": 35, "experience": 20, "education": 15, "certs": 5, "support": 5 } },
      { "title": "Brain-Machine Interface Programmer", "type": "Common", "skills": ["Motor Cortex Mapping", "Translational Algorithms", "Spike Sorting", "C++"], "weights": { "domain": 15, "skills": 45, "experience": 15, "education": 20, "certs": 0, "support": 5 } },
      { "title": "Neuro-Rehabilitation Engineer", "type": "Common", "skills": ["Prosthetic Synchronization", "Neuroplasticity Logic", "Gait Analysis", "Electrical Stimulation"], "weights": { "domain": 20, "skills": 40, "experience": 15, "education": 20, "certs": 0, "support": 5 } },
      { "title": "BCI UX Architect", "type": "Rare", "skills": ["Intent-to-Action Mapping", "P300 Paradigms", "Cognitive Load Balancing", "Mind-Controlled Interfaces"], "weights": { "domain": 45, "skills": 35, "experience": 5, "education": 10, "certs": 0, "support": 5 } },
      { "title": "Neuro-Ethicist", "type": "Rare", "skills": ["Cognitive Liberty", "Data Privacy Laws", "Mental Integrity", "Philosophical Analysis"], "weights": { "domain": 50, "skills": 20, "experience": 10, "education": 15, "certs": 0, "support": 5 } },
      { "title": "Optogenetics Researcher", "type": "Rare", "skills": ["Light-Sensitive Proteins", "Viral Vector Delivery", "Laser Neuromodulation", "Cellular Targeting"], "weights": { "domain": 45, "skills": 35, "experience": 0, "education": 15, "certs": 0, "support": 5 } }
    ]
  },
  {
    "id": "75-0000",
    "name": "Digital Economy and Fintech Strategy",
    "roles": [
      { "title": "Blockchain Developer", "type": "Common", "skills": ["Solidity/Rust", "Web3 SDK", "Cryptographic Hashing", "Consensus Algorithms"], "weights": { "domain": 15, "skills": 45, "experience": 20, "education": 15, "certs": 0, "support": 5 } },
      { "title": "Smart Contract Auditor", "type": "Common", "skills": ["Reentrancy Checks", "Code Review", "Gas Optimization", "Protocol Fuzzing"], "weights": { "domain": 20, "skills": 40, "experience": 20, "education": 15, "certs": 0, "support": 5 } },
      { "title": "DeFi Product Manager", "type": "Common", "skills": ["Liquidity Pools", "Tokenomics", "Yield Farming", "User Adoption"], "weights": { "domain": 20, "skills": 35, "experience": 25, "education": 15, "certs": 0, "support": 5 } },
      { "title": "Quantitative Trader", "type": "Common", "skills": ["Algorithmic Models", "High-Frequency Tech", "Statistical Arbitrage", "Python/C++"], "weights": { "domain": 15, "skills": 45, "experience": 15, "education": 20, "certs": 0, "support": 5 } },
      { "title": "Fintech Compliance Officer", "type": "Common", "skills": ["AML/KYC", "Regulatory Sandboxes", "Sanctions Screening", "Risk Reporting"], "weights": { "domain": 25, "skills": 35, "experience": 20, "education": 15, "certs": 0, "support": 5 } },
      { "title": "Open Banking Architect", "type": "Common", "skills": ["API Gateways", "Oauth2 Specs", "Core Banking Integration", "Data Federation"], "weights": { "domain": 15, "skills": 40, "experience": 25, "education": 15, "certs": 0, "support": 5 } },
      { "title": "Crypto Treasury Analyst", "type": "Common", "skills": ["Wallet Multisig", "Asset Hedging", "Stablecoin Reserves", "On-Chain Analytics"], "weights": { "domain": 20, "skills": 40, "experience": 20, "education": 15, "certs": 0, "support": 5 } },
      { "title": "CBDC Systems Architect", "type": "Rare", "skills": ["Wholesale Ledger", "Central Bank Protocols", "Offline Transactions", "Interoperability Bridges"], "weights": { "domain": 45, "skills": 35, "experience": 5, "education": 10, "certs": 0, "support": 5 } },
      { "title": "Algorithmic Collateral Manager", "type": "Rare", "skills": ["Dynamic Haircuts", "Flash Loan Mitigation", "Oracle Pricing", "Margin Call Automation"], "weights": { "domain": 45, "skills": 35, "experience": 5, "education": 10, "certs": 0, "support": 5 } },
      { "title": "Meta-Economy Designer", "type": "Rare", "skills": ["Virtual Scarcity", "In-Game Vending Logic", "Synthetic Assets", "Cross-Metaverse Transfer"], "weights": { "domain": 50, "skills": 30, "experience": 5, "education": 10, "certs": 0, "support": 5 } }
    ]
  },
  {
    "id": "77-0000",
    "name": "Emergency Response and Disaster Resilience",
    "roles": [
      { "title": "Emergency Management Director", "type": "Common", "skills": ["Incident Command", "Resource Allocation", "Evacuation Planning", "NIMS Framework"], "weights": { "domain": 40, "skills": 15, "experience": 20, "education": 10, "certs": 10, "support": 5 } },
      { "title": "Disaster Recovery Coordinator", "type": "Common", "skills": ["Damage Assessment", "FEMA Liaison", "Grant Writing", "Logistics"], "weights": { "domain": 40, "skills": 20, "experience": 15, "education": 10, "certs": 10, "support": 5 } },
      { "title": "Hazmat Response Technician", "type": "Common", "skills": ["Spill Containment", "Chemical Profiling", "Decontamination", "Level A Gear"], "weights": { "domain": 45, "skills": 15, "experience": 15, "education": 5, "certs": 15, "support": 5 } },
      { "title": "Search and Rescue Operator", "type": "Common", "skills": ["K9 Tracking", "Helicopter Hoisting", "Rope Rigging", "Wilderness First Aid"], "weights": { "domain": 40, "skills": 20, "experience": 15, "education": 5, "certs": 15, "support": 5 } },
      { "title": "Epidemiological Response Lead", "type": "Common", "skills": ["Contact Tracing", "Quarantine Protocol", "Cluster Mapping", "Vector Control"], "weights": { "domain": 40, "skills": 20, "experience": 15, "education": 10, "certs": 10, "support": 5 } },
      { "title": "Public Warning Broadcaster", "type": "Common", "skills": ["EAS Operations", "Crisis Communication", "Siren Testing", "Multilingual Scripts"], "weights": { "domain": 45, "skills": 15, "experience": 20, "education": 5, "certs": 10, "support": 5 } },
      { "title": "Urban Flood Mitigation Engineer", "type": "Common", "skills": ["Stormwater Drainage", "Levee Oversight", "Pump Stations", "Hydraulic Modeling"], "weights": { "domain": 40, "skills": 20, "experience": 15, "education": 10, "certs": 10, "support": 5 } },
      { "title": "Disaster AI Modeler", "type": "Rare", "skills": ["Wildfire Prediction", "Seismic Neural Nets", "Evacuation Simulation", "Satellite Heatmaps"], "weights": { "domain": 50, "skills": 25, "experience": 10, "education": 10, "certs": 0, "support": 5 } },
      { "title": "Post-Disaster Housing Strategist", "type": "Rare", "skills": ["Rapid Modular Assembly", "Displaced Population Flow", "Zoning Waivers", "Micro-Grid Setups"], "weights": { "domain": 45, "skills": 30, "experience": 10, "education": 5, "certs": 5, "support": 5 } },
      { "title": "Climate Refugee Liaison", "type": "Rare", "skills": ["Trans-Border Diplomacy", "Resettlement Logistics", "Cultural Integration", "Humanitarian Aid"], "weights": { "domain": 50, "skills": 25, "experience": 10, "education": 10, "certs": 0, "support": 5 } }
    ]
  }
];

const idsToReplace = newIndustries.map(ind => ind.id);
taxonomy.industries = taxonomy.industries.filter(ind => !idsToReplace.includes(ind.id));
taxonomy.industries.push(...newIndustries);
taxonomy.industries.sort((a, b) => a.id.localeCompare(b.id));

fs.writeFileSync(path, JSON.stringify(taxonomy, null, 2));
console.log('Successfully updated taxonomy with Industry batch 6.');
