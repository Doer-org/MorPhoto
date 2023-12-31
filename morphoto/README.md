# MorPhoto
## 概要
MorPhotoはユーザーがプロンプトを用いてアイコン画像を自由に変換することができるサービスです
## 全体の流れ
![](assets/overview.png)
## 実行方法
### 準備 : トークンの設定
```bash
echo 'OPENAI_API_KEY=your_openai_api_key' >> .env
echo 'HUGGING_FACE_TOKEN=your_huggingface_token' >> .env
```
### モデルのダウンロード
```bash
poetry install
poetry run python src/download_model.py
```
### 実行 + テスト
```bash
poetry install
poetry run uvicorn src.main:app --reload
poetry run pytest # テスト
```

### デプロイ
```bash
poetry run modal deploy src/main.py
```

## 変換結果
### 変換例1 : 新海誠風
![](assets/example1.png)
### 変換例2 : 花火大会
![](assets/example2.png)
### 変換例3 : ラーメン
![](assets/example3.png)
