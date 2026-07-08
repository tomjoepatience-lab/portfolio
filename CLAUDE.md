# portfolio（tomjo ポートフォリオサイト）

## 概要
慶應「2026年 実践のためのWebプログラミング」レポート課題（自由制作・課題A）のためのポートフォリオサイト。
自分のプロダクト（welcomy / Nurture）と個人開発アプリ（マネコ家計簿・iOS各種）を紹介し、
本命のマネコ家計簿については「制作記」ブログで思考・こだわり・つまずきを本人の言葉で語る。
ハイブリッド構成（ポートフォリオ土台＋目玉の制作記1本）。

## 技術スタック
- 素の HTML / CSS / JavaScript（フレームワーク・ビルドなし）
- ホスティング: GitHub Pages

## 構成
- `index.html` … Hero / プロダクト(welcomy・Nurture) / つくったもの(マネコ★・iOS) / About
- `making-of-maneko.html` … 制作記（課題の評価対象。テーマ/サービス/設計/こだわり/悩み/学び/感想）
- `style.css` … デザイントークン（温かい紙色＋墨色＋琥珀アクセント、ダークモード対応）
- `.nojekyll` … GitHub Pages の Jekyll 無効化

## ルール・規約
- シンプル・読みやすさ優先。外部ライブラリを足さない（素のまま）。
- 課題要件: 冒頭に「2026年 実践のためのWebプログラミングのレポート課題です」を明記（バナーで対応済み）。
- 制作記の `.fill`（ハッチ表示）は本人が自分の言葉で埋める箇所。AI丸投げにしない。
- 絵文字サムネはプレースホルダ。実スクショに差し替え可。

## よく使うコマンド
- ローカル確認: `python -m http.server 8000` → http://localhost:8000

## Obsidian 連携
このプロジェクトのノートは Projects/portfolio.md に保存する。
掲載アプリの詳細は各 Projects ノート（welcomy / nurture / tabikake / okite / hibi / ittekimasu / kakeibo）を参照。
