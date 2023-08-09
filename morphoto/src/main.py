import base64
import io
import os
from dotenv import load_dotenv

import modal
import uvicorn
from fastapi import FastAPI
from modal import asgi_app
from starlette.middleware.cors import CORSMiddleware
from omegaconf import OmegaConf
from PIL import Image
from configs import MorphotoConfig
from models import InferenceRequest
from morphoto import Morphoto

morphoto_config = OmegaConf.create(MorphotoConfig)
morphoto = Morphoto(morphoto_config)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://morphoto.app", "https://www.morphoto.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
stub = modal.Stub("mophoto-fastapi")
modal_image = modal.Image.debian_slim().poetry_install_from_file(
    poetry_pyproject_toml="pyproject.toml", poetry_lockfile="poetry.lock"  # , force_build=True
)


@app.post("/inference")
def inference(request: InferenceRequest) -> dict[str, str]:
    if request.is_mock:
        return {"converted_image": request.image, "prompt": request.prompt}
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


load_dotenv()
data_dir = os.getenv("DATA_DIR") or "data"
print(data_dir)


@stub.function(
    image=modal_image,
    # .envによりfrom, toを指定&読み込み
    # .envは直接SECRETSに設定（WEB) たぶんこのままだとOPENAI_API_KEY等が読み込まれない
    mounts=[modal.Mount.from_local_dir(data_dir, remote_path="/root/data")],
    secret=modal.Secret.from_name("morphoto-ml-secrets"),
)
@asgi_app()
def fastapi_app() -> FastAPI:
    return app


@stub.local_entrypoint()
def main() -> None:
    uvicorn.run(app, host="0.0.0.0", port=8000)


if __name__ == "__main__":
    main()
