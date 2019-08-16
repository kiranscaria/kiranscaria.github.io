---
layout: post
title: Learning rate Schedules
subtitle: For faster and better convergence.
date: "2019-08-16 00:00:00"
author: Kiran Scaria
background: ''
categories: general
---

Learning rate is the most important hyper-parameter while training a neural network. the learning rate is crucial because it controls both the speed of convergence and the ultimate performance of the network. We select learning rate mostly by trial and error, or by virtue of previous experience or some methods like LR finder.

Finding good learning rate for a neural network is sometimes like fishing. It is observed that, during earlier iterations faster learning rates lead to faster convergence while slower learning rate produces better accuracy.

For solving this problem, we need learning rate schedules. The main benefits of learning rate schedules are it converges faster with higher accuracy.

Schedules define how the learning rate chnages over time and are typically specified for each epoch or iteration (i.e batch of training). Schedules differ from adaptive methods (such as AdaDelta and Adam) because they:
- change the global learning rate for the optimizer, rather than parameter-wise learning rates.
- don't take feedback from the training process and are specified beforehand.