---
layout: post
title: "Transfer Learning - Dogs vs Cats Classifier"
subtitle: "Small CNN to classify dogs and cats."
date: "2017-10-05 11:11:11"  
author: "Kiran"
background: '/assets/images/post-transfer-learning-cats-dogs-edited.jpg'
categories: tutorials
---

## Transfer Learning - Dogs vs Cats Classifier

> We can judge the heart of a man by his treatment of animals.   
>                                            __Immanuel Kant__

Who doesn't like cats and dogs? Lets us combine the love for these animals and deep learning by making a deep learning network to classify cats and dogs. Today, we will be going to train a Dogs vs Cats Classifier in PyTorch using Transfer Learning. This post will be a point to start for anyone trying to get into Deep Learning. If you are new to the field of Deep Learning be sure to check out my introductory articles on `Deep Learning`. The classifier doesn't use many sophisticated methods with all their bells and whistles but instead, we use transfer learning for an easy understanding of the model used.

### What is Deep Learning?

The main ambition of neural networks is to mimic the performance of the human brain, but the human brain is in itself a very complex organ about which we still are much unaware of. The complexity of the brain is so much that the human brain can be easily said to be the most complex system that we had to evaluate. Its complexity can be demonstrated by the [`fact`](https://www.psychologytoday.com/blog/iage/201402/complexity-our-brain) that we have 125 trillion synapses in our cerebral cortex alone, which is approximately 1000 times the number of stars in our galaxy. The human brain is a highly efficient parallel processing machine. Its ability to function well different problems that vary in slight nuances is what makes the brain generalise well provides it with the ability to solve similar problems. This ability of the brain to use the knowledge gained in solving a problem to solve another similar problem prevents it from learning every task from the ground-up. When we try to imitate the human brain, this is one of the qualities of the brain that we must port to the computers. Transfer learning or inductive transfer offers us some way to implement this.

![Image showing a man giving his brain to another man](https://s3-ap-south-1.amazonaws.com/av-blog-media/wp-content/uploads/2017/05/31130754/transfer-learning.jpeg "Transfer Learning")

According to [`Wikipedia`](https://en.wikipedia.org/wiki/Transfer_learning), Transfer learning or inductive transfer is a research problem in machine learning that focuses on storing knowledge gained while solving one problem and applying it to a different but related problem. This technique allows us to use the knowledge that we have learned from solving a problem in the past to solve a similar kind of problem in future.

##### Advantages of using Transfer Learning

- Computationally efficient to train a model using transfer learning, than to train a whole new set of weights from scratch.
- Data sets of large size are required for the deep learning model to generalise well. But, for all problems, we might not have access to large datasets. So, weights obtained by training the model in similar data can be reused and trained upon.

Transfer Learning is an interesting topic on its own and much resources can be found online. But [**CS231n's notes on transfer learning**](http://cs231n.github.io/transfer-learning/) is quite precise and well-written.
Here we will be focusing more on how to train a basic network transfer learning. We will be using the [**PyTorch**](http://pytorch.org/) framework. We will be taking more of this framework in future posts. So, let's get started.


### PyTorch Implementation:

To perform transfer learning, we are using a well-known convolutional neural network [**ResNet-18**](https://arxiv.org/abs/1512.03385). This is a 18-layer recurrent neural network that would have taken much time if trained on a normal system. Here, the model has been trained using the 1000 classes of [**ImageNet**](http://www.image-net.org/) dataset. So, it is expected to work well for our dogs vs cats classifier since types of dogs and cats are included in the imagenet dataset.

```python
import torch
import torch.nn as nn
import torch.optim as optim
from torch.optim import lr_scheduler
from torch.autograd import Variable
import numpy as np
import torchvision
from torchvision import datasets, models, transforms
import matplotlib.pyplot as plt
import time
import os
```

We are using the data set provided by Kaggle in [Dogs vs Cats](https://www.kaggle.com/c/dogs-vs-cats/data). The data set contains  25,000 images of dogs and cats for training. This data is extracted into data folder containing two folders _train_ and _test_. The train folder is again divided into two folders cats and dogs.

```python
# Data augmentation and Normalization for training
# Just Normalization for Validation
data_transforms = {
# Composes several transforms together
'train': transforms.Compose([ 
# Crop the given PIL.Image to random size and aspect ratio
transforms.RandomSizedCrop(224), 
# Horizontally flips the given PIL-Image with a probability of 0.5
transforms.RandomHorizontalFlip(), 
# Convert a PIL.Image or numpy.ndarray to tensor
transforms.ToTensor(), 
transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
# Normalize an tensor image with mean and standard deviation
]),

'val': transforms.Compose([
# Rescale the input PIL.image into desired size
transforms.Scale(256), 
# Crops the PIL.Image at the center
transforms.CenterCrop(224), 
transforms.ToTensor(),
transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])
}

data_dir = 'data/dogscats'

image_datasets = {x: datasets.ImageFolder(os.path.join(data_dir, x),
    data_transforms[x]) for x in ['train', 'val']}
data_loaders = {x: torch.utils.data.DataLoader(image_datasets[x], 
batch_size=4, shuffle=True, num_workers=4) for x in ['train', 'val']}

dataset_sizes = {x: len(image_datasets[x]) for x in ['train', 'val']}
class_names = image_datasets['train'].classes
```

If gpu is available we will use it to accelerate our training process.

```python
use_gpu = torch.cuda.is_available()
```

Now lets define our function for model training.

```python
def train_model(model, criterion, optimizer, scheduler, num_epochs=25):
since = time.time()

best_model_wts = model.state_dict()
best_acc = 0.0

for epoch in range(num_epochs):
print('Epoch {}/{}'.format(epoch, num_epochs-1))
print('-' * 10)

# Each epoch has a training and validation phase
for phase in ['train', 'val']:
if phase == 'Train':
scheduler.step()
model.train(True) # Set model to training mode
else:
model.train(False) # Set model to evaluation mode

running_loss = 0.0
running_corrects = 0

# Iterate over data
for data in data_loaders[phase]:
# get the inputs
inputs, labels = data

# wrap them in Variable
if use_gpu:
inputs = Variable(inputs.cuda())
labels = Variable(labels.cuda())
else:
inputs = Variable(inputs)
labels = Variable(labels)

# zero the parameter gradients
optimizer.zero_grad()

# forward
outputs = model(inputs)
_, preds = torch.max(outputs.data, 1)
loss = criterion(outputs, labels)

# backward + optimize if only in training phase
if phase == 'train':
loss.backward()
optimizer.step()

# statistics
running_loss += loss.data[0]
running_corrects += torch.sum(preds == labels.data)

epoch_loss = running_loss / dataset_sizes[phase]
epoch_acc = running_corrects / dataset_sizes[phase]

print('{} Loss: {:.4f} Acc: {:.4f}'.format(phase, epoch_loss, epoch_acc))

# deep copy the model
if phase == 'val' and epoch_acc > best_acc:
best_acc = epoch_acc
best_model_wts = model.state_dict()

print()

time_elapsed = time.time() - since
print('Training completed in {:.0f}m {:.0f}s'.format(time_elapsed // 60, time_elapsed % 60))
print('Best Validation accuracy {:.4f}'.format(best_acc))

# load the best model weights
model.load_state_dict(best_model_wts)
return model
```

Now, lets us tune the parameters.

```python 
model_ft = models.resnet18(pretrained=True)
num_ftrs = model_ft.fc.in_features
model_ft.fc = nn.Linear(num_ftrs, 2)

if use_gpu:
model_ft = model_ft.cuda()

criterion = nn.CrossEntropyLoss()

# Observe that all the parameters have been optimized
optimizer_ft = optim.SGD(model_ft.parameters(), lr=0.001, momentum=0.9)

# Decay learning rate by a factor of 0.1 every 7 epochs
exp_lr_scheduler = lr_scheduler.StepLR(optimizer_ft, step_size=7, gamma=0.1)
```

Now, everything is set. Lets us run the program to train the model.

```python
model_conv = train_model(model_conv, criterion, optimizer_conv, exp_lr_scheduler, num_epochs=25)
```


### Output:
Here is the output that we got for some of the early epochs. Even the initial results are quite promising.

```
    Epoch 0/199
----------
train Loss: 0.0226 Acc: 0.9602
val Loss: 0.0110 Acc: 0.9830

Epoch 1/199
----------
train Loss: 0.0232 Acc: 0.9609
val Loss: 0.0100 Acc: 0.9845

Epoch 2/199
----------
train Loss: 0.0223 Acc: 0.9628
val Loss: 0.0100 Acc: 0.9875

Epoch 3/199
----------
train Loss: 0.0215 Acc: 0.9626
val Loss: 0.0115 Acc: 0.9835

Epoch 4/199
----------
train Loss: 0.0214 Acc: 0.9621
val Loss: 0.0113 Acc: 0.9835

Epoch 5/199
----------
train Loss: 0.0214 Acc: 0.9639
val Loss: 0.0135 Acc: 0.9825
```

These are the results that we obtained on testing with some of the random images of cats and dogs.

![Image of output of the model](https://live.staticflickr.com/7892/32619869567_2766347f3a_o_d.png "Output of the model")

An interesting tutorial for the classification of Bees and Ants can be found at the [*official tutorial*](http://pytorch.org/tutorials/beginner/transfer_learning_tutorial.html).