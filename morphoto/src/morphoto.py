from PIL import Image

from configs import MorphotoConfig
from filter import TextFilter
from image_converter import ImageConverter
from prompt_converter import PromptConverter
from translator import CustomTranslator


class Morphoto:
    def __init__(self, converter_config: MorphotoConfig):
        self.config = converter_config
        self.text_filter = TextFilter(self.config.text_filter_config)
        self.translator = CustomTranslator(self.config.translation_config)
        self.prompt_converter = PromptConverter(self.config.chatgpt_config)
        self.image_converter = ImageConverter(self.config.diffusion_config)

    def convert(self, text: str, image, strength: float = 0.8):
        filterd_text = self.text_filter.filter(text)
        translated_text = self.translator.translate(filterd_text)
        prompt = self.prompt_converter.convert(translated_text)
        icon = self.image_converter.convert(prompt, image, strength)
        return icon, prompt


if __name__ == "__main__":
    from omegaconf import OmegaConf

    text = "ラーメン"
    image_path = "data/sample/nijika.png"
    strength = 0.8
    image = Image.open(image_path)
    morphoto_config = OmegaConf.create(MorphotoConfig)
    morphoto = Morphoto(morphoto_config)
    icon, prompt = morphoto.convert(text, image, strength)
    icon.save("result.png")
