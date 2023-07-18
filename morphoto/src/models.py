from pydantic import BaseModel


class InferenceRequest(BaseModel):
    image: str
    prompt: str
    strength: float
