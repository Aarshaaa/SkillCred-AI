import os

class Settings:
    PROJECT_NAME: str = "SkillCred AI - FastAPI Microservices"
    API_V1_STR: str = "/api/v1/ai"
    DEMO_MODE: bool = True
    
    # STT Provider adapter settings (Whisper / Bhashini / Demo)
    STT_PROVIDER: str = os.getenv("STT_PROVIDER", "demo_whisper_adapter")
    
    # LLM Skill Extraction adapter settings
    SKILL_EXTRACTOR_PROVIDER: str = os.getenv("SKILL_EXTRACTOR_PROVIDER", "demo_spacy_llm_adapter")
    
    # Basic Video Analysis provider settings
    VIDEO_ANALYZER_PROVIDER: str = os.getenv("VIDEO_ANALYZER_PROVIDER", "demo_opencv_yolo_adapter")

settings = Settings()
