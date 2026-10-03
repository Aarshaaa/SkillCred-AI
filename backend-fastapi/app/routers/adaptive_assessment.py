from fastapi import APIRouter, HTTPException
from app.schemas.models import AdaptiveAssessmentRequest, AdaptiveAssessmentResponse
from app.adapters.ai_adapter import AIAdapter

router = APIRouter(prefix="/adaptive-assessment", tags=["Adaptive Assessment"])

@router.post("", response_model=AdaptiveAssessmentResponse)
async def adaptive_assessment(payload: AdaptiveAssessmentRequest):
    try:
        return AIAdapter.adaptive_assessment(
            candidate_id=payload.candidate_id,
            trade_id=payload.trade_id,
            history=payload.previous_answers or []
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
