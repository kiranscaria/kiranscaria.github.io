---
layout: post
comments: true
title: Orma - Blueprint for a Unified Hybrid Memory Core for Intelligent Applications
subtitle: A Comprehensive Blueprint for Next-Generation AI Memory Systems
date: "2025-07-29 00:00:00"
author: Kiran Scaria
background: "/assets/images/project-bg.jpg"
categories: projects
---

## **Orma: The Unified Hybrid Memory Core for Intelligent Applications**

**Version 0.1**

### **1\. The Vision: Beyond Conversation History**

Traditional AI memory is fleeting. Chatbots can remember the last few turns of a conversation but lack a deep, persistent understanding of their context. They don't know the company's products, understand its internal policies, or recognize the complex relationships between users, orders, and tickets. This results in repetitive, inefficient, and unintelligent user experiences.

**Orma** (from the Malayalam word **ഓർമ്മ**, meaning "memory" or "recollection") is engineered to solve this fundamental problem. It is not merely a memory module; it is a **pluggable, "live" knowledge core** designed to serve as the comprehensive brain for any application, from customer support chatbots to complex internal agents.

Orma's core principle is a clear **separation of concerns**:

- **Orma provides Knowledge:** It ingests, synthesizes, and provides deep context from conversations, databases, documents, and knowledge graphs through a simple, powerful query interface.
- **The Developer provides Action:** The developer retains full control over their business logic, security, and external API calls (Tools), using Orma to empower their actions with unparalleled context.

### **2\. The Multi-Layered Hybrid Architecture**

Orma employs a hybrid, multi-layered data architecture where each component is optimized for a specific function: speed, persistence, or contextual reasoning.

| Component               | Role                                | Analogy                    | Purpose & Data Stored                                                                                                                                                                                                                                                                                |
| ----------------------- | ----------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Redis**               | **The Reflex System**               | The Spinal Cord            | **Handles high-speed, volatile data.** Stores active session IDs, a "hot" buffer of recent messages for instant recall, and serves as a high-speed message broker (Pub/Sub) to trigger asynchronous background tasks.                                                                                |
| **Supabase (Postgres)** | **The Chronicle & Semantic Memory** | The Journal                | **Provides immutable, persistent storage.** It is the ground truth, storing the full transcript of every conversation. With the `pgvector` extension, it also stores vector embeddings for every message and ingested document, creating a searchable "semantic memory" of what was said or written. |
| **Neo4j**               | **The Cortex**                      | The Brain's Neural Network | **Models deep context and relationships.** Stores a structured knowledge graph of extracted entities (e.g., users, products, companies) and the relationships between them (e.g., `PURCHASED`, `WORKS_FOR`, `MENTIONED_IN`). This enables complex, multi-hop reasoning.                              |

### **3\. The Active Learning Framework: How Orma Gets Smarter**

Orma is not a static repository; it is a dynamic system designed to learn and improve over time. The Active Learning Framework operates continuously in the background to refine what Orma knows and how it retrieves that knowledge.

#### **3.1 Intelligent Salience Detection (What to Store)**

Not every piece of information in a conversation is a "fact" worth remembering. Orma uses a background LLM process to analyze conversational turns and assign a **salience score**.

- **High Salience:** A user explicitly stating a preference ("My new shipping address is..."), a problem ("The screen is cracked"), or a relationship ("Sarah is my manager"). These are prioritized for extraction into the Neo4j knowledge graph.
- **Low Salience:** Pleasantries ("How are you today?"), acknowledgements ("Okay, got it"), or filler phrases. These are logged in the Postgres transcript but are not promoted to the structured knowledge graph, preventing clutter.

#### **3.2 Retrieval Feedback Loop (When and How to Retrieve)**

Orma learns from the success and failure of its own context retrieval to improve future performance.

- **Implicit Signals:** If a user has to rephrase a question multiple times, it's a strong signal that the initial context retrieved by Orma was insufficient. Orma logs these events to fine-tune its retrieval algorithms.
- **Explicit Signals:** When an agent successfully uses a tool after being provided context from Orma, it reinforces the connection between the user's intent and the retrieved data. This feedback is used to strengthen the weights on specific knowledge graph paths.
- **Tool Usage Analysis:** By analyzing which pieces of retrieved context (e.g., specific entities from Neo4j, document chunks from Supabase) are most frequently used in successful tool calls, Orma learns to prioritize that type of information for similar future queries.

#### **3.3 Automated Knowledge Curation**

The knowledge graph is actively managed to ensure it remains accurate and efficient.

- **Consolidation:** Orma identifies and merges redundant or related facts. For example, `(User)-[:HAS_PRODUCT]->(Aura Pro)` and `(User)-[:OWNS]->(Aura Pro Headphones)` can be consolidated into a single, canonical relationship.
- **Inference:** The system can proactively infer new relationships. If the graph knows `(Alex)-[:MANAGES]->(Bob)`and `(Bob)-[:MANAGES]->(Carol)`, it can create a new, inferred relationship `(Alex)-[:HAS_INDIRECT_REPORT]->(Carol)`.
- **Decay & Archiving:** Information can become stale. A shipping address from five years ago is less likely to be relevant than one from last week. Orma can assign a decay score to facts based on time and usage, deprioritizing them in queries without deleting them from the permanent record.

