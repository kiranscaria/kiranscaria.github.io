# On training LLMs

LLMs elicit the same feelings of wonder, promises, scepticism, and uncertainty as any other new technology. The news that we read about on a daily basis is either sensationalised or comes from elsewhere. They either increase the LLMs' skills or, occasionally, even give off the attraction of a doomsday prophecy. People are now aware of the capabilities of LLMs; ChatGPT, Co-Pilot in coding, and other features are now commonplace in our everyday lives. It is also well known that these are trained over an extended period of time with data from nearly the whole internet, on a multi-million dollar budget, utilising a very large cluster of GPU processors. Therefore, it would be simpler for anyone who needs to use LLMs to use one of the available commercial APIs rather than investing this much money in educating their own LLMs. Using these commercial APIs has some clear benefits, and in certain cases, it may even be the best choice for you. However, I want to assist you in making an informed choice before moving forward with that. Let's get our hands filthy if I've managed to get you on board thus far. I would set it up like this by responding to the following queries:

1. LLMs: What are they?

Artificial intelligence models known as Large Language Models (LLMs), such as GPT (Generative Pre-trained Transformer) and BERT (Bidirectional Encoder Representations from Transformers), have been trained on enormous volumes of textual data. In addition to producing text and comprehending natural language, these models are also capable of summarising, translating, and answering questions. Their ability to comprehend and generate text that is similar to that of a person is a result of deep learning algorithms and the large datasets they are trained on.

2. How exactly are LLMs trained?

There are numerous important processes in training LLMs:

**Data collection**: Gathering information from books, websites, and other text sources to create a broad and varied dataset. The model's learning is based on this dataset.

**Preprocessing**: Data cleansing and preparation. Methods for accomplishing this goal include segmenting the text into more understandable chunks, standardising the data formatting, and eliminating superfluous content.

**Model Selection**: Selecting the neural network's design. Transformer-based models are frequently employed for LLMs because of how well they handle sequential data.

**Training**: Using the prepared dataset to train the model. This involves feeding the data through the model's neural network and adjusting the network's parameters based on the output. The goal is to minimise the difference between the model's predictions and the actual outcomes.

**Fine-tuning**: After the initial training, the model may undergo fine-tuning with a more specific dataset to specialise in particular tasks or improve performance in certain areas


### 3. Can you explain the model training in detail?

The training of an LLM can be categorised into two phases:

**Initial Training Phase**

The initial training phase of an LLM is a monumental task, where the model learns to understand and generate human-like text by processing an extraordinarily large dataset. For instance, models like LLaMA 2 are trained on datasets comprising up to 2 trillion tokens, encompassing a broad swath of human knowledge and language use. This stage aims to create a versatile sequence generator capable of predicting the next word in a sentence with a high degree of accuracy. The model learns the structure of language, grammar, facts about the world, and even style and tone from this extensive training.

This phase is resource-intensive, requiring significant computational power, often involving hundreds or even thousands of GPUs or TPUs running for weeks or months. The outcome is a pre-trained model with a generalised understanding of language, capable of various text generation tasks. However, while powerful, this model is not yet specialised for specific tasks or optimised for high-precision answers in niche domains.

**Fine-tuning Phase**

The fine-tuning phase is where the pre-trained LLM transforms into a tool tailored for specific applications, such as an answering machine, chatbot, or a specialised content creator. During fine-tuning, the model is trained again, but this time on a much smaller, highly curated dataset relevant to the desired task or domain. This dataset's quality is crucial because it directs the model's learning towards producing accurate, relevant, and contextually appropriate responses.

Fine-tuning requires far less computational resources than the initial training phase, as the model's foundational language understanding is already established. The focus here is on adjusting the model's parameters to refine its outputs based on the nuances of the new dataset. This process imbues the model with the ability to perform specialised tasks beyond mere sequence generation—such as engaging in nuanced dialogue, providing expert-level answers in specific fields, or understanding and generating content with a particular stylistic tone.

