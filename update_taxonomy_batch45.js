const fs = require('fs');

const path = 'c:/Antigravity/HireSense/Hiresense-AI/frontend/src/data/taxonomy.json';
const dataRaw = fs.readFileSync(path, 'utf8');
const taxonomy = JSON.parse(dataRaw);

const newIndustries = [
  // INDUSTRY 4
  {
    "id": "43-0000",
    "name": "Office and Administrative Support",
    "roles": [
      { "title": "Executive Assistant", "type": "Common", "skills": ["Calendar Management", "Executive Communication", "Travel Coordination", "Meeting Minutes"], "weights": { "domain": 15, "skills": 35, "experience": 30, "education": 5, "certs": 5, "support": 10 } },
      { "title": "Customer Service Representative", "type": "Common", "skills": ["Ticket Resolution", "CRM Navigation", "De-escalation", "Data Entry"], "weights": { "domain": 10, "skills": 40, "experience": 25, "education": 5, "certs": 5, "support": 15 } },
      { "title": "Payroll Clerk", "type": "Common", "skills": ["Timekeeping Software", "Wage Calculation", "Tax Deductions", "Compliance Reporting"], "weights": { "domain": 15, "skills": 35, "experience": 25, "education": 10, "certs": 10, "support": 5 } },
      { "title": "Data Entry Keyer", "type": "Common", "skills": ["Typing Speed", "Spreadsheet Management", "Database Updating", "Accuracy Checks"], "weights": { "domain": 10, "skills": 40, "experience": 30, "education": 5, "certs": 0, "support": 15 } },
      { "title": "Receptionist", "type": "Common", "skills": ["Front Desk Management", "Switchboard Operations", "Visitor Logistics", "Administrative Triage"], "weights": { "domain": 10, "skills": 35, "experience": 30, "education": 5, "certs": 5, "support": 15 } },
      { "title": "Logistics Coordinator", "type": "Common", "skills": ["Inventory Tracking", "Vendor Relations", "Order Processing", "Dispatching"], "weights": { "domain": 15, "skills": 35, "experience": 25, "education": 10, "certs": 5, "support": 10 } },
      { "title": "Office Manager", "type": "Common", "skills": ["Facility Operations", "Budget Management", "Supply Procurement", "Team Coordination"], "weights": { "domain": 15, "skills": 35, "experience": 30, "education": 10, "certs": 0, "support": 10 } },
      { "title": "Virtual Assistant Strategist", "type": "Rare", "skills": ["Asynchronous Workflow", "Remote Team SaaS", "Process Automation", "Digital Delegation"], "weights": { "domain": 45, "skills": 25, "experience": 15, "education": 5, "certs": 5, "support": 5 } },
      { "title": "Digital Records Archivist", "type": "Rare", "skills": ["Information Governance", "Cloud Storage Architecture", "Data Retrieval Audits", "Retention Policies"], "weights": { "domain": 50, "skills": 20, "experience": 15, "education": 10, "certs": 0, "support": 5 } },
      { "title": "AI-Ops Support Liaison", "type": "Rare", "skills": ["Chatbot Training", "AI Tool Integration", "Prompt Troubleshooting", "SaaS Licensing"], "weights": { "domain": 45, "skills": 30, "experience": 15, "education": 5, "certs": 0, "support": 5 } }
    ]
  },
  {
    "id": "45-0000",
    "name": "Farming, Fishing, and Forestry",
    "roles": [
      { "title": "Agricultural Manager", "type": "Common", "skills": ["Crop Planning", "Farm Machinery", "Yield Forecasting", "Soil Health"], "weights": { "domain": 30, "skills": 20, "experience": 30, "education": 5, "certs": 10, "support": 5 } },
      { "title": "Commercial Fisherman", "type": "Common", "skills": ["Trawl Operations", "Navigation", "Catch Sorting", "Maritime Safety"], "weights": { "domain": 30, "skills": 20, "experience": 30, "education": 0, "certs": 15, "support": 5 } },
      { "title": "Forestry Worker", "type": "Common", "skills": ["Timber Harvesting", "Chainsaw Operations", "Reforestation", "Fire Mitigation"], "weights": { "domain": 25, "skills": 25, "experience": 35, "education": 0, "certs": 10, "support": 5 } },
      { "title": "Nursery Greenhouse Worker", "type": "Common", "skills": ["Seedling Cultivation", "Irrigation Management", "Pest Identification", "Climate Control"], "weights": { "domain": 25, "skills": 25, "experience": 25, "education": 5, "certs": 15, "support": 5 } },
      { "title": "Logging Equipment Operator", "type": "Common", "skills": ["Feller Buncher Operations", "Skidder Driving", "Equipment Maintenance", "Terrain Navigating"], "weights": { "domain": 25, "skills": 25, "experience": 30, "education": 0, "certs": 15, "support": 5 } },
      { "title": "Livestock Hand", "type": "Common", "skills": ["Animal Husbandry", "Feed Management", "Veterinary First Aid", "Pasture Rotation"], "weights": { "domain": 30, "skills": 20, "experience": 30, "education": 5, "certs": 10, "support": 5 } },
      { "title": "Aquaculture Farm Worker", "type": "Common", "skills": ["Water Quality Testing", "Feeding Protocol", "Net Harvesting", "Disease Monitoring"], "weights": { "domain": 25, "skills": 25, "experience": 25, "education": 10, "certs": 10, "support": 5 } },
      { "title": "Precision Agriculture Technician", "type": "Rare", "skills": ["UAS Drone Mapping", "Variable Rate Tech", "Soil Sensors", "GPS Navigation"], "weights": { "domain": 45, "skills": 20, "experience": 15, "education": 10, "certs": 5, "support": 5 } },
      { "title": "Vertical Farm Operator", "type": "Rare", "skills": ["Hydroponic Monitoring", "LED Spectrum Tuning", "Automated Dosing", "Climate Software"], "weights": { "domain": 45, "skills": 20, "experience": 20, "education": 5, "certs": 5, "support": 5 } },
      { "title": "Aquaponics System Designer", "type": "Rare", "skills": ["Symbiotic Ecosystems", "Biofilter Sizing", "Fluid Dynamics", "Nutrient Balancing"], "weights": { "domain": 50, "skills": 20, "experience": 15, "education": 10, "certs": 0, "support": 5 } }
    ]
  },
  {
    "id": "47-0000",
    "name": "Construction and Extraction",
    "roles": [
      { "title": "Construction Manager", "type": "Common", "skills": ["Project Scheduling", "Site Safety", "Budget Estimation", "Contractor Coordination"], "weights": { "domain": 25, "skills": 20, "experience": 30, "education": 10, "certs": 10, "support": 5 } },
      { "title": "Electrician", "type": "Common", "skills": ["Wiring Installation", "Code Compliance", "Circuit Testing", "Blueprint Reading"], "weights": { "domain": 25, "skills": 25, "experience": 30, "education": 5, "certs": 10, "support": 5 } },
      { "title": "Plumber", "type": "Common", "skills": ["Pipe Fitting", "Drain Traps", "Pressure Testing", "Water Heater Installation"], "weights": { "domain": 25, "skills": 25, "experience": 30, "education": 5, "certs": 10, "support": 5 } },
      { "title": "Carpenter", "type": "Common", "skills": ["Framing", "Trim Work", "Measurement Math", "Tool Operation"], "weights": { "domain": 25, "skills": 25, "experience": 35, "education": 0, "certs": 10, "support": 5 } },
      { "title": "Heavy Equipment Operator", "type": "Common", "skills": ["Excavator Mastery", "Trenching", "Grade Reading", "Safety Operations"], "weights": { "domain": 20, "skills": 25, "experience": 35, "education": 0, "certs": 15, "support": 5 } },
      { "title": "Masonry Worker", "type": "Common", "skills": ["Bricklaying", "Mortar Mixing", "Structural Support", "Stone Cutting"], "weights": { "domain": 25, "skills": 25, "experience": 30, "education": 0, "certs": 15, "support": 5 } },
      { "title": "Roofing Specialist", "type": "Common", "skills": ["Shingle Installation", "Weatherproofing", "Pitch Calculation", "Fall Protection"], "weights": { "domain": 30, "skills": 20, "experience": 30, "education": 0, "certs": 15, "support": 5 } },
      { "title": "3D Construction Printing Technician", "type": "Rare", "skills": ["Robotic Extrusion", "Concrete Mix Design", "G-Code Tuning", "Curing Dynamics"], "weights": { "domain": 50, "skills": 15, "experience": 15, "education": 10, "certs": 5, "support": 5 } },
      { "title": "Smart Grid Installer", "type": "Rare", "skills": ["Microgrid Infrastructure", "Inverter Integration", "Battery Storage", "Comm Protocols"], "weights": { "domain": 45, "skills": 20, "experience": 15, "education": 10, "certs": 5, "support": 5 } },
      { "title": "Geothermal Driller", "type": "Rare", "skills": ["Borehole Navigation", "Ground Source Heating", "Thermal Conductivity", "Rig Operations"], "weights": { "domain": 45, "skills": 20, "experience": 20, "education": 5, "certs": 5, "support": 5 } }
    ]
  },
  {
    "id": "49-0000",
    "name": "Installation, Maintenance, and Repair",
    "roles": [
      { "title": "Automotive Mechanic", "type": "Common", "skills": ["Engine Diagnostics", "Brake Repair", "Transmission Systems", "OBD-II Scanners"], "weights": { "domain": 25, "skills": 25, "experience": 30, "education": 5, "certs": 10, "support": 5 } },
      { "title": "HVAC Technician", "type": "Common", "skills": ["Refrigerant Handling", "Ductwork", "Thermostat Wiring", "System Efficiency"], "weights": { "domain": 25, "skills": 25, "experience": 30, "education": 5, "certs": 10, "support": 5 } },
      { "title": "Industrial Machinery Mechanic", "type": "Common", "skills": ["Preventative Maintenance", "Hydraulics", "Pneumatics", "Schematic Reading"], "weights": { "domain": 20, "skills": 25, "experience": 35, "education": 5, "certs": 10, "support": 5 } },
      { "title": "Aviation Mechanic", "type": "Common", "skills": ["Turbine Inspection", "Avionics Repair", "FAA Compliance", "Airframe Maintenance"], "weights": { "domain": 25, "skills": 20, "experience": 35, "education": 0, "certs": 15, "support": 5 } },
      { "title": "Telecommunications Equipment Installer", "type": "Common", "skills": ["Fiber Splicing", "Router Configuration", "Signal Testing", "Cable Running"], "weights": { "domain": 30, "skills": 20, "experience": 30, "education": 5, "certs": 10, "support": 5 } },
      { "title": "Wind Turbine Technician", "type": "Common", "skills": ["Rotor Blade Inspection", "Generator Repair", "High-Angle Rescue", "Anemometer Sync"], "weights": { "domain": 25, "skills": 25, "experience": 30, "education": 0, "certs": 15, "support": 5 } },
      { "title": "Medical Equipment Repairer", "type": "Common", "skills": ["MRI Calibration", "Biomedical Testing", "Soldering", "Defibrillator Diagnostics"], "weights": { "domain": 30, "skills": 25, "experience": 25, "education": 5, "certs": 10, "support": 5 } },
      { "title": "EV Powertrain Specialist", "type": "Rare", "skills": ["High-Voltage Safety", "Lithium-Ion Diagnostics", "Inverter Repair", "Regen Braking"], "weights": { "domain": 45, "skills": 20, "experience": 15, "education": 10, "certs": 5, "support": 5 } },
      { "title": "Industrial Robotics Maintainer", "type": "Rare", "skills": ["PLC Troubleshooting", "Servo Calibration", "Arm Actuators", "End-Effector Alignment"], "weights": { "domain": 45, "skills": 20, "experience": 20, "education": 5, "certs": 5, "support": 5 } },
      { "title": "Fleet Telematics Integrationist", "type": "Rare", "skills": ["CAN Bus Sniffing", "IoT Sensor Installation", "Data Streaming", "GPS Module Wiring"], "weights": { "domain": 50, "skills": 15, "experience": 15, "education": 10, "certs": 5, "support": 5 } }
    ]
  },
  {
    "id": "51-0000",
    "name": "Production",
    "roles": [
      { "title": "Machinist", "type": "Common", "skills": ["Lathe Operation", "Milling", "Micrometer Measurement", "Blueprint Specs"], "weights": { "domain": 25, "skills": 25, "experience": 30, "education": 5, "certs": 10, "support": 5 } },
      { "title": "CNC Operator", "type": "Common", "skills": ["G-Code Programming", "Tool Setting", "Calibration", "Tolerance Quality"], "weights": { "domain": 25, "skills": 25, "experience": 30, "education": 5, "certs": 10, "support": 5 } },
      { "title": "Welder", "type": "Common", "skills": ["MIG/TIG Welding", "Metal Fabrication", "Joint Inspection", "Torch Cutting"], "weights": { "domain": 20, "skills": 25, "experience": 35, "education": 0, "certs": 15, "support": 5 } },
      { "title": "Assembler", "type": "Common", "skills": ["Hand Tool Operation", "Fastening", "Component Fitting", "Line Pacing"], "weights": { "domain": 30, "skills": 20, "experience": 35, "education": 0, "certs": 10, "support": 5 } },
      { "title": "Quality Control Inspector", "type": "Common", "skills": ["Defect Identification", "Caliper Use", "Testing Protocols", "Batch Auditing"], "weights": { "domain": 30, "skills": 25, "experience": 25, "education": 5, "certs": 10, "support": 5 } },
      { "title": "Plant Operator", "type": "Common", "skills": ["Control Room Monitoring", "Valve Operation", "Chemical Mixing", "Process Log Keeping"], "weights": { "domain": 25, "skills": 25, "experience": 30, "education": 5, "certs": 10, "support": 5 } },
      { "title": "Packaging Machine Operator", "type": "Common", "skills": ["Wrapper Setup", "Conveyor Flow", "Label Verification", "Jam Clearing"], "weights": { "domain": 25, "skills": 20, "experience": 35, "education": 0, "certs": 10, "support": 10 } },
      { "title": "Additive Manufacturing (3D) Engineer", "type": "Rare", "skills": ["Laser Sintering", "Filament Optimization", "CAD Slice Topology", "Bed Adhesion"], "weights": { "domain": 45, "skills": 20, "experience": 20, "education": 5, "certs": 5, "support": 5 } },
      { "title": "Nanofabrication Technician", "type": "Rare", "skills": ["Cleanroom Protocol", "Electron Beam Lithography", "Wafer Dicing", "Atomic Force Microscopy"], "weights": { "domain": 50, "skills": 15, "experience": 15, "education": 10, "certs": 5, "support": 5 } },
      { "title": "Smart Factory Controller", "type": "Rare", "skills": ["Digital Twin Monitoring", "Predictive Output Analytics", "SCADA Oversight", "Automation Handoffs"], "weights": { "domain": 45, "skills": 25, "experience": 15, "education": 5, "certs": 5, "support": 5 } }
    ]
  },
  // INDUSTRY 5
  {
    "id": "53-0000",
    "name": "Transportation and Material Moving",
    "roles": [
      { "title": "Commercial Truck Driver", "type": "Common", "skills": ["Logbook Management", "Defensive Driving", "Route Planning", "Load Securement"], "weights": { "domain": 40, "skills": 15, "experience": 20, "education": 0, "certs": 20, "support": 5 } },
      { "title": "Air Traffic Controller", "type": "Common", "skills": ["Radar Sequencing", "Weather Interpretation", "Emergency Directives", "Clearance Delivery"], "weights": { "domain": 40, "skills": 15, "experience": 20, "education": 5, "certs": 15, "support": 5 } },
      { "title": "Locomotive Engineer", "type": "Common", "skills": ["Train Consist Reading", "Throttle Control", "Signal Obedience", "Air Brake Operations"], "weights": { "domain": 40, "skills": 15, "experience": 20, "education": 5, "certs": 15, "support": 5 } },
      { "title": "Supply Chain Analyst", "type": "Common", "skills": ["Freight Optimization", "Demand Forecasting", "Tariff Compliance", "ERP Software"], "weights": { "domain": 40, "skills": 20, "experience": 15, "education": 5, "certs": 15, "support": 5 } },
      { "title": "Dispatcher", "type": "Common", "skills": ["Radio Communication", "Vessel Routing", "Capacity Planning", "Incident Logging"], "weights": { "domain": 40, "skills": 15, "experience": 20, "education": 0, "certs": 15, "support": 10 } },
      { "title": "Marine Captain", "type": "Common", "skills": ["Nautical Charting", "Crew Management", "Weather Routing", "Port Regulations"], "weights": { "domain": 40, "skills": 15, "experience": 20, "education": 0, "certs": 20, "support": 5 } },
      { "title": "Material Handler", "type": "Common", "skills": ["Forklift Operation", "Palletizing", "Warehouse Safety", "Inventory Scanning"], "weights": { "domain": 40, "skills": 15, "experience": 20, "education": 0, "certs": 15, "support": 10 } },
      { "title": "Autonomous Fleet Manager", "type": "Rare", "skills": ["Self-Driving Routing", "Edge Case Override", "Sensor Degradation Tracking", "Platooning"], "weights": { "domain": 50, "skills": 15, "experience": 15, "education": 0, "certs": 15, "support": 5 } },
      { "title": "Last-Mile Drone Operator", "type": "Rare", "skills": ["Payload Drop Mechanics", "Airspace Waiver Laws", "Battery Swap Logistics", "Visual Line of Sight"], "weights": { "domain": 45, "skills": 15, "experience": 10, "education": 5, "certs": 20, "support": 5 } },
      { "title": "Hyperloop Control Specialist", "type": "Rare", "skills": ["Vacuum Tube Pressure", "Magnetic Levitation Tuning", "Pod Trajectory", "Airlock Protocols"], "weights": { "domain": 55, "skills": 15, "experience": 10, "education": 5, "certs": 10, "support": 5 } }
    ]
  },
  {
    "id": "55-0000",
    "name": "Military Specific Occupations",
    "roles": [
      { "title": "Infantry Officer", "type": "Common", "skills": ["Combat Tactics", "Personnel Leadership", "Weapons Systems", "Reconnaissance"], "weights": { "domain": 40, "skills": 15, "experience": 20, "education": 5, "certs": 15, "support": 5 } },
      { "title": "Intelligence Analyst", "type": "Common", "skills": ["SIGINT", "Cryptography", "Surveillance Footage", "Threat Profiling"], "weights": { "domain": 40, "skills": 15, "experience": 20, "education": 5, "certs": 15, "support": 5 } },
      { "title": "Combat Medic", "type": "Common", "skills": ["Trauma Triage", "Field Surgery", "Evacuation Protocol", "Infection Control"], "weights": { "domain": 40, "skills": 10, "experience": 20, "education": 5, "certs": 20, "support": 5 } },
      { "title": "Military Pilot", "type": "Common", "skills": ["Fighter Evasion", "Aerial Refueling", "Flight Instrument Reading", "Dogfighting Tactics"], "weights": { "domain": 40, "skills": 15, "experience": 20, "education": 5, "certs": 15, "support": 5 } },
      { "title": "Logistics Readiness Squadron", "type": "Common", "skills": ["Supply Drops", "Armory Management", "Base Sustaining", "Convoy Routing"], "weights": { "domain": 40, "skills": 15, "experience": 20, "education": 5, "certs": 15, "support": 5 } },
      { "title": "Explosive Ordnance Disposal", "type": "Common", "skills": ["Bomb Defusal", "IED Detection", "Robotic Rovers", "Controlled Detonation"], "weights": { "domain": 40, "skills": 15, "experience": 20, "education": 0, "certs": 20, "support": 5 } },
      { "title": "Special Forces Operator", "type": "Common", "skills": ["Covert Infiltration", "Paratrooping", "Hostage Rescue", "Sniper Operations"], "weights": { "domain": 40, "skills": 15, "experience": 20, "education": 0, "certs": 20, "support": 5 } },
      { "title": "Cyber-Warfare Tactician", "type": "Rare", "skills": ["Nation-State Zero-Days", "Grid Penetration", "DDoS Orchestration", "C2 Infrastructure"], "weights": { "domain": 45, "skills": 20, "experience": 10, "education": 5, "certs": 15, "support": 5 } },
      { "title": "Drone Swarm Commander", "type": "Rare", "skills": ["Coordinated Loitering", "Multi-Vector Strikes", "Swarm Logic", "Anti-Jamming Comm"], "weights": { "domain": 50, "skills": 15, "experience": 10, "education": 5, "certs": 15, "support": 5 } },
      { "title": "Satellite Defense Strategist", "type": "Rare", "skills": ["Orbital Interception", "EMP Hardening", "Debris Evasion", "Space Domain Awareness"], "weights": { "domain": 55, "skills": 10, "experience": 10, "education": 5, "certs": 15, "support": 5 } }
    ]
  },
  {
    "id": "57-0000",
    "name": "Sustainability and Renewable Energy",
    "roles": [
      { "title": "Solar Installation Technician", "type": "Common", "skills": ["Panel Mounting", "Inverter Wiring", "Roof Safety", "Voltage Testing"], "weights": { "domain": 25, "skills": 25, "experience": 25, "education": 5, "certs": 15, "support": 5 } },
      { "title": "Sustainability Consultant", "type": "Common", "skills": ["ESG Frameworks", "LEED Verification", "Green Procurement", "Waste Auditing"], "weights": { "domain": 30, "skills": 30, "experience": 20, "education": 10, "certs": 5, "support": 5 } },
      { "title": "Energy Auditor", "type": "Common", "skills": ["Thermal Imaging", "HVAC Efficiency", "Insulation Grading", "Carbon Footprinting"], "weights": { "domain": 30, "skills": 25, "experience": 25, "education": 5, "certs": 10, "support": 5 } },
      { "title": "Wind Farm Operations Manager", "type": "Common", "skills": ["Turbine SCADA", "Downtime Mitigation", "Grid Integration", "Yield Forecasting"], "weights": { "domain": 30, "skills": 20, "experience": 30, "education": 10, "certs": 5, "support": 5 } },
      { "title": "Environmental Policy Analyst", "type": "Common", "skills": ["Regulatory Tracking", "Emissions Trading", "Impact Assessment", "Stakeholder Outreach"], "weights": { "domain": 30, "skills": 30, "experience": 20, "education": 15, "certs": 0, "support": 5 } },
      { "title": "Recycling Operations Specialist", "type": "Common", "skills": ["Material Recovery", "Contaminant Sorting", "Baler Operations", "Circular Economy"], "weights": { "domain": 25, "skills": 25, "experience": 30, "education": 5, "certs": 5, "support": 10 } },
      { "title": "Water Resource Specialist", "type": "Common", "skills": ["Aquifer Monitoring", "Desalination Processes", "Wastewater Treatment", "Hydrology Software"], "weights": { "domain": 30, "skills": 25, "experience": 25, "education": 15, "certs": 0, "support": 5 } },
      { "title": "Grid Modernization Architect", "type": "Rare", "skills": ["V2G Integration", "Distributed Energy Resources", "Smart Meter Interoperability", "Demand Response"], "weights": { "domain": 45, "skills": 25, "experience": 15, "education": 10, "certs": 0, "support": 5 } },
      { "title": "Carbon Capture Engineer", "type": "Rare", "skills": ["Direct Air Capture", "Solvent Regeneration", "CO2 Sequestration", "Geochemical Modeling"], "weights": { "domain": 50, "skills": 20, "experience": 15, "education": 10, "certs": 0, "support": 5 } },
      { "title": "Hydrogen Fuel Cell Scientist", "type": "Rare", "skills": ["Electrolysis", "Proton Exchange Membranes", "Cryogenic Storage", "Fuel Cell Stack Design"], "weights": { "domain": 55, "skills": 20, "experience": 10, "education": 10, "certs": 0, "support": 5 } }
    ]
  },
  {
    "id": "59-0000",
    "name": "Space and Deep-Sea Exploration",
    "roles": [
      { "title": "Aerospace Technician", "type": "Common", "skills": ["Rocket Assembly", "High-Tolerance Machining", "Payload Integration", "Vibration Testing"], "weights": { "domain": 10, "skills": 40, "experience": 25, "education": 15, "certs": 5, "support": 5 } },
      { "title": "Mission Control Operator", "type": "Common", "skills": ["Telemetry Monitoring", "Flight Dynamics", "Anomaly Resolution", "Deep Space Network"], "weights": { "domain": 10, "skills": 40, "experience": 20, "education": 20, "certs": 5, "support": 5 } },
      { "title": "ROV Pilot", "type": "Common", "skills": ["Subsea Navigation", "Manipulator Arm Usage", "Sonar Feedback", "Umbilical Management"], "weights": { "domain": 10, "skills": 45, "experience": 20, "education": 15, "certs": 5, "support": 5 } },
      { "title": "Oceanographer", "type": "Common", "skills": ["Current Mapping", "Bathymetry", "Salinity Logging", "Seafloor Core Sampling"], "weights": { "domain": 10, "skills": 40, "experience": 20, "education": 25, "certs": 0, "support": 5 } },
      { "title": "Satellite Systems Engineer", "type": "Common", "skills": ["Solar Array Deployment", "Thermal Vacuum Testing", "Bus Architecture", "Uplink Comm"], "weights": { "domain": 10, "skills": 40, "experience": 20, "education": 25, "certs": 0, "support": 5 } },
      { "title": "Marine Biologist", "type": "Common", "skills": ["Pelagic Tagging", "Coral Reef Restoration", "Species Taxonomy", "Underwater Photography"], "weights": { "domain": 15, "skills": 40, "experience": 15, "education": 25, "certs": 0, "support": 5 } },
      { "title": "Astronautical Researcher", "type": "Common", "skills": ["Microgravity Experiments", "Life Support Fluidics", "Radiation Shielding", "Lunar Regolith"], "weights": { "domain": 10, "skills": 45, "experience": 10, "education": 25, "certs": 5, "support": 5 } },
      { "title": "Space Tourism Liaison", "type": "Rare", "skills": ["Zero-G Hospitality", "Orbital Comfort Protocol", "Pre-Flight Training", "Spaceflight PR"], "weights": { "domain": 45, "skills": 40, "experience": 0, "education": 15, "certs": 0, "support": 0 } },
      { "title": "Exoplanetary Prospector", "type": "Rare", "skills": ["Asteroid Mining Math", "Spectroscopy Output", "Resource Extraction Logic", "Helium-3 Harvesting"], "weights": { "domain": 50, "skills": 40, "experience": 0, "education": 10, "certs": 0, "support": 0 } },
      { "title": "Benthic Ecologist", "type": "Rare", "skills": ["Abyssal Plain Research", "Deep-Sea Vent Extremophiles", "Chemosynthesis", "Submersible Operations"], "weights": { "domain": 45, "skills": 40, "experience": 0, "education": 15, "certs": 0, "support": 0 } }
    ]
  },
  {
    "id": "61-0000",
    "name": "Advanced Bio-Manufacturing and Life Extension",
    "roles": [
      { "title": "Bioprocess Engineer", "type": "Common", "skills": ["Fermentation Scaling", "Cell Culture", "cGMP Compliance", "Downstream Processing"], "weights": { "domain": 10, "skills": 40, "experience": 20, "education": 25, "certs": 0, "support": 5 } },
      { "title": "Bioinformatics Analyst", "type": "Common", "skills": ["Genomic Sequencing Data", "Python/R", "Pipeline Automation", "Variant Calling"], "weights": { "domain": 10, "skills": 45, "experience": 15, "education": 25, "certs": 0, "support": 5 } },
      { "title": "Clinical Trials Manager", "type": "Common", "skills": ["Protocol Writing", "IRB Submission", "Patient Enrollment", "FDA Liaison"], "weights": { "domain": 10, "skills": 40, "experience": 25, "education": 15, "certs": 5, "support": 5 } },
      { "title": "Quality Assurance Biologist", "type": "Common", "skills": ["Contamination Testing", "Assay Validation", "Batch Record Review", "CAPA Management"], "weights": { "domain": 10, "skills": 40, "experience": 25, "education": 15, "certs": 5, "support": 5 } },
      { "title": "Synthetics Lab Technician", "type": "Common", "skills": ["Pipetting", "PCR Assembly", "Gel Electrophoresis", "Autoclave Sterilization"], "weights": { "domain": 10, "skills": 45, "experience": 20, "education": 15, "certs": 5, "support": 5 } },
      { "title": "Biomedical Data Scientist", "type": "Common", "skills": ["Machine Learning", "EHR Mining", "Biomarker Discovery", "Predictive Diagnostics"], "weights": { "domain": 10, "skills": 45, "experience": 15, "education": 25, "certs": 0, "support": 5 } },
      { "title": "Tissue Culture Specialist", "type": "Common", "skills": ["Stem Cell Expansion", "Cryopreservation", "Media Preparation", "Aseptic Tech"], "weights": { "domain": 10, "skills": 40, "experience": 20, "education": 20, "certs": 5, "support": 5 } },
      { "title": "CRISPR Gene Editor", "type": "Rare", "skills": ["Cas9/Cas12 Delivery", "Off-target Analysis", "Plasmid Design", "Knock-In Mutagenesis"], "weights": { "domain": 45, "skills": 40, "experience": 0, "education": 15, "certs": 0, "support": 0 } },
      { "title": "Computational Protein Designer", "type": "Rare", "skills": ["AlphaFold Integration", "De Novo Protein Folding", "Molecular Dynamics", "Enzyme Catalysis"], "weights": { "domain": 50, "skills": 40, "experience": 0, "education": 10, "certs": 0, "support": 0 } },
      { "title": "Longevity Science Researcher", "type": "Rare", "skills": ["Telomere Extension", "Senolytics", "Epigenetic Clocks", "Mitochondrial Repair"], "weights": { "domain": 45, "skills": 40, "experience": 0, "education": 15, "certs": 0, "support": 0 } }
    ]
  }
];

const idsToReplace = newIndustries.map(ind => ind.id);
taxonomy.industries = taxonomy.industries.filter(ind => !idsToReplace.includes(ind.id));
taxonomy.industries.push(...newIndustries);
taxonomy.industries.sort((a, b) => a.id.localeCompare(b.id));

fs.writeFileSync(path, JSON.stringify(taxonomy, null, 2));
console.log('Successfully updated taxonomy with Industry batches 4 and 5.');
