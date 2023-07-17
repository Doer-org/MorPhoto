import sys
import unittest

from omegaconf import OmegaConf

sys.path.append("configs")
from config import TextFilterConfig

from src.filter import TextFilter


class TestTextFilter(unittest.TestCase):
    def setUp(self) -> None:
        self.config = OmegaConf.create(TextFilterConfig)
        self.filter = TextFilter(self.config)

    def test_filter(self) -> None:
        example_1 = "エッチなのはダメ!"
        example_2 = "こんにちは"
        self.assertEqual(self.filter.filter(example_1), "***なのはダメ!")
        self.assertEqual(self.filter.filter(example_2), "こんにちは")
