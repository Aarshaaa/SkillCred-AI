from fastapi import APIRouter, HTTPException
from app.schemas.models import STTRequest, STTResponse
from app.adapters.ai_adapter import AIAdapter

router = APIRouter(prefix="/stt", tags=["Speech-to-Text"])

@router.post("", response_model=STTResponse)
async def process_speech_to_text(payload: STTRequest):
    try:
        return AIAdapter.process_stt(
            candidate_id=payload.candidate_id,
            language=payload.language,
            simulated_text=payload.simulated_speech_text
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
