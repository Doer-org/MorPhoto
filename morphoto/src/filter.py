import re
from typing import List

from configs import TextFilterConfig


class TextFilter:
    def __init__(self, filter_config: TextFilterConfig):
        self.config = filter_config
        self.sexual_vocabs = self._create_filtering_vocabs(self.config.sexual_file_path)
        self.offensive_vocabs = self._create_filtering_vocabs(self.config.offensive_file_path)
        self.pattern = self._create_filter_pattern()

    def _create_filtering_vocabs(self, path: str) -> List[str]:
        if not path:
            return []
        with open(path, "r", encoding="utf-8") as f:
            return [v.strip() for v in f]

    def _create_filter_pattern(self) -> str:
        return r"(" + "|".join(self.sexual_vocabs + self.offensive_vocabs) + r")"

    def filter(self, text: str) -> str:
        filtered_text = re.sub(self.pattern, self.config.replace_word, text)
        return " ".join(filtered_text.split())


if __name__ == "__main__":
    from omegaconf import OmegaConf

    filter_config = OmegaConf.create(TextFilterConfig)
    text_filter = TextFilter(filter_config)
    example_1 = "エッチなのはダメ!"
    example_2 = "こんにちは"
    print(text_filter.filter(example_1))
    print(text_filter.filter(example_2))