### **4\. The Knowledge Ingestion Framework**

For Orma to be a true knowledge core, it must be able to learn from the business's entire data ecosystem. The Ingestion Framework makes this possible through two primary pipelines.

#### **4.1 Connector-Based Ingestion (For Structured Data)**

This pipeline syncs with external data sources that have a clear schema, like product catalogs or existing databases.

1. **Connect:** The client uses the Orma dashboard to securely connect to their existing systems (e.g., Shopify, Salesforce, PostgreSQL) via pre-built connectors.
2. **Map:** A simple UI allows the client to map their data fields to Orma's canonical data model (e.g., `product_title` \-\> `ProductName`).
3. **Ingest & Graph-ify:** Orma performs an initial bulk read, populating **Neo4j** with the structured entities and relationships, and **Supabase/pgvector** with text-heavy fields for semantic search.
4. **Synchronize:** Data is kept live and fresh via real-time webhooks, Change Data Capture (CDC), or periodic polling.

#### **4.2 Document Processing Pipeline (For Unstructured Data)**

This pipeline ingests knowledge from sources like PDFs, documents, or websites.

1. **Upload / Connect:** Clients can directly upload files or connect to sources like Google Drive or Confluence.
2. **Extract & Chunk:** The pipeline extracts raw text and intelligently breaks it into smaller, semantically complete chunks.
3. **Embed & Store:** Each chunk is converted into a vector embedding and stored in **Supabase/pgvector**, with metadata linking it back to the source document.
4. **Extract & Link (Advanced):** A background LLM process can extract key entities from each chunk and link them to the main **Neo4j** knowledge graph, creating a rich, interconnected web of structured and unstructured knowledge.

### **5\. The Developer Experience: The Orma SDK**

The entire complexity of the Orma architecture is abstracted away behind a clean, simple Software Development Kit (SDK). A developer only needs to interact with two components.

#### **5.1 `OrmaMemory` (For Conversational Context)**

A LangChain-compatible memory class that automatically manages the saving and loading of conversational turns. It handles the short-term hot buffer (Redis) and the long-term transcript (Supabase) seamlessly.

```python
# Developer's Code
from my_memory_sdk import OrmaMemory

# Initialize with a session ID
memory = OrmaMemory(session_id="user_alex_123", api_key="pk_...")

# Plug it directly into a LangChain agent or chain
# Orma handles the rest automatically.
agent_executor = AgentExecutor(..., memory=memory)
```

#### **5.2 `OrmaKnowledgeClient` (For Empowering Tools)**

A simple client for querying the entire unified knowledge base. This is the core of making the developer's tools intelligent.

```python
# Developer's Code
from my_memory_sdk import OrmaKnowledgeClient

knowledge_client = OrmaKnowledgeClient(api_key="pk_...")

# Query the knowledge core from within a custom tool
context = knowledge_client.query(
 session_id="user_alex_123",
 query_text="the headphones I bought last week",
 query_mode="hybrid" # Use full Redis + Postgres + Neo4j power
)

# context is a rich JSON object with entities, summaries, and related docs.
```

The `.query()` method returns a structured JSON object, providing the developer's tool with a synthesized understanding of the user's request, ready for action.

```json
// Sample response from knowledge_client.query()
{
  "summary": "The user is asking about order #AX45-B7, which contains 'Aura Pro' headphones.",
  "entities": [
    { "type": "OrderID", "value": "AX45-B7", "source": "Neo4j" },
    { "type": "Product", "value": "Aura Pro", "source": "Neo4j" }
  ],
  "related_documents": [
    {
      "source": "return_policy.pdf",
      "chunk": "Items can be returned within 30 days of purchase..."
    }
  ]
}
```

### **6\. Workflow in Action: A Complete Example**

1. **User Input:** "Hi, I need to check the status of my last order."
2. **Agent Logic:** A LangChain agent receives the input and determines that the `get_order_status` tool (written by the developer) is required.
3. **Developer's Tool Executes:** The `get_order_status` tool is invoked.
4. **Tool Queries Orma:** The tool's first step is to call `knowledge_client.query(query_text="my last order")`.
5. **Orma Responds with Knowledge:** Orma's backend performs its multi-layered fetch. It uses the `session_id` to find Alex's most recent order in the Neo4j graph and returns the structured JSON: `{"entities": [{"type": "OrderID", "value": "AX45-B7"}]}`.
6. **Tool Executes Business Logic:** The tool extracts the `OrderID` and makes a secure call to the **company's private shipping API** with that ID. Orma is not involved in this call.
7. **Tool Returns Result:** The internal API returns "Shipped". The tool passes this string back to the agent.
8. **Agent Responds to User:** The agent forms a natural language response: "I've checked on your most recent order, #AX45-B7. It has been shipped and is on its way!"
9. **OrmaMemory Saves Turn:** In the background, the `OrmaMemory` object saves the entire interaction to the persistent logs in Supabase, and the Active Learning Framework analyzes the turn for salience and feedback.

This workflow is fast, secure, and incredibly intelligent, leveraging the best of both worlds: Orma's deep, self-improving knowledge and the developer's specific business logic.

---

_This blueprint represents the current state of the Orma project. For the latest updates and implementation details, please refer to the official documentation and repositories._
