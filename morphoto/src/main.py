import base64
import io

import modal
from fastapi import FastAPI
from modal import asgi_app
from omegaconf import OmegaConf
from PIL import Image

from configs import MorphotoConfig
from models import InferenceRequest
from morphoto import Morphoto

morphoto_config = OmegaConf.create(MorphotoConfig)
morphoto = Morphoto(morphoto_config)
app = FastAPI()
stub = modal.Stub("mophoto-fastapi")
modal_image = modal.Image.debian_slim().poetry_install_from_file(
    poetry_pyproject_toml="pyproject.toml", poetry_lockfile="poetry.lock"  # , force_build=True
)


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


@stub.function(image=modal_image, mounts=[modal.Mount.from_local_python_packages("data")])
@asgi_app()
def fastapi_app() -> FastAPI:
    return app


# https://github.com/modal-labs/modal-examples/blob/main/07_web_endpoints/fastapi_app.py
# https://modal.com/home
# https://modal.com/docs/reference/modal.Image#poetry_install_from_file
# https://modal.com/docs/reference/modal.Mount#from_local_python_packages

if __name__ == "__main__":
    stub.deploy("mophoto-fastapi")
