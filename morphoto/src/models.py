from pydantic import BaseModel
from typing import Optional


class InferenceRequest(BaseModel):
    image: str
    prompt: str
    strength: float
    is_mock: Optional[bool]