The fine-tuning stage is where customization and adaptability come into play, allowing users to mould the general capabilities of the LLM to fit specific needs or challenges. This phase is also more accessible to a broader range of users, including researchers, businesses, and developers, who might not have the resources for the initial training phase but can still leverage the power of LLMs for their specific applications.

### 4.Does that mean that training an LLM is indeed difficult?

It is true that training LLMs presents resource and technical challenges. It needs:

**Expertise**: Understanding of natural language processing, neural networks, and machine learning.

**Computational Resources**: The ability to handle big datasets and carry out intricate computations using strong hardware, typically GPUs or TPUs.

**Data**: An extensive and varied dataset that can be costly and time-consuming to put together.

**Time**: Depending on the size of the model and the resources available, training may take weeks or even months.

### 5. How can I train an LLM?

The initial training phase of LLMs is exceedingly resource-intensive, requiring substantial time and computational power. Hence, it is not undertaken frequently. Even major organisations like Google and OpenAI typically engage in this comprehensive training process only once every year or two. The term "training" in this context primarily refers to the second phase, known as the fine-tuning phase, which is critical for optimising the model's performance on specific tasks or datasets.

Language models (LLMs) undergo several sophisticated processes designed to enhance their effectiveness and performance. Techniques like Low-Rank Adaptation (LoRA) and Quantized LoRA (QLoRA) enable the fine-tuning of pre-trained models with reduced computational overhead by adjusting the model's parameters within a lower-dimensional space. To further refine model outputs, Reinforcement Learning from Human Feedback (RLHF) strategies, such as Direct Preference Optimisation (DPO) and Proximal Policy Optimization (PPO), are employed. These methods assess and improve the quality of the model's responses, ensuring they are more accurate and contextually appropriate.

### 6. Could you elaborate on the fine-training procedure?

**LoRA, or Low-Rank Adaptation**, is a method that uses trainable low-rank matrices to modify previously trained models. This method greatly lowers computing costs by enabling the effective fine-tuning of big models on particular tasks without the need to retrain the entire model.

**Quantized LoRA, or QLoRA**, is an extension of LoRA that further minimises the computational and memory footprint by quantizing the low-rank matrices. This increases its effectiveness and accessibility even further for LLM deployment and training with constrained resources.

**Reinforcement Learning from Human Feedback (RLHF)**: Reinforcement learning from human feedback (RLHF) is a subset in which the model is directed toward desirable behaviours and responses by modifying its output in response to human feedback.

Proximal Policy Optimization (PPO) and Direct Policy Optimization (DPO) techniques, for example, train models to make decisions based on complicated inputs. By streamlining their decision-making procedures, these techniques can help LLMs provide outputs that are more accurate, pertinent, and suitable for their surroundings.

### 7.Comparing Fine-tuning and Pre-trained Models

A pre-trained model's weights are adjusted during fine-tuning using a fresh, usually smaller, dataset. Compared to starting from scratch during training, this method significantly reduces the computational cost of the model's adaptation to the subtleties of a given task or domain.

On certain tasks, fine-tuning can significantly increase performance. As an example of how versatile these models may be, OpenAI's GPT-3 demonstrated impressive versatility across a wide range of jobs with only minor tweaks in its fine-tuning process.

#### 7.a) Suggestions for Fine-tuning:

**Data Quality Over Quantity**: The quality of your dataset is very important while fine-tuning. A smaller, less relevant dataset may not produce the same results as a well-curated dataset customised for your particular activity.

**Try Different Learning Rates**: The secret to successful fine-tuning is determining the ideal learning rate. If you set it too high, you risk overwriting the useful previously learned patterns; if you set it too low, the model might not sufficiently adjust to your task.

**Keep an eye out for overfitting**: Overfitting is a possibility because fine-tuning datasets are smaller in size. To make sure your model keeps its generalizability, test it frequently on a validation set.

#### 7.b) Using APIs to Access Pre-trained Models:

Pre-trained models offer a plug-and-play solution that doesn't require user training or fine-tuning, and can be accessed via APIs like GPT-3 or other commercial services. There are many advantages to using an LLM as an API.

**Minimal Customization Requirements**: APIs provide a simple and resource-efficient option if your task is well-suited to the capabilities of the current models.

