import React, { useState, useEffect } from "react";

// ---- PRACTICE TEST DATA (10 QUESTIONS) ----
const PRACTICE_TEST = [
  {
    id: 1,
    question:
      "A nurse practitioner (NP) working in a state with restricted NP practice observes a physician colleague writing prescriptions under the NP’s name. What is the best response?",
    choices: [
      "Report the colleague to the state medical board",
      "Document the observation and confront the colleague directly",
      "Notify clinic administration without further investigation",
      "Ignore the behavior unless a patient files a formal complaint",
    ],
    correct: 1,
    rationales: [
      "A. Reporting to a medical board is premature without first addressing the issue directly, unless patient harm is occurring.",
      "B. Correct. Professional accountability requires confronting the colleague and documenting the event.",
      "C. Not the most direct or effective first step; administration may be notified if the behavior continues.",
      "D. Ignoring the behavior is unethical and could endanger patients.",
    ],
    topic: "Professional Accountability",
    subtopic: "ethics, prescribing, professional conduct, confrontation",
  },
  {
    id: 2,
    question:
      "A patient asks the nurse practitioner not to document their recent depression diagnosis in the medical record, fearing it will affect their insurance. What is the best response?",
    choices: [
      "Comply with the request and omit the diagnosis",
      "Use vague language in documentation to protect the patient",
      "Explain the importance of accurate records and address concerns",
      "Refer the patient to another provider for documentation",
    ],
    correct: 2,
    rationales: [
      "A. Omitting relevant clinical information is unethical and can compromise care.",
      "B. Vague documentation is not best practice and may have legal implications.",
      "C. Correct. Accurate, honest documentation is critical; discuss privacy/insurance concerns.",
      "D. Referring is not appropriate in this scenario; patient concerns should be addressed directly.",
    ],
    topic: "Documentation Ethics",
    subtopic: "documentation, confidentiality, ethics, substance use, mental health",
  },
  {
    id: 3,
    question:
      "A nurse practitioner is working in a restricted practice state. Which of the following is outside their scope of practice?",
    choices: [
      "Writing prescriptions for schedule II narcotics",
      "Ordering basic laboratory tests",
      "Conducting a sports physical exam",
      "Providing health education to a diabetic patient",
    ],
    correct: 0,
    rationales: [
      "A. Correct. In many restricted states, NPs require physician supervision or cannot independently prescribe schedule II narcotics.",
      "B. Laboratory ordering is within NP scope in all states.",
      "C. Sports physicals are within NP scope.",
      "D. Health education is a core NP role.",
    ],
    topic: "State Practice Laws",
    subtopic: "restricted states, prescribing, scope of authority",
  },
  {
    id: 4,
    question:
      "During a pre-conception visit, the nurse practitioner is reviewing risk factors. Which is the strongest known risk factor for Down syndrome in the baby?",
    choices: [
      "The couple’s first pregnancy ended in miscarriage",
      "The mother works in a hair salon with regular chemical exposure",
      "The father has a first cousin with Down syndrome",
      "The mother is 38 years old",
    ],
    correct: 3,
    rationales: [
      "A. Incorrect – A history of miscarriage is not a primary risk for Down syndrome.",
      "B. No evidence supports a link between salon chemical exposure and Down syndrome.",
      "C. Family history in the father's side has less impact for trisomy 21.",
      "D. Correct. Advanced maternal age is the strongest known risk.",
    ],
    topic: "Prenatal Risk Assessment",
    subtopic: "Down syndrome, advanced maternal age, prenatal counseling",
  },
  {
    id: 5,
    question:
      "A nurse practitioner evaluates a 4-day-old term infant with a murmur. Which murmur is classic for patent ductus arteriosus (PDA)?",
    choices: [
      'A continuous "machine-like" murmur best heard at the left upper sternal border',
      "A high-frequency murmur heard best at the left lower sternal border",
      "A systolic murmur heard over the infant’s back",
      "A blowing, holosystolic murmur at the left lower sternal border",
    ],
    correct: 0,
    rationales: [
      "A. Correct – PDA classically produces a continuous, machine-like murmur at the left upper sternal border.",
      "B. Not classic for PDA.",
      "C. Not the classic location or timing for PDA.",
      "D. Not the classic description for PDA.",
    ],
    topic: "Congenital Heart Defects",
    subtopic: "PDA, patent ductus arteriosus, newborn murmur, pediatrics",
  },
  {
    id: 6,
    question:
      'During a nine-month well-child visit, the nurse practitioner assesses developmental milestones. Which question best assesses the expected fine motor skill at this age?',
    choices: [
      "“Does your child transfer objects from one hand to the other?”",
      "“Can your child draw circles with a crayon?”",
      "“Does your child walk unassisted across the room?”",
      "“Can your child say simple two-word phrases like ‘more milk’?”",
    ],
    correct: 0,
    rationales: [
      "A. Correct – At around 9 months, transferring objects between hands is expected.",
      "B. Drawing circles is a skill for older children.",
      "C. Unassisted walking is expected closer to 12–15 months.",
      "D. Two-word phrases typically develop at 18–24 months.",
    ],
    topic: "Developmental Milestones",
    subtopic: "9-month-old, infant development, well-child visit, fine motor",
  },
  {
    id: 7,
    question:
      'The nurse practitioner sees a 2-year-old child for a well-child check. Which question best assesses expected developmental progress?',
    choices: [
      "“Can your child use knobs or buttons on toys?”",
      "“Does your child jump with both feet off the ground?”",
      "“Can your child name three colors?”",
      "“Does your child follow two-step commands like ‘Pick up your shoes and put them by the door’?”",
    ],
    correct: 0,
    rationales: [
      "A. Correct – Using knobs or buttons reflects age-appropriate fine motor skills for 2 years.",
      "B. Jumping is a 2.5–3 year milestone.",
      "C. Naming colors is usually 3+ years.",
      "D. Complex two-step commands typically develop after age 2.",
    ],
    topic: "Developmental Milestones",
    subtopic: "2-year-old, cognitive development, milestone assessment",
  },
  {
    id: 8,
    question:
      "The nurse practitioner is assessing the motor development of an 18-month-old. Which gross motor skill should be expected?",
    choices: [
      "Walks up and down stairs without holding on",
      "Kicks a ball forward",
      "Stands on one foot for at least 5 seconds",
      "Pedals a tricycle",
    ],
    correct: 1,
    rationales: [
      "A. Incorrect – Walking up and down stairs independently is later.",
      "B. Correct. Kicking a ball forward is a typical 18-month milestone.",
      "C. Standing on one foot is for older children.",
      "D. Pedaling is for 3+ year olds.",
    ],
    topic: "Developmental Milestones",
    subtopic: "gross motor, 18-month-old, well-child exam, kicking ball",
  },
  {
    id: 9,
    question:
      "During a routine neurologic examination, a nurse practitioner asks the patient to follow a moving object with their eyes. Which cranial nerve is being tested?",
    choices: [
      "Cranial nerve II (optic)",
      "Cranial nerve IV (trochlear)",
      "Cranial nerve III (oculomotor)",
      "Cranial nerve VI (abducens)",
    ],
    correct: 2,
    rationales: [
      "A. Cranial nerve II (optic) – Incorrect: This nerve controls vision, not eye movement.",
      "B. Cranial nerve IV (trochlear) – Controls superior oblique muscle, but not the only one for tracking.",
      "C. Correct. CN III (oculomotor) controls most extraocular movements, including tracking.",
      "D. CN VI (abducens) controls lateral rectus, one direction only.",
    ],
    topic: "Cranial Nerve Function",
    subtopic: "cranial nerves, CN III, pupillary constriction, tracking",
  },
  {
    id: 10,
    question:
      "A 68-year-old patient is scheduled for elective hip replacement. Which is the most important preoperative lab for assessing bleeding risk?",
    choices: [
      "Serum creatinine",
      "Platelet count",
      "Potassium",
      "Calcium",
    ],
    correct: 1,
    rationales: [
      "A. Serum creatinine – Renal function is important, but not the key for bleeding.",
      "B. Correct. Platelets are essential for clotting and bleeding risk.",
      "C. Potassium – Important for cardiac monitoring but not bleeding.",
      "D. Calcium – Important for bone health, not bleeding risk.",
    ],
    topic: "Preoperative Assessment",
    subtopic: "bleeding risk, platelets, pre-op labs, geriatrics",
  },
];

