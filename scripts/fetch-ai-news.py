#!/usr/bin/env python3
"""
Hacker News AI News Fetcher
Fetches top AI-related stories from Hacker News and generates MDX files for Docusaurus.
"""

import json
import os
import re
import requests
from datetime import datetime, timezone, timedelta
from typing import List, Dict, Optional
import html

# Hacker News API endpoints
HN_TOP_STORIES = "https://hacker-news.firebaseio.com/v0/topstories.json"
HN_ITEM = "https://hacker-news.firebaseio.com/v0/item/{}.json"

# AI-related keywords for filtering
AI_KEYWORDS = [
    'ai', 'artificial intelligence', 'machine learning', 'ml', 'deep learning',
    'neural network', 'gpt', 'llm', 'chatgpt', 'openai', 'anthropic', 'claude',
    'gemini', 'llama', 'mistral', 'transformer', 'diffusion', 'stable diffusion',
    'midjourney', 'dall-e', 'computer vision', 'nlp', 'natural language',
    'reinforcement learning', 'tensorflow', 'pytorch', 'hugging face',
    'langchain', 'rag', 'vector database', 'embedding', 'fine-tuning',
    'gguf', 'quantization', 'inference', 'apple silicon', 'mps', 'metal',
    'ollama', 'local llm', 'mlx', 'coreml'
]

# Simple translations dictionary for common terms
TRANSLATIONS = {
    'artificial intelligence': '人工智能',
    'machine learning': '机器学习',
    'deep learning': '深度学习',
    'neural network': '神经网络',
    'natural language processing': '自然语言处理',
    'computer vision': '计算机视觉',
    'reinforcement learning': '强化学习',
    'large language model': '大语言模型',
}


def fetch_story(story_id: int) -> Optional[Dict]:
    """Fetch a single story from Hacker News API."""
    try:
        response = requests.get(HN_ITEM.format(story_id), timeout=10)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error fetching story {story_id}: {e}")
        return None


def is_ai_related(story: Dict) -> bool:
    """Check if a story is AI-related based on title and URL."""
    if not story:
        return False
    
    title = story.get('title', '').lower()
    url = story.get('url', '').lower()
    text = f"{title} {url}"
    
    for keyword in AI_KEYWORDS:
        if keyword.lower() in text:
            return True
    return False


def translate_title(title: str) -> str:
    """
    Simple translation helper. 
    For production, you'd want to use a proper translation API.
    This provides a basic English-to-Chinese summary format.
    """
    # For now, keep the English title and add a note
    # In production, integrate with Google Translate API or similar
    return title


def fetch_top_ai_stories(count: int = 10) -> List[Dict]:
    """Fetch top AI-related stories from Hacker News."""
    print("Fetching top stories from Hacker News...")
    
    try:
        response = requests.get(HN_TOP_STORIES, timeout=10)
        response.raise_for_status()
        story_ids = response.json()
    except Exception as e:
        print(f"Error fetching top stories: {e}")
        return []
    
    ai_stories = []
    checked = 0
    
    # Check stories until we have enough AI-related ones
    for story_id in story_ids:
        if len(ai_stories) >= count:
            break
        
        if checked >= 200:  # Don't check more than 200 stories
            break
        
        checked += 1
        story = fetch_story(story_id)
        
        if story and is_ai_related(story):
            ai_stories.append({
                'id': story.get('id'),
                'title': story.get('title', 'Untitled'),
                'url': story.get('url', f"https://news.ycombinator.com/item?id={story.get('id')}"),
                'score': story.get('score', 0),
                'author': story.get('by', 'unknown'),
                'comments': story.get('descendants', 0),
                'time': story.get('time', 0),
                'hn_url': f"https://news.ycombinator.com/item?id={story.get('id')}"
            })
            print(f"  Found: {story.get('title', 'Untitled')[:60]}...")
    
    print(f"Found {len(ai_stories)} AI-related stories out of {checked} checked")
    return ai_stories


