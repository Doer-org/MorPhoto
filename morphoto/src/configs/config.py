from dataclasses import dataclass, field
from typing import Tuple
import os
import torch


@dataclass
class TextFilterConfig:
    replace_word: str = "***"  # 不適切な単語を何に置換するか
    sexual_file_path: str = (
        "data/inappropriate-words-ja/Sexual.txt"
        if os.path.exists("data/inappropriate-words-ja/Sexual.txt")
        else "/root/data/inappropriate-words-ja/Sexual.txt"
    )
    offensive_file_path: str = (
        "data/inappropriate-words-ja/Offensive.txt"
        if os.path.exists("data/inappropriate-words-ja/Offensive.txt")
        else "/root/data/inappropriate-words-ja/Offensive.txt"
    )


@dataclass
class TranslationConfig:
    src: str = "ja"
    dest: str = "en"


@dataclass
class ChatGPTConfig:
    # https://gist.github.com/bluelovers/92dac6fe7dcbafd7b5ae0557e638e6ef?permalink_comment_id=4493653
    system_prompt: str = "Stable Diffusion is an AI art generation model similar to DALLE-2. Here are some prompts for generating art with Stable Diffusion. Example: - A ghostly apparition drifting through a haunted mansion's grand ballroom, illuminated by flickering candlelight. Eerie, ethereal, highly detailed, digital painting, artstation, concept art, moody lighting. - portait of a homer simpson archer shooting arrow at forest monster, front game card, drark, marvel comics, dark, intricate, highly detailed, smooth, digital illustration - pirate, concept art, deep focus, fantasy, intricate, highly detailed, digital painting, matte, sharp focus, illustration - red dead redemption 2, cinematic view, epic sky, detailed, concept art, low angle, high detail, warm lighting, volumetric, godrays, vivid, beautiful - a fantasy style portrait painting of rachel lane / alison brie hybrid in the style of francois boucher oil painting, rpg portrait - athena, greek goddess, claudia black, bronze greek armor, owl crown, d & d, fantasy, intricate, portrait, highly detailed, headshot, digital painting, concept art, sharp focus, illustration - closeup portrait shot of a large strong female biomechanic woman in a scenic scifi environment, intricate, elegant, highly detailed, centered, digital painting, concept art, smooth, sharp focus, warframe, illustration - ultra realistic illustration of steve urkle as the hulk, intricate, elegant, highly detailed, digital painting, concept art, smooth, sharp focus, illustration - portrait of beautiful happy young ana de armas, ethereal, realistic anime, detailed, clean lines, sharp lines, crisp lines, vibrant color scheme - A highly detailed and hyper realistic portrait of a gorgeous young ana de armas, lisa frank, butterflies, floral, sharp focus, intricate details, highly detailed The prompt should adhere to and include all of the following rules: - Prompt should always be written in English, regardless of the input language. Please provide the prompts in English. - Each prompt should consist of a description of the scene followed by modifiers divided by commas. - The modifiers should alter the mood, style, lighting, and other aspects of the scene. - Multiple modifiers can be used to provide more specific details. - When generating prompts, reduce abstract psychological and emotional descriptions. Please respond with a prompt if you cannot generate an image. I want you to write me the most appropriate prompt only. "
    model: str = "gpt-3.5-turbo"


@dataclass
class DiffusionConfig:
    model: str = "data/stable-diffusion-v1-5"
    image_size: Tuple[int, int] = (400, 400)
    seed: int = 10
    device: str = "cuda" if torch.cuda.is_available() else "cpu"


@dataclass
class MorphotoConfig:
    text_filter_config: TextFilterConfig = field(default_factory=TextFilterConfig)
    translation_config: TranslationConfig = field(default_factory=TranslationConfig)
    chatgpt_config: ChatGPTConfig = field(default_factory=ChatGPTConfig)
    diffusion_config: DiffusionConfig = field(default_factory=DiffusionConfig)
