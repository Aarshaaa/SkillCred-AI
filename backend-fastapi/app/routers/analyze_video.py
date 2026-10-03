from fastapi import APIRouter, HTTPException
from app.schemas.models import AnalyzeVideoRequest, AnalyzeVideoResponse
from app.adapters.ai_adapter import AIAdapter

router = APIRouter(prefix="/analyze-video", tags=["Basic Video Analysis"])

@router.post("", response_model=AnalyzeVideoResponse)
async def analyze_video(payload: AnalyzeVideoRequest):
    try:
        return AIAdapter.analyze_video(
            candidate_id=payload.candidate_id,
            video_ref=payload.video_reference,
            task_id=payload.task_id
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
