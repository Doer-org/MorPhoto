from diffusers import StableDiffusionImg2ImgPipeline
import torch

model_id = "runwayml/stable-diffusion-v1-5"
pipe = StableDiffusionImg2ImgPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
pipe.save_pretrained("data/stable-diffusion-v1-5")