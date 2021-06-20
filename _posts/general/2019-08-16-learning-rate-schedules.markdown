---
layout: post
title: Learning rate Schedules
subtitle: For faster and better convergence.
date: "2019-08-16 00:00:00"
author: Kiran Scaria
background: '/assets/images/post-learning-rate-schedules-bg.jpg'
categories: general
---

The **learning rate** or *step size* in machine learning is a hyperparameter which determines to what extent newly acquired information overrides old information.<sup>[1]</sup> It is the most important hyper-parameter to tune for training deep neural networks. The learning rate is crucial because it controls both the speed of convergence and the ultimate performance of the network. We select learning rate mostly by trial and error, or by virtue of previous experience or some methods like LR finder. A too high learning rate will make the learning jump over minima but a too low learning rate will either take too long to converge or get stuck in undesirable local minima.

Finding a decent learning rate for a neural network is like fishing. The selection of learning rate is one of those things that makes deep learning look like magic. One of the simplest learning rate strategies is to have a fixed learning rate throughout the training process.<sup>[2]</sup> During earlier iterations, faster learning rates lead to faster convergence while during later epochs, slower learning rate produces better accuracy. Changing the learning rate over time can overcome this tradeoff.

Schedules define how the learning rate changes over time and are typically specified for each epoch or iteration (i.e batch) of training. The main benefits of learning rate schedules are it converges faster with higher accuracy. They differ from adaptive methods (such as AdaDelta and Adam) because :<sup>[2]</sup>
- Schedules change the global learning rate for the optimizer, rather than parameter-wise learning rates.
- Schedules don't take feedback from the training process and are specified beforehand.