def generate_mdx(stories: List[Dict], date: datetime) -> str:
    """Generate MDX content for the daily news page."""
    date_str = date.strftime('%Y-%m-%d')
    date_cn = date.strftime('%Y年%m月%d日')
    
    mdx_content = f"""---
sidebar_position: 1
title: "{date_cn} AI 新闻 TOP10"
description: "来自 Hacker News 的今日 AI 热门新闻"
---

# 🗞️ {date_cn} AI 新闻 TOP10

> 数据来源: [Hacker News](https://news.ycombinator.com) | 自动更新于 {datetime.now(timezone(timedelta(hours=8))).strftime('%H:%M')} CST

---

"""
    
    for i, story in enumerate(stories, 1):
        title = html.escape(story['title'])
        url = story['url']
        hn_url = story['hn_url']
        score = story['score']
        comments = story['comments']
        author = story['author']
        
        mdx_content += f"""## {i}. {title}

- 🔗 **链接**: [{url[:50]}...]({url})
- 👤 **作者**: {author}
- ⬆️ **得分**: {score} | 💬 **评论**: [{comments}]({hn_url})

---

"""
    
    mdx_content += """
## 📊 数据说明

本页面由自动化脚本生成，数据来源于 Hacker News 前 200 条热门帖子中与 AI 相关的内容。

筛选关键词包括：AI、Machine Learning、LLM、GPT、Neural Network 等。

---

[← 返回新闻日历](/docs/ai-news)
"""
    
    return mdx_content


def generate_calendar_data(base_path: str) -> Dict:
    """Scan existing news files and generate calendar data."""
    calendar_data = {}
    
    for year_dir in os.listdir(base_path):
        year_path = os.path.join(base_path, year_dir)
        if not os.path.isdir(year_path) or not year_dir.isdigit():
            continue
        
        for month_dir in os.listdir(year_path):
            month_path = os.path.join(year_path, month_dir)
            if not os.path.isdir(month_path) or not month_dir.isdigit():
                continue
            
            for day_file in os.listdir(month_path):
                if day_file.endswith('.mdx'):
                    day = day_file.replace('.mdx', '')
                    date_key = f"{year_dir}-{month_dir}-{day}"
                    calendar_data[date_key] = True
    
    return calendar_data


def save_news(stories: List[Dict], base_path: str, date: datetime):
    """Save news to MDX file."""
    year = date.strftime('%Y')
    month = date.strftime('%m')
    day = date.strftime('%d')
    
    dir_path = os.path.join(base_path, year, month)
    os.makedirs(dir_path, exist_ok=True)
    
    file_path = os.path.join(dir_path, f"{day}.mdx")
    
    mdx_content = generate_mdx(stories, date)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(mdx_content)
    
    print(f"Saved news to {file_path}")
    return file_path


def save_calendar_json(base_path: str):
    """Generate and save calendar data JSON."""
    calendar_data = generate_calendar_data(base_path)
    
    json_path = os.path.join(base_path, 'calendar-data.json')
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(calendar_data, f, indent=2)
    
    print(f"Saved calendar data to {json_path}")


def main():
    """Main entry point."""
    # Use China timezone (UTC+8)
    china_tz = timezone(timedelta(hours=8))
    today = datetime.now(china_tz)
    
    print(f"Fetching AI news for {today.strftime('%Y-%m-%d')}")
    
    # Determine base path
    script_dir = os.path.dirname(os.path.abspath(__file__))
    base_path = os.path.join(script_dir, '..', 'docs', 'ai-news')
    base_path = os.path.abspath(base_path)
    
    # Fetch and save news
    stories = fetch_top_ai_stories(count=10)
    
    if stories:
        save_news(stories, base_path, today)
        save_calendar_json(base_path)
        print("Done!")
    else:
        print("No AI stories found today.")


if __name__ == '__main__':
    main()