// ---- QUIZ BANK (50 QUESTIONS) ----
const QUIZ_BANK = [
  {
    id: 1,
    question: "What is the recommended first-line therapy for newly diagnosed hypertension in adults?",
    choices: [
      "ACE inhibitor",
      "Beta blocker",
      "Calcium channel blocker",
      "Lifestyle modification"
    ],
    correct: 3,
    rationales: [
      "A. ACE inhibitors are first-line for some populations but always after lifestyle modification.",
      "B. Beta blockers are no longer first-line except in specific cases.",
      "C. Calcium channel blockers are sometimes first-line, but not before lifestyle modification.",
      "D. Correct. Lifestyle modification is always first-line before drug therapy."
    ],
    category: "Adult"
  },
  {
    id: 2,
    question: "Which vaccine is contraindicated in pregnancy?",
    choices: [
      "Tdap",
      "Hepatitis B",
      "Influenza nasal spray",
      "Influenza inactivated"
    ],
    correct: 2,
    rationales: [
      "A. Tdap is recommended during every pregnancy.",
      "B. Hepatitis B vaccine is safe in pregnancy.",
      "C. Correct. Influenza nasal spray is live-attenuated and contraindicated in pregnancy.",
      "D. Inactivated influenza vaccine is safe in pregnancy."
    ],
    category: "Health Promotion"
  },
  {
    id: 3,
    question: "A 4-year-old presents with a barking cough and inspiratory stridor. What is the most likely diagnosis?",
    choices: [
      "Asthma",
      "Bronchiolitis",
      "Croup",
      "Epiglottitis"
    ],
    correct: 2,
    rationales: [
      "A. Asthma does not typically present with a barking cough.",
      "B. Bronchiolitis is associated with wheezing, not stridor.",
      "C. Correct. Croup causes a barking cough and stridor in young children.",
      "D. Epiglottitis usually has drooling and toxic appearance."
    ],
    category: "Pediatrics"
  },
  {
    id: 4,
    question: "Which oral hypoglycemic agent is most likely to cause hypoglycemia?",
    choices: [
      "Metformin",
      "Glipizide",
      "Acarbose",
      "Sitagliptin"
    ],
    correct: 1,
    rationales: [
      "A. Metformin does not typically cause hypoglycemia.",
      "B. Correct. Glipizide, a sulfonylurea, increases risk of hypoglycemia.",
      "C. Acarbose rarely causes hypoglycemia.",
      "D. Sitagliptin rarely causes hypoglycemia."
    ],
    category: "Pharmacology"
  },
  {
    id: 5,
    question: "Which of the following is a live vaccine?",
    choices: [
      "Influenza injection",
      "MMR",
      "Tdap",
      "Hepatitis B"
    ],
    correct: 1,
    rationales: [
      "A. Influenza injection is inactivated.",
      "B. Correct. MMR is a live-attenuated vaccine.",
      "C. Tdap is inactivated.",
      "D. Hepatitis B is recombinant, not live."
    ],
    category: "Pediatrics"
  },
  {
    id: 6,
    question: "A nurse practitioner counsels a patient about smoking cessation. Which intervention is considered first-line?",
    choices: [
      "Clonidine",
      "Bupropion",
      "Varenicline",
      "Behavioral counseling"
    ],
    correct: 3,
    rationales: [
      "A. Clonidine is not first-line for smoking cessation.",
      "B. Bupropion is first-line but usually with counseling.",
      "C. Varenicline is first-line but usually with counseling.",
      "D. Correct. Behavioral counseling is recommended for all patients."
    ],
    category: "Health Promotion"
  },
  {
    id: 7,
    question: "A patient on lisinopril develops a dry cough. What is the best alternative medication?",
    choices: [
      "Switch to losartan",
      "Increase lisinopril dose",
      "Switch to beta blocker",
      "Add a calcium channel blocker"
    ],
    correct: 0,
    rationales: [
      "A. Correct. Losartan (an ARB) is preferred if ACE inhibitors cause cough.",
      "B. Increasing dose will worsen side effects.",
      "C. Beta blockers are not a substitute for ACE inhibitors in hypertension.",
      "D. CCBs can be considered but ARB is preferred."
    ],
    category: "Adult"
  },
  {
    id: 8,
    question: "What is the most appropriate next step for a 30-year-old woman with a new breast lump found on self-exam?",
    choices: [
      "Mammogram",
      "Breast MRI",
      "Breast ultrasound",
      "Biopsy"
    ],
    correct: 2,
    rationales: [
      "A. Mammogram is less sensitive in women under 30.",
      "B. MRI is not the initial test for breast lumps.",
      "C. Correct. Ultrasound is first-line for women under 30.",
      "D. Biopsy is not first-line unless imaging suggests malignancy."
    ],
    category: "Adult"
  },
  {
    id: 9,
    question: "A nurse practitioner is reviewing the chart of a 65-year-old man with new-onset urinary incontinence. Which finding would warrant immediate referral?",
    choices: [
      "Nocturia",
      "Hematuria",
      "Frequency",
      "Mild dribbling"
    ],
    correct: 1,
    rationales: [
      "A. Nocturia is common in older men.",
      "B. Correct. Hematuria may indicate serious pathology and requires evaluation.",
      "C. Frequency is common with BPH and other benign conditions.",
      "D. Mild dribbling is common with BPH."
    ],
    category: "Adult"
  },
  {
    id: 10,
    question: "Which medication should be avoided in patients with a sulfa allergy?",
    choices: [
      "Amoxicillin",
      "Ciprofloxacin",
      "Sulfamethoxazole-trimethoprim",
      "Azithromycin"
    ],
    correct: 2,
    rationales: [
      "A. Amoxicillin does not contain sulfa.",
      "B. Ciprofloxacin does not contain sulfa.",
      "C. Correct. Bactrim is a sulfa drug.",
      "D. Azithromycin does not contain sulfa."
    ],
    category: "Pharmacology"
  },
  {
    id: 11,
    question: "A 70-year-old woman is newly diagnosed with osteoporosis. Which medication is first-line?",
    choices: [
      "Alendronate",
      "Raloxifene",
      "Calcitonin",
      "Estrogen"
    ],
    correct: 0,
    rationales: [
      "A. Correct. Bisphosphonates are first-line for osteoporosis.",
      "B. Raloxifene is second-line.",
      "C. Calcitonin is less effective.",
      "D. Estrogen is not recommended for most postmenopausal women."
    ],
    category: "Adult"
  },
  {
    id: 12,
    question: "Which of the following medications is associated with tendon rupture?",
    choices: [
      "Azithromycin",
      "Ciprofloxacin",
      "Amoxicillin",
      "Doxycycline"
    ],
    correct: 1,
    rationales: [
      "A. Azithromycin is not associated with tendon rupture.",
      "B. Correct. Fluoroquinolones can cause tendon rupture.",
      "C. Amoxicillin is not associated with tendon rupture.",
      "D. Doxycycline is not associated with tendon rupture."
    ],
    category: "Pharmacology"
  },
  {
    id: 13,
    question: "A patient presents with sudden, painless loss of vision in one eye. Fundoscopic exam shows a cherry-red spot. What is the diagnosis?",
    choices: [
      "Retinal detachment",
      "Central retinal artery occlusion",
      "Open angle glaucoma",
      "Central retinal vein occlusion"
    ],
    correct: 1,
    rationales: [
      "A. Retinal detachment usually causes flashing lights and floaters.",
      "B. Correct. Central retinal artery occlusion causes a cherry-red spot.",
      "C. Open angle glaucoma has gradual vision loss.",
      "D. Central retinal vein occlusion shows blood and thunder fundus."
    ],
    category: "Adult"
  },
  {
    id: 14,
    question: "A 55-year-old male with a history of alcohol use presents with tremor, tachycardia, and hypertension. What is the best initial treatment?",
    choices: [
      "Haloperidol",
      "IV fluids",
      "Lorazepam",
      "Propranolol"
    ],
    correct: 2,
    rationales: [
      "A. Haloperidol is used for hallucinations or agitation but not initial treatment for withdrawal.",
      "B. IV fluids are supportive but not initial treatment.",
      "C. Correct. Benzodiazepines are first-line for alcohol withdrawal.",
      "D. Beta blockers may help autonomic symptoms but not initial management."
    ],
    category: "Adult"
  },
  {
    id: 15,
    question: "Which medication is most likely to increase lithium toxicity if co-administered?",
    choices: [
      "Ibuprofen",
      "Acetaminophen",
      "Omeprazole",
      "Amlodipine"
    ],
    correct: 0,
    rationales: [
      "A. Correct. NSAIDs reduce lithium clearance and increase toxicity.",
      "B. Acetaminophen does not affect lithium levels.",
      "C. Omeprazole does not affect lithium clearance.",
      "D. Amlodipine does not interact significantly with lithium."
    ],
    category: "Pharmacology"
  },
  {
    id: 16,
    question: "Which of the following is an example of tertiary prevention?",
    choices: [
      "Smoking cessation counseling",
      "Pap smear",
      "Cardiac rehabilitation",
      "Vaccination"
    ],
    correct: 2,
    rationales: [
      "A. Smoking cessation is primary prevention.",
      "B. Pap smear is secondary prevention (screening).",
      "C. Correct. Tertiary prevention aims to reduce complications of existing disease.",
      "D. Vaccination is primary prevention."
    ],
    category: "Health Promotion"
  },
  {
    id: 17,
    question: "A 7-year-old with sickle cell disease presents with fever and chest pain. What is the most likely diagnosis?",
    choices: [
      "Asthma exacerbation",
      "Acute chest syndrome",
      "Pneumothorax",
      "Epiglottitis"
    ],
    correct: 1,
    rationales: [
      "A. Asthma is less likely in a child with sickle cell disease and fever.",
      "B. Correct. Acute chest syndrome is a common complication in sickle cell disease.",
      "C. Pneumothorax is less likely without trauma or respiratory distress.",
      "D. Epiglottitis does not present with chest pain."
    ],
    category: "Pediatrics"
  },
  {
    id: 18,
    question: "A nurse practitioner is evaluating a patient with a new diagnosis of diabetes. Which medication is preferred if the patient has established ASCVD?",
    choices: [
      "Sulfonylurea",
      "SGLT2 inhibitor",
      "DPP-4 inhibitor",
      "Alpha-glucosidase inhibitor"
    ],
    correct: 1,
    rationales: [
      "A. Sulfonylureas do not improve cardiovascular outcomes.",
      "B. Correct. SGLT2 inhibitors have proven benefit in ASCVD.",
      "C. DPP-4 inhibitors are neutral for CV outcomes.",
      "D. Alpha-glucosidase inhibitors are not recommended for ASCVD."
    ],
    category: "Pharmacology"
  },
  {
    id: 19,
    question: "What is the most common cause of community-acquired pneumonia in adults?",
    choices: [
      "Klebsiella pneumoniae",
      "Mycoplasma pneumoniae",
      "Streptococcus pneumoniae",
      "Pseudomonas aeruginosa"
    ],
    correct: 2,
    rationales: [
      "A. Klebsiella is common in alcoholics but not the most common overall.",
      "B. Mycoplasma is common in young adults but not the most common overall.",
      "C. Correct. Strep pneumoniae is the most common cause.",
      "D. Pseudomonas is associated with healthcare-associated pneumonia."
    ],
    category: "Adult"
  },
  {
    id: 20,
    question: "A patient on warfarin has an INR of 8.0 and minor bleeding. What is the best management?",
    choices: [
      "Hold warfarin, give vitamin K",
      "Continue warfarin and monitor",
      "Increase warfarin dose",
      "Give platelet transfusion"
    ],
    correct: 0,
    rationales: [
      "A. Correct. Hold warfarin and give oral vitamin K for INR > 4.5 with bleeding.",
      "B. Do not continue warfarin with high INR and bleeding.",
      "C. Increasing dose is dangerous.",
      "D. Platelets are not indicated unless severe bleeding and thrombocytopenia."
    ],
    category: "Adult"
  },
  {
    id: 21,
    question: "A child with a history of asthma presents with wheezing and a prolonged expiratory phase. What is the first-line treatment?",
    choices: [
      "Inhaled corticosteroids",
      "Short-acting beta-agonist",
      "Leukotriene receptor antagonist",
      "Oral prednisone"
    ],
    correct: 1,
    rationales: [
      "A. Inhaled corticosteroids are first-line for persistent asthma.",
      "B. Correct. SABA is first-line for acute symptoms.",
      "C. Leukotriene antagonists are adjunct therapy.",
      "D. Oral prednisone is for severe exacerbations."
    ],
    category: "Pediatrics"
  },
  {
    id: 22,
    question: "A 16-year-old presents with dysuria and urinary frequency. Urinalysis shows pyuria and positive nitrites. What is the most likely organism?",
    choices: [
      "Staphylococcus saprophyticus",
      "Escherichia coli",
      "Proteus mirabilis",
      "Enterococcus faecalis"
    ],
    correct: 1,
    rationales: [
      "A. S. saprophyticus is second most common in young women.",
      "B. Correct. E. coli is most common for UTIs.",
      "C. Proteus is more common in complicated or recurrent cases.",
      "D. Enterococcus is less common for community UTIs."
    ],
    category: "Pediatrics"
  },
  {
    id: 23,
    question: "Which medication is most appropriate for initial treatment of mild persistent asthma?",
    choices: [
      "SABA alone",
      "Inhaled corticosteroid",
      "Leukotriene modifier",
      "Oral corticosteroid"
    ],
    correct: 1,
    rationales: [
      "A. SABA alone is for intermittent asthma.",
      "B. Correct. Inhaled steroids are first-line for mild persistent asthma.",
      "C. Leukotriene modifiers are alternative or adjunct therapy.",
      "D. Oral corticosteroids are not first-line."
    ],
    category: "Pediatrics"
  },
  {
    id: 24,
    question: "A 25-year-old presents with right lower quadrant abdominal pain and rebound tenderness. What is the most likely diagnosis?",
    choices: [
      "Cholecystitis",
      "Appendicitis",
      "Ectopic pregnancy",
      "Ovarian torsion"
    ],
    correct: 1,
    rationales: [
      "A. Cholecystitis presents with right upper quadrant pain.",
      "B. Correct. RLQ pain and rebound suggest appendicitis.",
      "C. Ectopic pregnancy would have other associated findings.",
      "D. Ovarian torsion may cause pelvic pain but not classic RLQ pain."
    ],
    category: "Adult"
  },
  {
    id: 25,
    question: "A nurse practitioner prescribes amoxicillin for otitis media. The parent reports a rash after penicillin as a child. What is the best action?",
    choices: [
      "Prescribe amoxicillin anyway",
      "Switch to azithromycin",
      "Order allergy testing",
      "Ask about the rash description"
    ],
    correct: 3,
    rationales: [
      "A. Re-challenge is not safe without more info.",
      "B. Macrolide alternative is appropriate but only if true allergy.",
      "C. Allergy testing is not indicated for remote, mild rash.",
      "D. Correct. Distinguish between minor and severe allergy."
    ],
    category: "Pediatrics"
  },
  {
    id: 26,
    question: "Which medication is associated with angioedema?",
    choices: [
      "Amlodipine",
      "Lisinopril",
      "Hydrochlorothiazide",
      "Atenolol"
    ],
    correct: 1,
    rationales: [
      "A. Amlodipine can cause edema, not angioedema.",
      "B. Correct. ACE inhibitors like lisinopril can cause angioedema.",
      "C. HCTZ causes other side effects but not angioedema.",
      "D. Atenolol does not cause angioedema."
    ],
    category: "Pharmacology"
  },
  {
    id: 27,
    question: "A patient taking isoniazid for latent TB should also be prescribed:",
    choices: [
      "Folic acid",
      "Vitamin B6",
      "Vitamin C",
      "Niacin"
    ],
    correct: 1,
    rationales: [
      "A. Folic acid is for methotrexate, not isoniazid.",
      "B. Correct. Pyridoxine (B6) prevents neuropathy with isoniazid.",
      "C. Vitamin C is not indicated.",
      "D. Niacin is not needed with isoniazid."
    ],
    category: "Pharmacology"
  },
    {
    id: 28,
    question: "A 58-year-old male smoker presents with hematuria and weight loss. What is the most likely diagnosis?",
    choices: [
      "Renal cell carcinoma",
      "Bladder cancer",
      "Benign prostatic hyperplasia",
      "Nephrolithiasis"
    ],
    correct: 1,
    rationales: [
      "A. Renal cell carcinoma can cause hematuria but not as commonly as bladder cancer in smokers.",
      "B. Correct. Smoking is a major risk factor for bladder cancer, which causes painless hematuria.",
      "C. BPH can cause hematuria, but weight loss suggests malignancy.",
      "D. Nephrolithiasis causes pain, not weight loss."
    ],
    category: "Adult"
  },
  {
    id: 29,
    question: "Which of the following is a contraindication to combined oral contraceptive pills?",
    choices: [
      "History of migraine without aura",
      "Hypertension uncontrolled",
      "Diabetes without complications",
      "History of dysmenorrhea"
    ],
    correct: 1,
    rationales: [
      "A. Migraine without aura is not a contraindication.",
      "B. Correct. Uncontrolled hypertension is a contraindication.",
      "C. Diabetes without complications is not a contraindication.",
      "D. Dysmenorrhea is not a contraindication."
    ],
    category: "Adult"
  },
  {
    id: 30,
    question: "A 3-year-old presents with a painless limp and limited hip abduction. What is the most likely diagnosis?",
    choices: [
      "Septic arthritis",
      "Legg-Calve-Perthes disease",
      "Slipped capital femoral epiphysis",
      "Juvenile idiopathic arthritis"
    ],
    correct: 1,
    rationales: [
      "A. Septic arthritis is usually painful with fever.",
      "B. Correct. Legg-Calve-Perthes presents as painless limp, limited abduction.",
      "C. SCFE is more common in obese adolescents.",
      "D. JIA can present similarly but is less common."
    ],
    category: "Pediatrics"
  },
  {
    id: 31,
    question: "What is the best initial management for a patient with gout presenting with severe pain and swelling of the big toe?",
    choices: [
      "Allopurinol",
      "Colchicine",
      "Ibuprofen",
      "Hydrochlorothiazide"
    ],
    correct: 2,
    rationales: [
      "A. Allopurinol is for prevention, not acute attacks.",
      "B. Colchicine is an option but NSAIDs are first-line for acute attack.",
      "C. Correct. NSAIDs are first-line for acute gout.",
      "D. HCTZ can worsen gout."
    ],
    category: "Adult"
  },
  {
    id: 32,
    question: "A nurse practitioner identifies a heart murmur that increases with Valsalva. Which condition is most likely?",
    choices: [
      "Aortic stenosis",
      "Mitral regurgitation",
      "Hypertrophic cardiomyopathy",
      "Atrial septal defect"
    ],
    correct: 2,
    rationales: [
      "A. Aortic stenosis decreases with Valsalva.",
      "B. MR decreases with Valsalva.",
      "C. Correct. HCM murmur increases with Valsalva.",
      "D. ASD murmur does not change with Valsalva."
    ],
    category: "Adult"
  },
  {
    id: 33,
    question: "A 2-year-old presents with vesicular lesions on the hands, feet, and mouth. What is the most likely diagnosis?",
    choices: [
      "Varicella",
      "Herpetic gingivostomatitis",
      "Hand-foot-and-mouth disease",
      "Impetigo"
    ],
    correct: 2,
    rationales: [
      "A. Varicella has lesions in different stages, not limited to hands, feet, mouth.",
      "B. HSV is usually limited to oral cavity.",
      "C. Correct. Coxsackie virus causes HFM disease.",
      "D. Impetigo is honey-crusted, not vesicular."
    ],
    category: "Pediatrics"
  },
  {
    id: 34,
    question: "Which medication should be avoided in a patient with heart failure and reduced ejection fraction?",
    choices: [
      "Metoprolol succinate",
      "Lisinopril",
      "Verapamil",
      "Spironolactone"
    ],
    correct: 2,
    rationales: [
      "A. Metoprolol succinate is recommended in HFrEF.",
      "B. ACE inhibitors are recommended.",
      "C. Correct. Non-dihydropyridine CCBs worsen HFrEF.",
      "D. Spironolactone is recommended."
    ],
    category: "Pharmacology"
  },
  {
    id: 35,
    question: "A nurse practitioner evaluates a patient with non-pruritic, purple, palpable skin lesions on the legs. What is the most likely diagnosis?",
    choices: [
      "Urticaria",
      "Eczema",
      "Vasculitis",
      "Cellulitis"
    ],
    correct: 2,
    rationales: [
      "A. Urticaria is pruritic and transient.",
      "B. Eczema is pruritic and chronic.",
      "C. Correct. Vasculitis presents as palpable purpura.",
      "D. Cellulitis is erythematous, not purpuric."
    ],
    category: "Adult"
  },
  {
    id: 36,
    question: "Which of the following antibiotics should be avoided in children under 8 years old?",
    choices: [
      "Azithromycin",
      "Amoxicillin",
      "Cefdinir",
      "Doxycycline"
    ],
    correct: 3,
    rationales: [
      "A. Azithromycin is safe in children.",
      "B. Amoxicillin is safe.",
      "C. Cefdinir is safe.",
      "D. Correct. Doxycycline causes teeth discoloration."
    ],
    category: "Pediatrics"
  },
  {
    id: 37,
    question: "A 44-year-old with a history of IV drug use presents with fever and a new systolic murmur. What is the most likely diagnosis?",
    choices: [
      "Mitral stenosis",
      "Endocarditis",
      "Aortic regurgitation",
      "Pulmonary embolism"
    ],
    correct: 1,
    rationales: [
      "A. Mitral stenosis presents with a diastolic murmur.",
      "B. Correct. IV drug use is a risk for endocarditis.",
      "C. Aortic regurgitation is a diastolic murmur.",
      "D. PE does not cause murmur."
    ],
    category: "Adult"
  },
  {
    id: 38,
    question: "A nurse practitioner finds a thyroid nodule in a 60-year-old female. Which feature is most concerning for malignancy?",
    choices: [
      "Soft consistency",
      "Moves with swallowing",
      "Firm and fixed",
      "Smooth borders"
    ],
    correct: 2,
    rationales: [
      "A. Soft nodules are less worrisome.",
      "B. Normal thyroid nodules move with swallowing.",
      "C. Correct. Firm and fixed nodules are suspicious.",
      "D. Smooth borders are less worrisome."
    ],
    category: "Adult"
  },
  {
    id: 39,
    question: "Which of the following medications can cause hyperkalemia?",
    choices: [
      "Furosemide",
      "Hydrochlorothiazide",
      "Lisinopril",
      "Metoprolol"
    ],
    correct: 2,
    rationales: [
      "A. Furosemide causes hypokalemia.",
      "B. HCTZ causes hypokalemia.",
      "C. Correct. ACE inhibitors can cause hyperkalemia.",
      "D. Metoprolol does not significantly affect potassium."
    ],
    category: "Pharmacology"
  },
  {
    id: 40,
    question: "A patient presents with a painless, hard mass on the testicle. What is the most likely diagnosis?",
    choices: [
      "Epididymitis",
      "Testicular torsion",
      "Testicular cancer",
      "Varicocele"
    ],
    correct: 2,
    rationales: [
      "A. Epididymitis is painful.",
      "B. Torsion is acutely painful.",
      "C. Correct. Testicular cancer is usually painless and hard.",
      "D. Varicocele is a soft mass."
    ],
    category: "Adult"
  },
  {
    id: 41,
    question: "Which is the first-line pharmacological treatment for ADHD in school-age children?",
    choices: [
      "Methylphenidate",
      "Bupropion",
      "Atomoxetine",
      "Guanfacine"
    ],
    correct: 0,
    rationales: [
      "A. Correct. Stimulants like methylphenidate are first-line.",
      "B. Bupropion is a second-line non-stimulant.",
      "C. Atomoxetine is non-stimulant, used if stimulants are not tolerated.",
      "D. Guanfacine is an alternative, not first-line."
    ],
    category: "Pediatrics"
  },
  {
    id: 42,
    question: "A 35-year-old presents with episodic palpitations, diaphoresis, and hypertension. What is the most likely diagnosis?",
    choices: [
      "Panic attack",
      "Pheochromocytoma",
      "Hyperthyroidism",
      "Mitral valve prolapse"
    ],
    correct: 1,
    rationales: [
      "A. Panic attacks can cause palpitations but usually not hypertension.",
      "B. Correct. Classic triad for pheochromocytoma.",
      "C. Hyperthyroidism causes palpitations but not paroxysmal hypertension.",
      "D. MVP can cause palpitations, rarely hypertension."
    ],
    category: "Adult"
  },
  {
    id: 43,
    question: "Which medication is preferred for blood pressure management in a patient with chronic kidney disease?",
    choices: [
      "Hydrochlorothiazide",
      "Lisinopril",
      "Amlodipine",
      "Metoprolol"
    ],
    correct: 1,
    rationales: [
      "A. HCTZ is less effective in CKD.",
      "B. Correct. ACE inhibitors are renal-protective.",
      "C. Amlodipine is not first-line for CKD.",
      "D. Metoprolol is not renal-protective."
    ],
    category: "Adult"
  },
  {
    id: 44,
    question: "A 29-year-old female presents with dysuria, frequency, and suprapubic pain. Urinalysis shows >100,000 CFU/mL bacteria. What is the diagnosis?",
    choices: [
      "Pyelonephritis",
      "Acute cystitis",
      "Interstitial cystitis",
      "Renal abscess"
    ],
    correct: 1,
    rationales: [
      "A. Pyelonephritis would have fever and flank pain.",
      "B. Correct. Acute cystitis presents as described.",
      "C. Interstitial cystitis is chronic.",
      "D. Renal abscess is rare and severe."
    ],
    category: "Adult"
  },
  {
    id: 45,
    question: "Which of the following is a risk factor for endometrial cancer?",
    choices: [
      "Multiparity",
      "Oral contraceptive use",
      "Obesity",
      "Early menopause"
    ],
    correct: 2,
    rationales: [
      "A. Multiparity is protective.",
      "B. OCPs are protective.",
      "C. Correct. Obesity increases estrogen and risk.",
      "D. Late, not early menopause is a risk."
    ],
    category: "Adult"
  },
  {
    id: 46,
    question: "A nurse practitioner is evaluating a patient for depression. Which of the following symptoms is required for the diagnosis?",
    choices: [
      "Sleep disturbance",
      "Low energy",
      "Anhedonia",
      "Appetite change"
    ],
    correct: 2,
    rationales: [
      "A. Sleep disturbance is common but not required.",
      "B. Low energy is common but not required.",
      "C. Correct. Anhedonia (loss of interest) or depressed mood is required.",
      "D. Appetite change is common but not required."
    ],
    category: "Adult"
  },
  {
    id: 47,
    question: "A 68-year-old with COPD presents with increased sputum and dyspnea. What is the best next step?",
    choices: [
      "Start inhaled corticosteroids",
      "Begin oral antibiotics",
      "Increase SABA use",
      "Order chest CT"
    ],
    correct: 1,
    rationales: [
      "A. ICS are not first-line for exacerbation.",
      "B. Correct. Antibiotics indicated for increased sputum/dyspnea in COPD.",
      "C. SABA is already likely maximized.",
      "D. Chest CT is not first-line."
    ],
    category: "Adult"
  },
  {
    id: 48,
    question: "Which of the following vaccines is live-attenuated?",
    choices: [
      "Polio (IPV)",
      "MMR",
      "Hepatitis B",
      "Tdap"
    ],
    correct: 1,
    rationales: [
      "A. IPV is inactivated.",
      "B. Correct. MMR is live-attenuated.",
      "C. Hepatitis B is recombinant.",
      "D. Tdap is inactivated."
    ],
    category: "Pediatrics"
  },
  {
    id: 49,
    question: "A 9-year-old with Type 1 diabetes has morning hyperglycemia despite evening insulin. What is the next step?",
    choices: [
      "Increase evening insulin dose",
      "Check 3am blood glucose",
      "Switch to oral agents",
      "Decrease carb intake at dinner"
    ],
    correct: 1,
    rationales: [
      "A. Increasing dose may cause hypoglycemia if Somogyi effect.",
      "B. Correct. Checking 3am BG distinguishes dawn vs Somogyi effect.",
      "C. Oral agents are not indicated.",
      "D. Decreasing carbs may help but doesn't identify the cause."
    ],
    category: "Pediatrics"
  },
  {
    id: 50,
    question: "Which medication should be avoided in elderly patients due to risk of SIADH and hyponatremia?",
    choices: [
      "Sertraline",
      "Amitriptyline",
      "Metformin",
      "Amlodipine"
    ],
    correct: 0,
    rationales: [
      "A. Correct. SSRIs like sertraline increase risk of SIADH.",
      "B. TCAs have other risks but not SIADH.",
      "C. Metformin does not cause SIADH.",
      "D. Amlodipine does not cause SIADH."
    ],
    category: "Pharmacology"
  }
];

