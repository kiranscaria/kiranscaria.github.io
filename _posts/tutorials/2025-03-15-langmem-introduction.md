---
layout: post
title: "LangMem"
subtitle: "Long Term Memory for Agentic Applications"
date: "2025-03-15 00:00:00"  
author: "Kiran"
background: '/assets/images/post-langmem/post-langmem.jpg'
categories: tutorials
---

# LangMem: Long Term Memory for Agentic Applications

Agentic applications are the latest buzzword everyone’s chasing. But let’s be real,slapping an LLM onto a tool or making it pick from a dropdown menu doesn’t scream "agentic genius." Like every overhyped trend before it,websites, apps, NFTs, you name it,the dust will settle, and only the apps delivering real value will survive. Right now, companies are just bolting "Agentic" or "AI" onto anything to stay trendy. If this keeps up, we’ll have agentic brooms sweeping floors and agentic telescopes stargazing for us. It’s time to cut through the noise and focus on applications that actually matter.

What sets a true agentic application apart? Sure, LLMs and tool integration are table stakes. But the real magic lies in two things: learning from mistakes to get better over time and remembering experiences like a human would. By "getting better," I mean measurable improvement,whether it’s accuracy, speed, or user satisfaction,tailored to the app’s purpose. And by "remembering," I mean cataloging experiences in a way that’s retrievable and useful, not just dumping data into a void. These aren’t flashy gimmicks; they’re the backbone of systems that evolve with us.

So, in this blog,part of a series sifting the music from the AI/LLM/agentic hype machine,we’re diving into a tool called `LangMem` that helps to store, retrieve and manage long-term memory for agents. 

Even before looking into LangMem, let us look more into memory. Long-term Memory is the type of memory that is responsible for lasting retention of information and skills. It is also the final stage of the multi-store memory model proposed by Atkinson-Shiffrin. Long-Term Memory can further be classified into two types: explicit (knowing that) and implicit (knowing how).

![Types of Long-term Memory](/assets/images/post-langmem/long-term-memory.png "Types of Long-term Memory")  

Out of the different types of memory, the ones relevant of agentic applications are:

1. **Episodic** (experienced events): This is the part of the explicit long-term memory responsible for storing information about events (i.e. episodes) that we have experiences in our lives.  
   In the case of agents, episodic memory would mean experiences that help remember how to do tasks.  
2. **Semantic** (knowledge and concepts): This is the part of the explicit long-term memory responsible for storing information about the world. This includes knowledge about the meaning of words, as well as general knowledge.  
   In case of agents, this would mean remembering facts like date of births for a calendar agent, appointments details for a personal assistant agent etc.  
3. **Procedural** (skills and actions): Procedural memory is a part of implicit long-term memory responsible for knowing how to do things, i.e., memory of motor skills.  
   It does not involve conscious thought. For example, procedural memory would involve knowledge of how to ride a bicycle.  
   Rules that an agent has to follow can be categorised into this type. 

Now that we have looked at the relevant details regarding memory, let’s get back to LangMem.

### What LangMem Brings to the Table

LangMem is built to help agents adapt over time by learning from conversations, refining their prompts, and storing knowledge effectively. It provides a vector database that is searchable, shareable, persistent storage that can be immediately updated by the agent or updated in the background by a helper agent. Its key features include:

1. A **Core Memory API** that plugs into any storage system you’re using.  
2. **Memory Management Tools** for agents to record and search info during live conversations (aka "in the hot path").  
3. A **Background Memory Manager** that automatically extracts and organizes knowledge behind the scenes.  
4. Native integration with LangGraph’s Long-Term Memory Store for seamless scalability.

I’ve linked all the example code we’ll walk through [here](https://github.com/kiranscaria/langmem_tutorial), so you can follow along or tweak it yourself.

### How Memory Gets Built

LangMem handles memory in two distinct ways: consciously (in the hot path) and subconsciously (in the background). Let’s break it down.

!["Demonstration of the two paths of Memory Saving: Hot Path vs Background"](/assets/images/post-langmem/hot_path_vs_background.png "Demonstration of the two paths of Memory Saving: Hot Path vs Background")

#### **In the Hot Path**

Here, the agent takes control. LangMem provides two tools: `create_manage_memory_tool` and `create_search_memory_tool`. These let agents manually store notes or retrieve info during a conversation. A `namespace` parameter keeps everything scoped—think of it as a filing cabinet to avoid memory overlap. Want to see it in action? Check out the [example code]([https://github.com/kiranscaria/langmem_tutorial/blob/main/1.hot_path.py](https://github.com/kiranscaria/langmem_tutorial/blob/main/1.hot_path.py)).

#### **In the Background**

This is where LangMem gets clever. Using `create_memory_store_manager`, it extracts and consolidates memories automatically while the agent keeps chatting. Every message gets saved, but there’s a twist: you can delay processing with a `delay` option. Why? To avoid:

1. Redundant work when messages flood in fast.  
2. Half-baked context mid-conversation.  
3. Wasted tokens on unnecessary processing.

The result? Cleaner, smarter memory handling. I’ve got examples of this too [example1]([https://github.com/kiranscaria/langmem_tutorial/blob/main/2.background.py](https://github.com/kiranscaria/langmem_tutorial/blob/main/2.background.py)), [example2]([https://github.com/kiranscaria/langmem_tutorial/blob/main/3.delayed_memory_processing.py](https://github.com/kiranscaria/langmem_tutorial/blob/main/3.delayed_memory_processing.py)).

### Why This Matters

LangMem’s dual approach—active and passive memory building—ties directly into what we said earlier: agentic apps need to learn and remember to be valuable. It’s not just about hoarding data; it’s about making that data actionable over time.

In the next edition of this blog series, we'll put LangMem into practice by building a fully functional agentic application, demonstrating these memory concepts in action.

### Dig Deeper

Want the nitty-gritty? Check out the official docs:

1. [LangMem Documentation: Introduction](https://langchain-ai.github.io/langmem/#creating-an-agent)  
2. [In the hot path](https://langchain-ai.github.io/langmem/hot_path_quickstart/)  
3. [In the background](https://langchain-ai.github.io/langmem/background_quickstart/)  
4. [Delayed Background Memory Processing](https://langchain-ai.github.io/langmem/guides/delayed_processing/)  
5. [Long-Term Memory in Psychology](https://www.simplypsychology.org/long-term-memory.html)  
6. [Long-term Agentic Memory with LangGraph: A Course by DeepLearning.ai](https://learn.deeplearning.ai/courses/long-term-agentic-memory-with-langgraph)
