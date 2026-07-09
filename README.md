# tomjo — portfolio

慶應「2026年 実践のためのWebプログラミング」レポート課題（自由制作）のポートフォリオサイト。
素の HTML / CSS / JS のみ。ビルド不要・GitHub Pages でそのまま配信できる。

## 構成
- `index.html` — トップ（Hero / プロダクト / つくったもの / About）
- `making-of-maneko.html` — 制作記「マネコ家計簿を作った話」（課題の評価対象・本命）
- `style.css` — デザイントークン一式
- `.nojekyll` — GitHub Pages で素の配信をする（Jekyll処理を無効化）

## ローカルで見る
```
python -m http.server 8000
# → http://localhost:8000
```
または `index.html` をブラウザで直接開く。

## 公開（GitHub Pages）
1. GitHub に空リポジトリ `portfolio` を作成
2. このフォルダを push（`main` ブランチ）
3. リポジトリ Settings → Pages → Source を `main / (root)` に設定
4. 数分後 `https://<user>.github.io/portfolio/` で公開

## TODO
- 画像9点（`assets/IMAGE_PROMPTS.md`）を生成して assets/ に配置（置くだけで自動反映）
- **制作記5章以降（サービスの説明・設計）が薄い＆現行実装と差分あり → アプリが完成したら実態に合わせて書き直す**
- **制作記5章「できあがったもの」に実際のアプリ画面のスクショを載せる（アプリ完成後）**
- GitHubリポジトリURLを実物に（今は github.com/tomjo/kakeibo 仮）
- About の自己紹介を自分の言葉で
- GitHub Pages 公開・提出URLの決定（index か 制作記）
