import unittest

from omegaconf import OmegaConf

from src.configs import TranslationConfig
from src.translator import CustomTranslator


class TestCustomTranslator(unittest.TestCase):
    def setUp(self) -> None:
        self.config = OmegaConf.create(TranslationConfig)
        self.translator = CustomTranslator(self.config)

    def test_translate(self) -> None:
        example_1 = "こんにちは"
        self.assertEqual(self.translator.translate(example_1), "Hello")