![Gradient Descent on a Loss Function](https://live.staticflickr.com/65535/48772984716_692d60ce74_o.jpg "Gradient Descent")

# Types of Schedules

The theory of stochastic approximation gives us many types of schedules. But, these are not the ones that are usually used in contemporary deep learning models and frameworks. The theoretical basis of why these schedules work well is an active area of research.[See. 3] Here, we will be looking closely at schedules that are prominently used ones. Here, we will look at most common of these schedules:

1. **Step-wise Decay**
2. **Polynomial Decay**
3. **Exponential Schedule**
4. **Reduce on Loss Plateau Decay**
5. **Cosine Annealing**
6. **Custom Schedules**


## 1. Step-wise Decay
In step-wise decay, the learning-rate is decayed after a fixed number of steps(intervals) by a fixed factor. This fixed factor is called decay-factor, usually represented by **_$$\gamma$$ (gamma)_**. 
- After every $$k$$ epochs: &nbsp; $$\eta_t = \eta_{t-1}\gamma$$
- Learning rate at $$n^{th}$$ epoch: &nbsp; $$\eta_n = \eta_{n=1}\gamma^{\lceil \frac{n}{k}  \rceil - 1} \;\; \forall \: n\ge1$$

where, $$\eta_{n}$$ is the learning rate $$n^{th}$$ epoch.
       $$\gamma$$ is the decay-rate.
       $$k$$ is the step-size.

**`Tips`**<sup>[5]</sup>
- You would want to decay your LR gradually when you're training more epochs.
    - Converge too fast, to a crappy loss/accuracy, if you decay rapidly
- To decay slower
    - Larger $$\gamma$$
    - Larger interval of decay

## 2. Polynomial Decay
Stepwise schedules and the discontinuities they introduce may sometime lead to instability in the optimization, so in some cases smoother schedules are preferred<sup>[6]</sup>. The learning-rate is decayed after every epoch based on a polynomial function. Polynomial Decay provides a smoother decay using a polynomial function and reaches a learning rate of 0 after **max_update** iterations.<sup>[6]</sup>

The two important quantities in polynomial decay are:-
1. *max_update*: number of iterations to perform before the learning rate is taken to $$0$$.
2. _power_: the degree of the polynomial function

**`Tips`**
- Smaller values of _power_ produce slower decay and large values of learning rate for longer periods.
- For longer training, *last_epoch* can be increased.

## 3. Exponential Decay
Like the polynomial decay given above, exponential decay gives a smoother decay, solving the instability issues in step-wise scheduling. But here, the learning-rate is decayed after every epoch based on an exponential function. 

The important parameters in exponential decay are:
- *last_epoch*: The index of last epoch
- *$$\gamma \; (gamma) \; (0,1]$$*: multiplicative factor of learning rate decay

**`Tips`**
- Larger $$\gamma$$
    - Slower convergence
    - Better loss/accuracy
- Smaller $$\gamma$$
    - Faster convergence
    - Worse loss/accuracy
- For longer training period, *last_epoch* can be increased.

## 4. Reduce on Loss Plateau Decay
All the above decay methods like step-wise, polynomial, exponential reduce the learning-rate according to a pre-defined rule. It may change after a few steps or with every step, but the change is imminent. Consider a situation where a learning-rate value is performing well, then decaying it prematurely may not be a wise idea. Similarly continuing with a stale learning-rate value waiting for the decay step is also not helpful. All these scheduling methods do not take into consideration the position of the loss function at the moment.

So, a better idea may be to decrease the learning-rate only when the loss plateaus. This is exactly what we do in 'Reduce on Loss Plateau Decay'. The decaying action occurs after no improvement in loss value is found. The plateau condition is checked by a fixed value called **_patience_**. Patience determines the number of epochs to wait before changing the learning-rate. For example, if `patience = 2`, then we will ignore the first 2 epochs with no improvement, and will only decrease the LR after the 3rd epoch if the loss still hasn't improved then.<sup>[4]</sup>

The two important quantities in loss plateau decay are:
- _Patience_: number of epochs with no improvements after which learning rate will be reduced.
- _Factor_: multiplier to decrease the learning-rate. &nbsp;
$$new\_lr=lr\times factor$$

**`Tips`**
- For larger number of epochs increase the value of patience
- Loss or accuracy or any other metric can be used for finding plateau

## 5. Cosine Annealing
Cosine Annealing was proposed in `SGDR: Stochastic Gradient Descent with Warm Restarts` by Ilya Loshchilov & Frank Hutter. We will only be talking about the cosine annealing part here, we can leave out the Warm restart for a later time. In cosine annealing, we will be using the cosine function in the range $$[0, \frac{\pi}{2}]$$. This is particularly useful for us as in the early iterations it will give us a relatively large learning rate to quickly approach a local minimum (faster convergence), and towards the end, it gives us many small learning rate iterations (better loss/accuracy).

Important parameters in cosine annealing are:-
- *min_lr*: the minimum learning rate
- *max_lr*: the maximum learning rate
- *cycle_length*: the number of epochs to run between the maximum and minimum learning rates

**`Tips`**
- Longer cycle length usually works better.
- Cosine Annealing with warm restarts produces better results than vanilla cosine annealing.

## 6. Custom Schedules
Along with all these common LR scheduling methods, we can make our own schedules. So, let make a schedule that decays according to the function $$log(\frac{1}{x})$$ . 


```python
class LogAnnealingLR(_LRScheduler):

    def __init__(self, optimizer, T_max, eta_min=0, last_epoch=-1):
        self.T_max = T_max
        self.eta_min = eta_min
        super(LogAnnealingLR, self).__init__(optimizer, last_epoch)

    def get_lr(self):
        return [self.eta_min + (base_lr - self.eta_min) *
                (1 + math.cos(math.pi * self.last_epoch / self.T_max)) / 2
                for base_lr in self.base_lrs]
```


# Understanding Scheduling
A better way to understand the scheduling methods is by dividing them based on these two criteria:
##### 1. Frequency (When does the learning rate get changed?)

By 'frequency', I mean the intervals in which the learning rate changes. From all the schedules we have seen above, the learning rates are changed under different intervals. It could change discretely, like after a fixed interval(Step-wise decay). It could reduce continuously, like Polynomial Decay. Or when the learning-rate plateaus(Reduce on loss plateau decay). If we think in terms of the frequency of decay, the step-wise decay is just a type of exponential or polynomial decay, where the decay happens after a fixed interval(number of steps).

##### 2. Quantity (How much does it get changed?)

By 'quantity', I mean the 'way of value-change' in the learning-rate. It could happen exponentially, like in step-wise decay. It could be based on some function, like cosine-annealing decay. It is not compulsory that the change in learning rate has only to move downwards(decay), we have also seen some cyclic methods which usually out-perform these uni-directional decay schedules. 



## References
1. [Learning rate - Wikipedia](https://en.wikipedia.org/wiki/Learning_rate)
2. [Learning Rate Schedules - mxnet documentation](https://mxnet.incubator.apache.org/versions/master/tutorials/gluon/learning_rate_schedules.html)
3. [Rethinking Learning Rate Schedules for Stochastic Optimization](https://openreview.net/pdf?id=HJePy3RcF7)
4. [LR_Scheduler-PyTorch Documentation](https://pytorch.org/docs/stable/_modules/torch/optim/lr_scheduler.html)
5. [Learning Rate Scheduling - Deep Learning Wizard](https://www.deeplearningwizard.com/deep_learning/boosting_models_pytorch/lr_scheduling/)
6. [Polynomial Schedule - Learning Rate Schedules - mxnet documentation](https://mxnet.incubator.apache.org/versions/master/tutorials/gluon/learning_rate_schedules.html)

## Credits

- Title Photo: Photo by [Simon Fitall](https://unsplash.com/@simonfitall?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
- Gradient Descent [Linear Regression - Octave](https://github.com/trekhleb/machine-learning-octave/tree/master/linear-regression)