import base64
import io
import sys

import uvicorn
from fastapi import FastAPI
from omegaconf import OmegaConf
from PIL import Image

from models import InferenceRequest
from morphoto import Morphoto

sys.path.append("configs")
from config import MorphotoConfig

morphoto_config = OmegaConf.create(MorphotoConfig)
morphoto = Morphoto(morphoto_config)
app = FastAPI()


@app.post("/inference")
def inference(request: InferenceRequest) -> dict[str, str]:
    image = io.BytesIO(base64.b64decode(request.image))
    image = Image.open(image)
    converted_image, prompt = morphoto.convert(request.prompt, image, request.strength)

    buffered = io.BytesIO()
    converted_image.save(buffered, format="PNG")
    converted_image = base64.b64encode(buffered.getvalue()).decode()
    result = {"converted_image": converted_image, "prompt": prompt}
    return result


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
