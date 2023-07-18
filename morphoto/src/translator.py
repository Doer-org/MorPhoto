import sys

from googletrans import Translator

sys.path.append("configs")
from config import TranslationConfig


class CustomTranslator:
    def __init__(self, translation_config: TranslationConfig):
        self.config = translation_config
        self.translator = Translator()

    def translate(self, text: str) -> str:
        translation = self.translator.translate(text, dest=self.config.dest, src=self.config.src).text
        return translation


if __name__ == "__main__":
    from omegaconf import OmegaConf
    print("入力文")
    example_1 = "こんにちは"
    print(example_1)
    translation_config = OmegaConf.create(TranslationConfig)
    translator = CustomTranslator(translation_config)
    print("翻訳文")
    print(translator.translate(example_1))