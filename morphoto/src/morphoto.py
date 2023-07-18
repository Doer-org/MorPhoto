import sys

from omegaconf import OmegaConf
from PIL import Image

sys.path.append("configs")
from config import IconConverterConfig

from filter import TextFilter
from image_conversion import ImageConverter
from prompt_conversion import PromptConverter
from translate import CustomTranslator


class IconConverter:
    def __init__(self, converter_config: IconConverterConfig):
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
    text = "柴犬"
    image_path = "data/sample/nijika.png"
    strength = 0.8
    image = Image.open(image_path)
    icon_converter_config = OmegaConf.create(IconConverterConfig)
    icon_converter = IconConverter(icon_converter_config)
    icon, prompt = icon_converter.convert(text, image)
    print(prompt)
    icon.save("result.png")
