from fastapi import APIRouter, HTTPException
from app.schemas.models import MapCompetenciesRequest, MapCompetenciesResponse
from app.adapters.ai_adapter import AIAdapter

router = APIRouter(prefix="/map-competencies", tags=["NSQF Competency Mapping"])

@router.post("", response_model=MapCompetenciesResponse)
async def map_competencies(payload: MapCompetenciesRequest):
    try:
        return AIAdapter.map_competencies(
            candidate_id=payload.candidate_id,
            skills=payload.extracted_skills
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
