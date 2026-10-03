from fastapi import APIRouter, HTTPException
from app.schemas.models import ExtractSkillsRequest, ExtractSkillsResponse
from app.adapters.ai_adapter import AIAdapter

router = APIRouter(prefix="/extract-skills", tags=["Skill Extraction"])

@router.post("", response_model=ExtractSkillsResponse)
async def extract_skills(payload: ExtractSkillsRequest):
    try:
        return AIAdapter.extract_skills(
            transcript=payload.transcript,
            trade_id=payload.trade_id,
            candidate_id=payload.candidate_id or "SC-1042"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