**Quick prototyping**: Without the expense of training, APIs enable rapid iterations of development and experimentation.

**Limited Resources**: APIs give people or organisations access to state-of-the-art models in case they lack the computing capacity to train or fine-tune models.

### 8. Overview of Retrieval-Augmented Generation (RAG)

RAG mixes the specificity and detail offered by external information sources with the strength of big language models. Before producing a response, it gathers pertinent information about the inquiry, which enables it to create outputs that are more precise and in-depth on particular subjects.

RAG has the ability to dynamically extract information from large databases or the internet, thereby maintaining the model's responses current without requiring frequent retraining.

##### 8.a)When to Apply RAG:

**High Informational Accuracy Required**: By utilising outside knowledge sources, RAG can outperform regular LLMs for tasks that call for precise, in-depth information (such as fact-based Q&A).

**Dynamic Content**: RAG makes sure the model obtains the most recent data when the task comprises content that changes often or covers a broad range of topics.

### 9.When to use RAG, fine-tuning, commercial APIs?

#### 9.a) When to Use APIs:

- It is necessary to deploy quickly without sacrificing computational overhead.
- The task is in good alignment with the broad capabilities of models now in use.
- There are very few privacy and customization issues.

#### 9.b) When to Use Fine Tuning:

- To achieve better results on specialised activities or domains, you need to customise the model.
- You are able to utilise a certain, superior dataset.
- Your goal is to set your application apart from the competition with special features not found in APIs.

#### 9.c) When to Use RAG:

- High factual accuracy and access to current or extensive information are requirements for the tasks.
- You are working with queries that gain from retrieving external data for every answer.
- It is necessary to include quickly changing or dynamic data without having to constantly retrain the model.

As we come to the end of our investigation into the field of training, optimising, and using large language models (LLMs), it is evident that artificial intelligence is a broad and complex field. The choice between using commercial APIs, going through a fine-tuning process, or utilising cutting-edge methods like Retrieval-Augmented Generation (RAG) depends on a number of factors, such as available resources, particular requirements, and the desire for innovation.

By creating a link between the overall capabilities of trained models and the specific needs of specialised jobs, fine-tuning offers a customised solution that can dramatically improve performance while requiring relatively little in the way of resources. It represents the democratisation of AI, when entities imprint their unique wants and insights into the technology, contributing to its progress in addition to consuming it.

The use of APIs stands as a testament to the accessibility and immediacy of cutting-edge AI technologies. Rapid deployment and scalability are made possible by it, allowing a variety of applications to take advantage of AI breakthroughs without having to pay exorbitant fees for model training from scratch. This accessibility democratises the benefits of AI by encouraging innovation and the integration of AI across all sectors.

The cutting edge of AI is represented by Retrieval-Augmented Generation (RAG), which combines the accuracy of focused information retrieval with the generating power of LLMs. This method embodies the direction that the AI field is going—that is, toward models that can comprehend and produce writing that is similar to that of a person, but can do so with ever-increasing accuracy and relevance by referencing the immense body of human knowledge.

The alignment of technology with goal should serve as the guiding factor for deciding whether to use RAG, fine-tune, or leverage APIs. Each pathway offers unique benefits appropriate for varying demands and challenges, whether it's the depth and dynamism of RAG, the precise precision of fine-tuning, or the quick deployment and wide application of APIs.

Given the potential of artificial intelligence, we must approach these potent instruments with a responsible innovation attitude. We may fully utilise LLMs to not only improve our capabilities but also to do so in a way that is morally just, environmentally sound, and beneficial to society by carefully weighing our goals and the effects of the technologies we use.

The process of comprehending and utilising LLMs is representative of the larger journey of technology, which is characterised by ongoing learning, adaptability, and the quest for harmony between human goals and the instruments we develop to accomplish them. The importance of making well-informed decisions cannot be emphasised on this path. We can make sure that the future of artificial intelligence (AI) is as bright and advantageous as the combined creativity and diligence of its developers and users by making decisions that are informed by both the capabilities and the responsibilities of these technologies.
