import sys
import unittest

from omegaconf import OmegaConf

sys.path.append("configs")
from config import ChatGPTConfig

from src.prompt_conversion import PromptConverter


class TestPromptConverter(unittest.TestCase):
    def setUp(self) -> None:
        self.config = OmegaConf.create(ChatGPTConfig)
        self.prompt_converter = PromptConverter(self.config)

    def test_convert(self) -> None:
        example_1 = "Make it a character-like image of a cute anime"
        prompt = self.prompt_converter.convert(example_1)
        self.assertEqual(type(prompt), str)
