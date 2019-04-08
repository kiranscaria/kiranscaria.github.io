---
layout: post
title: "Getting Started with Version Control, Git and Gitlab – Part I"
subtitle: "A door to the world of version controlling."
date: "2018-07-17 00:00:00"  
author: "Kiran"
background: '/assets/images/post-version-control-1-edited.jpeg'
categories: tutorials
---


# Getting Started with Version Control, Git and Gitlab – Part I

In this three-part series, we will be talking about `version control` a one of the most popular version control systems available `git`, and an open-source web-based Git-repository manager called `Gitlab`. In each part, we will look into one of these topics. Here, we will talk about Version Control. 

*Version Control is one of the must-have tools for every software developer and data scientist.* Its importance is increasing day by day. So without further ado, let’s get started with version control.

![Image of a man looking at his laptop, very frustrated](https://images.pexels.com/photos/52608/pexels-photo-52608.jpeg?auto=compress&cs=tinysrgb&w=700 "Maintaining multiple versions of the same file and waiting for someone to finish their work is very frustrating.")

## Version Control
When multiple people work on the same code, it is difficult to keep track of the changes that each person makes. A global controlling mechanism is necessary to ensure the integrity of the application. Reverting any of the changes made is only possible if we maintain a backup of the code before each change, which is both inefficient and cumbersome.  A Version Control Software (VCS) is the solution to all these and many other problems. The source code is the most important part of a program. VCS protects source code from catastrophe, human error, and unintended consequences. It helps to manage multiple people working on the same project over time. And keeps track of all the changes made to the source code and like a time machine helps us to go back in time and correct the mistake, which makes collaboration on the same project easier.

The main advantages of a version control system are:

1. `Collaboration`
2. `History`
3. `Feature Branching`

### Collaboration
![Image of ants walking on a branch](https://images.pexels.com/photos/842401/pexels-photo-842401.jpeg?auto=compress&cs=tinysrgb&w=715 "Ants are the biggest examples of accomplishing a big task by collaborating.")             
A Version Control System allows multiple people to work on the same project without the fear of one person replacing other’s work.  Every person works on the most recent version of the file that works. Only if no ‘collisions’ or problems are found, then each of the changes made to the file is ‘merged’. This allows people to work concurrently. No one has to wait for the other person to finish his work. It eliminates the tension of accidentally breaking the application or someone else’s code. Version control helps teams solve these kinds of problems, tracking every individual change by each contributor and helping prevent concurrent work from conflicting.

### History
![Image of a man stuck in a washing machine](https://images.pexels.com/photos/2371/person-looking-searching-clean.jpg?auto=compress&cs=tinysrgb&dpr=2&w=350 "History allows reverting back errors made in the code safely.")
Every change made to the file is stored and backed up. This means every change made to a particular file over the years is available at our disposal. So each and every change made can be analyzed and evaluated at a later stage. If any bug is found to be introduced due to a previous revision, it can easily be rolled back. This eliminates the need for storing multiple backups of the source file. We have a time machine at our disposal which we can use to revert back to any point of history in the project. I have seen people (me too) use filenames like _1, _2, _final, _test, etc, to differentiate versions of the same file. Version Control System thus also saves disk space. No more worries about accidental catastrophes, version control is there for your help.

### Feature Branching

Version Control allows us to work simultaneously on multiple features of the same project at the same time. If any one of the features is completed it can be ‘merged’ into the project without waiting for the other features to be completed.

![Image of people joining hands](https://images.pexels.com/photos/1068523/pexels-photo-1068523.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=350 "Multiple features can be worked on at the same time.")

Suppose that you are working on a website in which you need to implement two features: video playback and comment management. You start working on both of them simultaneously. The ‘video playback’ module is completed but the ‘comment management’ module is only partially completed. Without version control, we will have to wait for the other module to be completed because the project with the partial second module would be buggy and might even not run. But with version control, you can ‘push’ or release the feature that is completed without waiting for the other. So, version control makes our life easier by allowing us to work on multiple parts of the project at the same time without one affecting the other.

A VCS is also called Source Code Management (SCM) tool or Revision Control System (RCS). There are many popular systems available today like git, CVS, Subversion, Mercurial, AWS CodeCommit, Darcs, ArX, etc. In the next post, we will be looking into detail about git the most popular version control system. There are many VCS available but we will be focussing on git.


You can know more about version control at:
- [What is Version Control?](https://www.atlassian.com/git/tutorials/what-is-version-control)   
- [Why use Version Control?](https://www.git-tower.com/learn/git/ebook/en/command-line/basics/why-use-version-control)   
