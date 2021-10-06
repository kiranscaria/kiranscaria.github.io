---
layout: post
comment: true
title: "Collision Detection System using Deep Learning"
subtitle: "Making the roads a safer place."
date: "2018-07-17 00:00:00"  
author: "Kiran"
background: '/assets/images/post-collision-avoidance-system-edited.jpg'
categories: projects
---

Today we will be talking about an Object Detection System using Deep Learning that can be used to detect vehicular collisions.

Transportation is a non-separable part of any society. It exhibits a very close relation to the style of life, the range, and location of activities and the goods and services which will be available for consumption. Advances in transportation have made possible changes in the way of living and the way in which societies are organised and therefore have a great influence on the development of civilisations. In many countries, it is also a source of national integration.

### The epidemic of Accidents:

The number of road accidents has drastically increased in the previous decade. Accidents cause a tragic loss of precious human life and are also a financial burden. Multiple studies regarding traffic accidents emphasise the importance of safer automobiles. Nearly 1.3 million people die in road crashes each year, on average 3,287 deaths a day. An additional 20-50 million are injured or disabled. Road crashes cost USD $518 billion globally, costing individual countries from 1-2% of their annual GDP. Drunken driving is one of the leading causes of road fatalities.

### What is a Collision Detection System?

A collision avoidance system is an automobile safety system designed to reduce the severity of a collision. It is also known as a pre-crash system, forward collision warning system, or collision mitigating system. It generally uses radar (all-weather) and sometimes laser (LIDAR) and camera (employing image recognition) to detect an imminent crash. GPS sensors can detect fixed dangers such as approaching stop signs through a location database. The proposed solution uses Deep Learning to detect collisions from the images captured by a camera attached to the automobile. As the driving conditions of different locations in the world are drastically different, it is difficult to make a generalised model that would work for all kinds of conditions. So to mitigate that problem the model will be trained using images from around the world, shot under different climatic conditions.

### How does Collision Detection System work?

The vehicle detector function computes bounding boxes around each clearly visible vehicle in front. The detector will be looking for vehicle(s) in front of the camera which is also driving in the same direction. The purpose of this project is to improve the Vehicle Collision Warning feature, which requires a very accurate bounding box around the rear side of the vehicle(s) ahead. In the model, the vehicles of each category will be detected and bounding boxes will be made to designate the identified objects. Even though phenomenal work is in progress all over the world in the field of object detection using deep learning, in this project Our deep learning model envisions to be significantly lighter and at the same time produces similar accuracy to popular models like Alex-Net.

### Current Progress:
<a href="http://www.youtube.com/watch?feature=player_embedded&v=z5DZFriQmr4
" target="_blank"><img src="http://img.youtube.com/vi/z5DZFriQmr4/0.jpg" 
alt="A deep learning model for Object Detection is applied to a video from the streets of Jakarta." width="720" height="540" border="10" /></a>

**Special thanks to:**

- Naoki Koike for capturing such stunning visuals. You can find his videos [**_here_**](https://vimeo.com/user6142897).
- [**_Road Crash Statistics_**](http://asirt.org/initiatives/informing-road-users/road-safety-facts/road-crash-statistics) Accessed on 24th September 2017 for the Road Accident Statistics.