from fastapi import APIRouter, HTTPException
from app.schemas.models import GapAnalysisRequest, GapAnalysisResponse
from app.adapters.ai_adapter import AIAdapter

router = APIRouter(prefix="/gap-analysis", tags=["Gap Analysis & Upskilling Pathway"])

@router.post("", response_model=GapAnalysisResponse)
async def gap_analysis(payload: GapAnalysisRequest):
    try:
        return AIAdapter.gap_analysis(
            candidate_id=payload.candidate_id,
            competencies=payload.competencies
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