const CATEGORY_LIST = [
  "Adult",
  "Pediatrics",
  "Pharmacology",
  "Health Promotion",
  "Professionalism"
];

// -------------------- MAIN APP COMPONENT --------------------
function App() {
  // --- App-wide state ---
  const [storedUser, setStoredUser] = useState(() =>
    localStorage.getItem("aanp_user") || ""
  );
  const [username, setUsername] = useState("");
  const [page, setPage] = useState("home");

  // Practice test state
  const [testProgress, setTestProgress] = useState(0);
  const [answers, setAnswers] = useState(Array(PRACTICE_TEST.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  // Quiz bank state
  const [quizBankPage, setQuizBankPage] = useState("main");
  const [filterState, setFilterState] = useState({
    filterType: "Unanswered",
    filterCategory: ["Adult"]
  });

  // Used for quiz bank user progress
  const localKey = "aanp_quizbank_" + storedUser;
  const [userData, setUserData] = useState(() => {
    const saved = storedUser ? window.localStorage.getItem(localKey) : null;
    if (saved) return JSON.parse(saved);
    return { answers: Array(QUIZ_BANK.length).fill(null) };
  });

  // When switching users, reset local userData
  useEffect(() => {
    if (!storedUser) return;
    const saved = window.localStorage.getItem("aanp_quizbank_" + storedUser);
    if (saved) setUserData(JSON.parse(saved));
    else setUserData({ answers: Array(QUIZ_BANK.length).fill(null) });
  }, [storedUser]);

  // --- LOGIN PAGE ---
  function Login() {
    return (
      <div style={cardStyle({ maxWidth: "28rem", marginTop: "7rem" })}>
        <h1 style={titleStyle()}>AANP Test Prep Login</h1>
        <form
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.3rem" }}
          onSubmit={(e) => {
            e.preventDefault();
            setStoredUser(username.trim());
            localStorage.setItem("aanp_user", username.trim());
            setPage("home");
          }}
          autoComplete="off"
        >
          <input
            style={inputStyle()}
            type="text"
            placeholder="Enter username"
            value={username}
            required
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
          />
          <button style={primaryButtonStyle()} type="submit">
            Enter
          </button>
        </form>
      </div>
    );
  }

  // --- HOME PAGE ---
  function Home() {
    return (
      <div style={cardStyle({ maxWidth: "26rem", marginTop: "5rem" })}>
        <h1 style={titleStyle({ marginBottom: "2.5rem" })}>AANP Test Prep</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
          <button style={secondaryButtonStyle()} disabled>
            AANP Test 1 (Coming Soon)
          </button>
          <button style={secondaryButtonStyle()} disabled>
            AANP Test 2 (Coming Soon)
          </button>
          <button style={secondaryButtonStyle()} disabled>
            AANP Test 3 (Coming Soon)
          </button>
          <button
            style={primaryButtonStyle()}
            onClick={() => {
              setTestProgress(0);
              setAnswers(Array(PRACTICE_TEST.length).fill(null));
              setSubmitted(false);
              setPage("instructions");
            }}
          >
            Practice Test
          </button>
          <button
            style={primaryButtonStyle({ background: "#0ea5e9" })}
            onClick={() => {
              setQuizBankPage("main");
              setFilterState({ filterType: "Unanswered", filterCategory: ["Adult"] });
              setPage("quizbank");
            }}
          >
            Quiz Bank
          </button>
          <button
            style={primaryButtonStyle({ background: "#f59e42" })}
            onClick={() => setPage("progress")}
          >
            My Progress
          </button>
        </div>
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <button
            style={{
              background: "none", border: 0, color: "#888",
              textDecoration: "underline", fontSize: "1rem", cursor: "pointer"
            }}
            onClick={() => {
              setStoredUser("");
              localStorage.removeItem("aanp_user");
            }}
          >Logout</button>
        </div>
      </div>
    );
  }

  // --- PRACTICE TEST PAGES ---
  function Instructions() {
    return (
      <div style={cardStyle({ maxWidth: "28rem" })}>
        <h2 style={titleStyle({ fontSize: "1.4rem" })}>Practice Test Instructions</h2>
        <div style={{ marginBottom: "1.5rem", color: "#2c2c2c", lineHeight: 1.7 }}>
          <p>
            This is a simulation of an AANP certification exam. The test is <b>{PRACTICE_TEST.length} questions</b>.
          </p>
          <p>
            You will be able to review all questions with rationales once the test is complete.
          </p>
          <p>
            Good luck!
          </p>
        </div>
        <button
          style={primaryButtonStyle({ width: "100%" })}
          onClick={() => {
            setTestProgress(0);
            setPage("test");
          }}
        >
          Start Test
        </button>
        <button
          style={textButtonStyle({ marginTop: "2.2rem" })}
          onClick={() => setPage("home")}
        >
          Home
        </button>
      </div>
    );
  }
  function Test() {
    const q = PRACTICE_TEST[testProgress];
    const selectedChoice = answers[testProgress];
    const answered = selectedChoice !== null;

    return (
      <div style={cardStyle({ maxWidth: "38rem", minHeight: "480px" })}>
        <div style={questionHeaderStyle()}>
          <div style={{ fontSize: "1.1rem", color: "#52525b" }}>
            Question {testProgress + 1} of {PRACTICE_TEST.length}
          </div>
          <button style={textButtonStyle()} onClick={() => setPage("home")}>Home</button>
        </div>
        <div style={{ fontWeight: 700, marginBottom: "1rem" }}>{q.question}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
          {q.choices.map((choice, i) => (
            <label key={i} style={radioChoiceStyle(selectedChoice === i)}>
              <input
                type="radio"
                name={`q${q.id}`}
                checked={selectedChoice === i}
                onChange={() => {
                  if (!answered) {
                    const newAns = [...answers];
                    newAns[testProgress] = i;
                    setAnswers(newAns);
                  }
                }}
                style={{ accentColor: "#2563eb" }}
                disabled={answered}
              />
              <span>{choice}</span>
            </label>
          ))}
        </div>
        {!answered && (
          <button
            style={primaryButtonStyle({ marginBottom: "1.3rem" })}
            onClick={() => {
              if (selectedChoice !== null) {
                const newAns = [...answers];
                newAns[testProgress] = selectedChoice;
                setAnswers(newAns);
              }
            }}
            disabled={selectedChoice === null}
          >
            Submit
          </button>
        )}
        <div style={testNavBarStyle()}>
          <button
            style={secondaryButtonStyle({ opacity: testProgress === 0 ? 0.5 : 1 })}
            disabled={testProgress === 0}
            onClick={() => setTestProgress((n) => n - 1)}
          >Back</button>
          {testProgress < PRACTICE_TEST.length - 1 ? (
            <button
              style={primaryButtonStyle({
                background: "#2563eb",
                opacity: answers[testProgress] === null ? 0.5 : 1
              })}
              onClick={() => setTestProgress((n) => n + 1)}
              disabled={answers[testProgress] === null}
            >Next</button>
          ) : (
            <button
              style={primaryButtonStyle({
                background: "#16a34a",
                opacity: answers[testProgress] === null ? 0.5 : 1
              })}
              onClick={() => {
                setSubmitted(true);
                setPage("results");
              }}
              disabled={answers[testProgress] === null}
            >Submit Test</button>
          )}
        </div>
      </div>
    );
  }
  function Results() {
    const correctCount = answers.reduce(
      (sum, a, i) => sum + (a === PRACTICE_TEST[i].correct ? 1 : 0), 0
    );
    const percent = Math.round((correctCount / PRACTICE_TEST.length) * 100);
    return (
      <div style={cardStyle({ maxWidth: "28rem" })}>
        <h2 style={titleStyle({ fontSize: "2rem" })}>Practice Test Results</h2>
        <div style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "0.5rem", color: "#2563eb" }}>{percent}%</div>
        <div style={{ marginBottom: "1.5rem", fontSize: "1.1rem", color: "#333" }}>
          You answered {correctCount} out of {PRACTICE_TEST.length} questions correctly.
        </div>
        <button style={primaryButtonStyle()} onClick={() => { setTestProgress(0); setPage("review"); }}>
          Review Answers
        </button>
        <button style={textButtonStyle({ marginTop: "2.2rem" })} onClick={() => setPage("home")}>
          Home
        </button>
      </div>
    );
  }
  function Review() {
    const q = PRACTICE_TEST[testProgress];
    const userAns = answers[testProgress];
    return (
      <div style={cardStyle({ maxWidth: "38rem", minHeight: "480px" })}>
        <div style={questionHeaderStyle()}>
          <div style={{ fontSize: "1.1rem", color: "#52525b" }}>
            Review: Question {testProgress + 1} of {PRACTICE_TEST.length}
          </div>
          <button style={textButtonStyle()} onClick={() => setPage("home")}>Home</button>
        </div>
        <div style={{ fontWeight: 700, marginBottom: "1rem" }}>{q.question}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.2rem" }}>
          {q.choices.map((choice, i) => (
            <div
              key={i}
              style={reviewChoiceStyle(i === q.correct, i === userAns)}
            >
              <span>{choice}</span>
              {userAns === i ? (
                i === q.correct ? (
                  <span style={{ marginLeft: "1rem", color: "#16a34a", fontWeight: 600 }}>✓ Correct</span>
                ) : (
                  <span style={{ marginLeft: "1rem", color: "#dc2626", fontWeight: 600 }}>✗ Your Answer</span>
                )
              ) : null}
            </div>
          ))}
        </div>
        <div style={rationaleBoxStyle()}>
          <div style={{ fontWeight: 600, marginBottom: "0.5rem", color: "#222" }}>Rationales:</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {q.rationales.map((r, i) => (
              <div key={i}>
                <span style={{ fontWeight: 700, marginRight: "0.5rem" }}>{String.fromCharCode(65 + i)}.</span>
                {r.replace(/^A\. |^B\. |^C\. |^D\. /, "")}
              </div>
            ))}
          </div>
        </div>
        <div style={testNavBarStyle()}>
          <button
            style={secondaryButtonStyle({ opacity: testProgress === 0 ? 0.5 : 1 })}
            disabled={testProgress === 0}
            onClick={() => setTestProgress((n) => n - 1)}
          >Back</button>
          {testProgress < PRACTICE_TEST.length - 1 ? (
            <button
              style={primaryButtonStyle({ background: "#2563eb" })}
              onClick={() => setTestProgress((n) => n + 1)}
            >Next</button>
          ) : (
            <button
              style={secondaryButtonStyle()}
              onClick={() => setPage("home")}
            >Home</button>
          )}
        </div>
      </div>
    );
  }

  // -------------------- QUIZ BANK COMPONENTS --------------------

  function QuizBank() {
    return (
      <div style={cardStyle({ maxWidth: "32rem", marginTop: "5rem" })}>
        <h1 style={titleStyle()}>Quiz Bank</h1>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "2.2rem", justifyContent: "center" }}>
          <button style={primaryButtonStyle()} onClick={() => setQuizBankPage("quiz")}>Open Question Bank</button>
          <QuizBankFilters />
        </div>
        <button style={textButtonStyle()} onClick={() => setPage("home")}>Home</button>
      </div>
    );
  }

  function QuizBankFilters() {
    // Dropdown menu for filters
    return (
      <div style={{ position: "relative" }}>
        <details>
          <summary style={primaryButtonStyle({ cursor: "pointer", width: "fit-content" })}>Filters</summary>
          <div style={{
            position: "absolute",
            zIndex: 20,
            background: "#fff",
            border: "1.5px solid #e5e7eb",
            borderRadius: "0.7rem",
            boxShadow: "0 6px 24px #0002",
            marginTop: "0.5rem",
            minWidth: "220px",
            padding: "1rem"
          }}>
            {/* Filter Type */}
            <label style={{ fontWeight: 600, marginBottom: "0.4rem", display: "block" }}>Filter Type:</label>
            <select
              value={filterState.filterType}
              onChange={e => {
                setFilterState(fs => ({
                  ...fs,
                  filterType: e.target.value
                }));
              }}
              style={inputStyle({ marginBottom: "1rem" })}
            >
              <option value="Unanswered">Unanswered</option>
              <option value="Correct Questions">Correct Questions</option>
              <option value="Incorrect Questions">Incorrect Questions</option>
            </select>
            {/* Filter Category */}
            <label style={{ fontWeight: 600, marginBottom: "0.4rem", display: "block" }}>Category:</label>
            <select
              value={filterState.filterCategory[0]}
              onChange={e => setFilterState(fs => ({
                ...fs,
                filterCategory: [e.target.value]
              }))}
              style={inputStyle()}
            >
              {CATEGORY_LIST.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </details>
      </div>
    );
  }

function QuizBankQuizPage({
  userData,
  setUserData,
  filterState,
  setQuizBankPage,
  localKey
}) {
  // Map categories
  function getQuestionCategories(q) {
    return CATEGORY_LIST.includes(q.category) ? [q.category] : ["Adult"];
  }

  // State to remember which question we just submitted
  const [lastIdx, setLastIdx] = React.useState(null);
  const [selectedChoice, setSelectedChoice] = React.useState(null);
  const [justSubmitted, setJustSubmitted] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  // Build list of “Unanswered” (or filtered) questions
  const allIndexes = QUIZ_BANK.map((_, i) => i);
  let eligibleIndexes = allIndexes.filter(i => {
    const answered = userData.answers[i] !== null;
    const correct  = answered && userData.answers[i] === QUIZ_BANK[i].correct;
    // category filter
    if (!filterState.filterCategory.some(cat =>
      getQuestionCategories(QUIZ_BANK[i]).includes(cat))) {
      return false;
    }
    if (filterState.filterType === "Unanswered") return !answered;
    if (filterState.filterType === "Correct Questions")   return correct;
    if (filterState.filterType === "Incorrect Questions") return answered && !correct;
    return false;
  });

  // While we’re in "justSubmitted" state, override to show only that last question
  if (justSubmitted && lastIdx !== null) {
    eligibleIndexes = [ lastIdx ];
  }

  // Whenever filters change, reset to first
  React.useEffect(() => {
    setIndex(0);
    setSelectedChoice(null);
    setJustSubmitted(false);
    setLastIdx(null);
  }, [filterState.filterType, filterState.filterCategory]);

  // Whenever we move to a new question (or exit rationale), clear selection
  React.useEffect(() => {
    setSelectedChoice(null);
    if (!justSubmitted) setLastIdx(null);
  }, [index, justSubmitted]);

  // If nothing matches filters
  if (eligibleIndexes.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "5rem" }}>
        <h2>No questions match your filters.</h2>
        <button onClick={() => setQuizBankPage("main")}>
          Back to Quiz Bank
        </button>
      </div>
    );
  }

  // Current question index in the bank
  const curIdx = eligibleIndexes[index];
  const q      = QUIZ_BANK[curIdx];
  const answered   = userData.answers[curIdx] !== null;
  const userChoice = answered ? userData.answers[curIdx] : selectedChoice;
  const showRationale = answered || justSubmitted;

  function handleSubmit() {
    if (selectedChoice === null) return;
    // save answer
    const next = {
      ...userData,
      answers: [...userData.answers]
    };
    next.answers[curIdx] = selectedChoice;
    setUserData(next);
    window.localStorage.setItem(localKey, JSON.stringify(next));

    // trigger rationale view
    setLastIdx(curIdx);
    setJustSubmitted(true);
  }

  return (
    <div style={cardStyle({ maxWidth: "32rem", marginTop: "5rem" })}>
      <div style={{ marginBottom: "1rem", color: "#666", fontWeight: 600 }}>
        Question {index + 1} of {eligibleIndexes.length}
      </div>
      <div style={{ marginBottom: "1.3rem", fontWeight: 700 }}>
        {q.question}
      </div>

      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        marginBottom: "1.3rem"
      }}>
        {q.choices.map((choice, i) => (
          <button
            key={i}
            onClick={() => {
              if (!showRationale) setSelectedChoice(i);
            }}
            disabled={showRationale}
            style={{
              padding: "0.75rem",
              textAlign: "left",
              cursor: showRationale ? "default" : "pointer",
              background: showRationale
                ? (i === q.correct
                    ? "#bbf7d0"
                    : (userChoice === i ? "#fecaca" : "#f3f4f6"))
                : (userChoice === i ? "#dbeafe" : "#f3f4f6"),
              border: showRationale
                ? (i === q.correct
                    ? "2px solid #22c55e"
                    : (userChoice === i ? "2px solid #ef4444" : "1.5px solid #e5e7eb"))
                : (userChoice === i ? "2px solid #1d4ed8" : "1.5px solid #e5e7eb"),
              borderRadius: "0.75rem"
            }}
          >
            {choice}
            {showRationale && i === q.correct && (
              <span style={{ marginLeft: 8, color: "#16a34a" }}>✓ Correct</span>
            )}
            {showRationale && userChoice === i && userChoice !== q.correct && (
              <span style={{ marginLeft: 8, color: "#dc2626" }}>✗ Your Answer</span>
            )}
          </button>
        ))}
      </div>

      {!showRationale ? (
        <button
          onClick={handleSubmit}
          disabled={selectedChoice === null}
          style={primaryButtonStyle({
            marginBottom: "1.3rem",
            opacity: selectedChoice === null ? 0.6 : 1
          })}
        >
          Submit
        </button>
      ) : (
        <div style={{
          background: userChoice === q.correct ? "#bbf7d0" : "#fecaca",
          borderRadius: "0.75rem",
          padding: "1rem",
          marginBottom: "1.3rem"
        }}>
          <div style={{ fontWeight: 700, marginBottom: "0.6rem" }}>
            {userChoice === q.correct ? "Correct!" : "Incorrect."}
          </div>
          {q.rationales.map((r, i) => (
            <div key={i} style={{
              fontWeight: i === q.correct ? 700 : 400,
              color: i === q.correct ? "#16a34a" : "#b91c1c",
              marginBottom: "0.4rem"
            }}>
              <strong>{String.fromCharCode(65 + i)}.</strong> {r.replace(/^[A-D]\.\s*/, "")}
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          onClick={() => {
            setJustSubmitted(false);
            setIndex(i => Math.max(0, i - 1));
          }}
          disabled={index === 0}
          style={secondaryButtonStyle({ opacity: index === 0 ? 0.5 : 1 })}
        >
          Back
        </button>
        <button
          onClick={() => {
            // clear rationale and go next
            setJustSubmitted(false);
            setIndex(i => Math.min(eligibleIndexes.length - 1, i + 1));
          }}
          disabled={index === eligibleIndexes.length - 1}
          style={primaryButtonStyle({
            background: "#0ea5e9",
            opacity: index === eligibleIndexes.length - 1 ? 0.5 : 1
          })}
        >
          Next
        </button>
      </div>

      <button
        onClick={() => setQuizBankPage("main")}
        style={secondaryButtonStyle({ marginTop: "2rem" })}
      >
        Back to Quiz Bank
      </button>
    </div>
  );
}






















  // --- "MY PROGRESS" PAGE ---
  function ProgressPage() {
    // Only tracks quiz bank, not practice test
    const total = QUIZ_BANK.length;
    const answered = userData.answers.filter(a => a !== null).length;
    const percent = Math.round((answered / total) * 100);
    return (
      <div style={cardStyle({ maxWidth: "28rem", marginTop: "5rem", textAlign: "center" })}>
        <h1 style={titleStyle()}>My Progress</h1>
        <div style={{
          fontSize: "2.4rem",
          fontWeight: 700,
          color: "#0ea5e9",
          margin: "1.1rem 0"
        }}>{percent}%</div>
        <div style={{ fontSize: "1.18rem", marginBottom: "1.6rem" }}>
          You have answered {answered} out of {total} quiz bank questions.<br />
          <span style={{ color: "#16a34a", fontWeight: 600 }}>
            You're doing great! Keep studying! <span style={{ fontSize: "1.3em" }}>😊</span>
          </span>
        </div>
        <button style={primaryButtonStyle()} onClick={() => setPage("home")}>
          Home
        </button>
      </div>
    );
  }

  // -------------------- ROUTER --------------------
  if (!storedUser) return <Login />;
  if (page === "home") return <Home />;
  if (page === "instructions") return <Instructions />;
  if (page === "test") return <Test />;
  if (page === "results") return <Results />;
  if (page === "review") return <Review />;
  if (page === "progress") return <ProgressPage />;
  if (page === "quizbank") {
  if (quizBankPage === "main") return <QuizBank />;
  if (quizBankPage === "quiz")
    return (
      <QuizBankQuizPage
  userData={userData}
  setUserData={setUserData}
  filterState={filterState}
  setQuizBankPage={setQuizBankPage}
  localKey={localKey}
/>
    );
}
  return <div>404</div>;
}

// -------------------- STYLES --------------------
function cardStyle(extra = {}) {
  return {
    maxWidth: "32rem",
    margin: "5rem auto",
    padding: "2rem",
    borderRadius: "1.5rem",
    boxShadow: "0 8px 32px #0002",
    background: "#fff",
    ...extra
  };
}
function titleStyle(extra = {}) {
  return {
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: "1.5rem",
    textAlign: "center",
    ...extra
  };
}
function primaryButtonStyle(extra = {}) {
  return {
    background: "#1d4ed8",
    color: "#fff",
    padding: "0.9rem 2.5rem",
    borderRadius: "1rem",
    fontWeight: 600,
    border: 0,
    cursor: "pointer",
    fontSize: "1rem",
    ...extra
  };
}
function secondaryButtonStyle(extra = {}) {
  return {
    background: "#e5e7eb",
    color: "#222",
    borderRadius: "1rem",
    border: 0,
    padding: "0.9rem 2.5rem",
    fontWeight: 600,
    fontSize: "1rem",
    cursor: "pointer",
    ...extra
  };
}
function textButtonStyle(extra = {}) {
  return {
    color: "#888",
    textDecoration: "underline",
    background: "none",
    border: 0,
    cursor: "pointer",
    fontSize: "1rem",
    ...extra
  };
}
function inputStyle(extra = {}) {
  return {
    padding: "0.6rem",
    borderRadius: "0.8rem",
    border: "1.5px solid #e5e7eb",
    width: "100%",
    fontSize: "1rem",
    ...extra
  };
}
function questionHeaderStyle() {
  return { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" };
}
function radioChoiceStyle(selected) {
  return {
    display: "flex", alignItems: "center", gap: "0.8rem",
    borderRadius: "0.6rem", padding: "0.4rem 0.8rem",
    cursor: "pointer",
    border: selected ? "2px solid #2563eb" : "1.5px solid #e5e7eb",
    background: selected ? "#dbeafe" : "#fff",
    fontWeight: selected ? 600 : 400
  };
}
function reviewChoiceStyle(isCorrect, isUserAns) {
  return {
    borderRadius: "0.6rem",
    padding: "0.4rem 0.8rem",
    border: isCorrect
      ? "2px solid #16a34a"
      : isUserAns
        ? "2px solid #dc2626"
        : "1.5px solid #e5e7eb",
    background: isCorrect
      ? "#dcfce7"
      : isUserAns
        ? "#fee2e2"
        : "#fff",
    fontWeight: isCorrect ? 700 : 400
  };
}
function testNavBarStyle() {
  return { display: "flex", justifyContent: "space-between", marginTop: "auto", gap: "0.8rem" };
}
function rationaleBoxStyle() {
  return { background: "#f4f4f5", padding: "1rem", borderRadius: "1rem", boxShadow: "0 2px 8px #0001", marginBottom: "1.5rem" };
}

// -------------------- EXPORT APP --------------------
export default App;