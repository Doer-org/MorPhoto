import os
import sys

import torch
from diffusers import StableDiffusionImg2ImgPipeline
from dotenv import load_dotenv
from PIL import Image

sys.path.append("configs")
from config import DiffusionConfig


class ImageConverter:
    def __init__(self, diffusion_config: DiffusionConfig):
        self.config = diffusion_config
        self.device = torch.device(self.config.device)
        self.model, self.generator = self._inference_setup()

    def _inference_setup(self):
        load_dotenv()
        token = os.environ.get("HUGGING_FACE_TOKEN")
        model = StableDiffusionImg2ImgPipeline.from_pretrained(
            self.config.model, use_auth_token=token
        )
        model = model.to(self.device)
        model.safety_checker = lambda images, **kwargs: (images, [False])
        generator = torch.Generator(device=self.device).manual_seed(self.config.seed)
        return model, generator

    def convert(self, prompt: str, image, strength: float = 0.8):
        image = image.convert("RGB")
        image = image.resize(self.config.image_size)
        image = self.model(
            prompt=prompt,
            image=image,
            strength=strength,
            generator=self.generator,
        ).images[0]
        return image


if __name__ == "__main__":
    from omegaconf import OmegaConf

    diffusion_config = OmegaConf.create(DiffusionConfig)
    prompt = "best quality masterpiece makoto shinkai "
    image_path = "data/sample/nijika.png"
    image = Image.open(image_path)
    converter = ImageConverter(diffusion_config)
    image = converter.convert(prompt, image)
    image.save("result.png")
