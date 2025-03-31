---
layout: page
title: "AI Software Engineer"
description: "Building the future of autonomous coding"
background: '/assets/images/bg-index.jpg'
---

<div class="container">
  <div class="row">
    <div class="col-lg-10 col-md-12 mx-auto">
      <div class="project-heading mb-5">
        <h1>AI Software Engineer</h1>
        <p class="lead">A passion project to build an autonomous coding system that outshines human coders in most tasks.</p>
      </div>
      
      <div class="project-overview mb-5">
        <h2>Project Vision</h2>
        <p>This ambitious solo endeavor aims to create an AI Software Engineer that can:</p>
        <ul>
          <li>Understand software requirements from natural language descriptions</li>
          <li>Design appropriate system architectures</li>
          <li>Write clean, efficient, and maintainable code</li>
          <li>Test and debug its own implementations</li>
          <li>Refactor and optimize existing codebases</li>
          <li>Learn from mistakes and grow over time</li>
          <li>Master new frameworks and adapt to new languages</li>
        </ul>
        <p class="mt-3">The priority is correctness, ensuring the code it produces is reliable,over speed or cost-efficiency. This project isn't about profit, but about pushing the boundaries of what's possible with today's LLMs and technology.</p>
      </div>
      
      <div class="journey-log mb-5">
        <h2>Development Journey</h2>
        <p class="text-muted mb-4">Follow my progress as I build this ambitious project</p>
        
        <div class="journal-entries">
          {% assign ai_engineer_posts = site.posts | where: "categories", "ai-software-engineer" | sort: "date" | reverse %}
          {% for post in ai_engineer_posts %}
            <div class="journal-entry mb-4">
              <div class="entry-date">
                <span class="day">{{ post.date | date: "%d" }}</span>
                <span class="month">{{ post.date | date: "%b" }}</span>
                <span class="year">{{ post.date | date: "%Y" }}</span>
              </div>
              <div class="entry-content">
                <h3><a href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a></h3>
                <p>{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
                <a href="{{ post.url | prepend: site.baseurl }}" class="read-more">Read more &rarr;</a>
              </div>
            </div>
            {% unless forloop.last %}<hr class="my-4">{% endunless %}
          {% endfor %}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.project-heading {
  border-bottom: 1px solid rgba(0,0,0,0.1);
  padding-bottom: 1.5rem;
}

.journal-entry {
  display: flex;
  align-items: flex-start;
}

.entry-date {
  flex: 0 0 80px;
  text-align: center;
  padding: 10px;
  border-radius: 4px;
  background-color: #f8f9fa;
  margin-right: 20px;
}

.entry-date .day {
  display: block;
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1;
}

.entry-date .month {
  display: block;
  font-size: 1rem;
  text-transform: uppercase;
  margin: 5px 0;
}

.entry-date .year {
  display: block;
  font-size: 0.9rem;
  color: #6c757d;
}

.entry-content {
  flex: 1;
}

.entry-content h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.entry-content h3 a {
  color: #212529;
  text-decoration: none;
  transition: color 0.2s ease;
}

.entry-content h3 a:hover {
  color: #0085A1;
}

.read-more {
  display: inline-block;
  margin-top: 0.5rem;
  font-weight: 600;
  color: #0085A1;
  text-decoration: none;
}

@media (max-width: 576px) {
  .journal-entry {
    flex-direction: column;
  }
  
  .entry-date {
    flex: 0 0 auto;
    margin-bottom: 15px;
    margin-right: 0;
    display: inline-block;
  }
}
</style>
