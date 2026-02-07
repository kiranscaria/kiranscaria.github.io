---
layout: page
title: Projects
description: Systems I am building in public, with implementation notes and progress updates.
eyebrow: Work in Public
---
I build long-horizon AI systems with a strong bias toward correctness, observability, and measurable improvement over time.

Project notes are published as essays with architecture context, tradeoffs, and follow-up milestones.

## Current Focus

- autonomous coding workflows with rigorous verification loops
- long-term memory architectures for production assistants
- evaluation-first delivery for LLM and agent stacks

## Project Log

{% assign project_posts = 0 %}
{% for post in site.posts %}
  {% if post.categories contains 'projects' %}
{% assign project_posts = project_posts | plus: 1 %}
### [{{ post.title }}]({{ post.url | relative_url }})

_{{ post.date | date: "%B %-d, %Y" }}_

{{ post.excerpt | strip_html | truncatewords: 45 }}

{% endif %}
{% endfor %}

{% if project_posts == 0 %}
Project updates are coming soon. I am actively building and will publish progress notes here.
{% endif %}
