from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import (
    stt, extract_skills, map_competencies,
    analyze_video, adaptive_assessment, gap_analysis
)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="SkillCred AI Microservices API for Speech-to-Text, Skill Extraction, NSQF Mapping, Basic Video Analysis and Gap Pathways.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Enable CORS for Express gateway and Frontend SPA
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers under API prefix
app.include_router(stt.router, prefix=settings.API_V1_STR)
app.include_router(extract_skills.router, prefix=settings.API_V1_STR)
app.include_router(map_competencies.router, prefix=settings.API_V1_STR)
app.include_router(analyze_video.router, prefix=settings.API_V1_STR)
app.include_router(adaptive_assessment.router, prefix=settings.API_V1_STR)
app.include_router(gap_analysis.router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "service": "SkillCred AI FastAPI Microservices Layer",
        "status": "online",
        "demo_mode": settings.DEMO_MODE,
        "docs": "/docs",
        "endpoints": [
            f"{settings.API_V1_STR}/stt",
            f"{settings.API_V1_STR}/extract-skills",
            f"{settings.API_V1_STR}/map-competencies",
            f"{settings.API_V1_STR}/analyze-video",
            f"{settings.API_V1_STR}/adaptive-assessment",
            f"{settings.API_V1_STR}/gap-analysis"
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
