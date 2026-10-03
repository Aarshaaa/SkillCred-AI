# SkillCred AI — AI-Assisted Skill Assessment Tool for Recognition of Prior Learning (RPL)

> **Theme**: Smart Education  
> **Core Value Proposition**: *"Transform informal work experience into structured, explainable skill profiles and personalized RPL pathways using AI-assisted assessment."*

---

## 🛡️ Mandatory Human Assessor Governance Rule
> **IMPORTANT**: AI only assists with preliminary assessment, multilingual voice intake, skill extraction, NSQF competency mapping, video evidence analysis, and gap pathway recommendations. **The final RPL certification decision remains explicitly and exclusively with an authorized human assessor.** AI scores are never presented as final certification decisions.

---

## 🏗️ System Architecture

SkillCred AI is built using the required high-performance technical stack:

```
                  ┌─────────────────────────────────────────────────────────┐
                  │                 React.js Frontend (SPA)                 │
                  │   Candidate View | Assessor Console | SSC Analytics    │
                  └────────────────────────────┬────────────────────────────┘
                                               │
                                               ▼
                  ┌─────────────────────────────────────────────────────────┐
                  │          Node.js Express API Gateway & Auth             │
                  │   OAuth2 JWT Guard | Workflow Routing | Media Storage   │
                  └──────────────┬────────────────────────────┬─────────────┘
                                 │                            │
                                 ▼                            ▼
┌──────────────────────────────────────────────────┐   ┌──────────────────────────────────────────────────┐
│             FastAPI Python AI Service            │   │            Database & Storage Layer             │
│  • Speech-to-Text (/stt)                         │   │  • PostgreSQL: Normalized NSQF Competencies &    │
│  • Skill Extraction (/extract-skills)            │   │    Users/Roles DDL (`database/postgres.sql`)    │
│  • Competency Mapping (/map-competencies)        │   │  • MongoDB: Semi-Structured Evidence Docs &     │
│  • Basic Video Analysis (/analyze-video)         │   │    Audit Events (`database/mongo_schemas.js`)    │
│  • Adaptive Diagnostics (/adaptive-assessment)   │   │  • Cloud Object Storage: Media Uploads Abstraction│
│  • Upskilling Pathways (/gap-analysis)           │   └──────────────────────────────────────────────────┘
└──────────────────────────────────────────────────┘
```

---

## 🚀 How to Run locally

### Prerequisites
- Python 3.10+ (for FastAPI)
- Node.js 18+ (for Express and React Vite)

### 1. Run FastAPI AI Microservices Layer
```bash
cd backend-fastapi
pip install -r requirements.txt
python run.py
# Server runs on http://localhost:8000
# Interactive API docs available at http://localhost:8000/docs
```

### 2. Run Express API Gateway & Orchestration Server
```bash
cd backend-express
npm install
node server.js
# API Gateway runs on http://localhost:5000
```

### 3. Run React Frontend Web Application
```bash
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:3000
```

---

## 👥 Product Roles & Features

### 1. Candidate Experience (Voice-First & Low Digital Literacy)
- **Multilingual Voice Intake**: Support for Hindi, Tamil, Marathi, Bengali, and English speech intake with live STT transcript editing.
- **"Voice to Skill Tree" Pipeline**: Animated visual transformation showing `Spoken Experience -> Extracted Skills -> Mapped NSQF Competencies -> Practical Evidence`.
- **Skill Passport**: Printable/shareable candidate skill credential with NSQF matrix and Preliminary Assessment Readiness score.
- **Practical Evidence Capture**: Briefing & safety checklists with **Basic Video Analysis** procedure checkpoints and safety indicators.
- **Adaptive Diagnostic Check**: Scenario-based image/video questions reacting adaptively to candidate skill gaps.
- **Upskilling Pathway**: Targeted bridge module sequence mapping current profile to reassessment.

### 2. Authorized Assessor Console (Assessor Co-Pilot)
- **Structured Evidence Packet**: Complete candidate dossier containing voice transcripts, extracted skill tags, NSQF matrix, video observations, and diagnostic results.
- **"Review in 60 Seconds" Summary**: Executive overview highlighting strongest evidence, uncertain items, missing evidence, and recommended action.
- **AI Rationale Panel ("Why this result?")**: Transparent evidence provenance drawer explaining mapping rationales.
- **"Request More Evidence" 1-Click Workflow**: Send targeted evidence requests directly to candidate dashboards.
- **Final Human Decision Controls**: `Approve & Issue RPL Certification`, `Request More Evidence`, `Return for Reassessment`.

### 3. Admin / Sector Skill Council (SSC) Analytics View
- **Pipeline Metrics**: Total candidates, pending assessor queue, turnaround time, human certification rates.
- **Skill-to-Employment Overview**: Top verified competencies and frequent skill gaps across trades (Electrical, Tailoring, Plumbing, Healthcare).

---

## 🔌 Adapter Architecture & Plug-in Guide

| AI Service | Production Adapter Location | Fallback / Plug-in Target |
|---|---|---|
| **Speech-to-Text (STT)** | `backend-fastapi/app/adapters/ai_adapter.py` | Plug in OpenAI Whisper API or Bhashini Speech API |
| **Skill Extraction** | `backend-fastapi/app/adapters/ai_adapter.py` | Plug in SpaCy NLP pipeline / HuggingFace Transformers / LLM |
| **Basic Video Analysis** | `backend-fastapi/app/adapters/ai_adapter.py` | Plug in OpenCV frame sampler / YOLO v8 safety detection |
| **Cloud Media Storage** | `backend-express/src/services/storageService.js` | Switch `STORAGE_PROVIDER=s3_bucket` for AWS S3 bucket |

---

