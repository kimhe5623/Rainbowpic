# Table of Contents

[Rainbowpic](#Rainbowpic)
1. [System reference](#System-reference)  
2. [System diagram](#System-diagram)

    - [Showing upgraded image function for Web Client (DMO1)](#dmo1)
    - [Showing upgraded image function for App Client (DMO2)](#dmo2)
    - [Deleting related files function for Web Client (DM1)](#dm1)
    - [Deleting related files function for App Client (DM2)](#dm2)
    - [API Functions](#api)
  
3. [GAN: Pix2Pix](#GAN-pix2pix)

    - [Data learning process](#Data-learning-process)
  
4. [Execution result](#Execution-result)

<a name="Rainbowpic"/>

# Rainbowpic
A system which enables users to easily use high-quality image enhancement service.

<a name="System-reference"/>

## 1. System reference

![image](https://user-images.githubusercontent.com/32252093/103224669-76e54f80-496b-11eb-8154-caf70cbc024d.png)

<a name="System-diagram"/>

## 2. System diagram

<a name="dmo1"/>

### - Showing upgraded image function for Web Client (DMO1)

- Flow chart

  ![image](https://user-images.githubusercontent.com/32252093/103260733-18a78380-49e2-11eb-9d16-173db09dba30.png)

- Block Diagram on Web Client

  ![image](https://user-images.githubusercontent.com/32252093/103260740-1fce9180-49e2-11eb-9b09-310033cb1add.png)

- Block Diagram on Web Server

  ![image](https://user-images.githubusercontent.com/32252093/103260747-2826cc80-49e2-11eb-8ea9-40338201e2f7.png)

<a name="dmo2"/>

### - Showing upgraded image function for App Client (DMO2)

- Flow Chart

  ![image](https://user-images.githubusercontent.com/32252093/103260756-35dc5200-49e2-11eb-950a-9dbb57623b48.png)

- Block Diagram on App Client

  ![image](https://user-images.githubusercontent.com/32252093/103260765-3e348d00-49e2-11eb-89bb-652392aac6f5.png)

- Block Diagram on Web Server

  ![image](https://user-images.githubusercontent.com/32252093/103260793-53a9b700-49e2-11eb-8767-87bd9b11839c.png)

<a name="dm1"/>

### - Deleting related files function for Web Client (DM1)

- Flow Chart

  ![image](https://user-images.githubusercontent.com/32252093/103260802-5ad0c500-49e2-11eb-84be-73a8a1b10eea.png)

- Block Diagram on Web Client

  ![image](https://user-images.githubusercontent.com/32252093/103260810-63c19680-49e2-11eb-83a1-f80d178adf75.png)

- Block Diagram on Web Server

  ![image](https://user-images.githubusercontent.com/32252093/103260817-69b77780-49e2-11eb-9618-6a5cdbf6e095.png)

<a name="dm2"/>

### - Deleting related files function for App Client (DM2)

- Flow Chart

  ![image](https://user-images.githubusercontent.com/32252093/103260830-720fb280-49e2-11eb-9453-5dd31762c41e.png)

- Block Diagram on App Client

  ![image](https://user-images.githubusercontent.com/32252093/103260835-76d46680-49e2-11eb-9578-a5b1ec62faa4.png)

- Block Diagram on Web Server

  ![image](https://user-images.githubusercontent.com/32252093/103260841-7c31b100-49e2-11eb-88e8-389896e78582.png)

<a name="api"/>

### - API Functions

- /upload/api/jsonres

  ![image](https://user-images.githubusercontent.com/32252093/103260848-82c02880-49e2-11eb-8e12-59762dcb8576.png)

- /api/get/before

  ![image](https://user-images.githubusercontent.com/32252093/103260858-8b186380-49e2-11eb-9402-b5051d837157.png)

- /api/get/after

  ![image](https://user-images.githubusercontent.com/32252093/103260866-91a6db00-49e2-11eb-9a03-99218365c8a6.png)

- /api/removeall

  ![image](https://user-images.githubusercontent.com/32252093/103260872-99667f80-49e2-11eb-849a-b7b30ab2d82b.png)

<a name="GAN-pix2pix"/>

## 3. GAN: Pix2Pix

In 'Rainbowpic' system, Pix2Pix neural network algorithm was used to output better quality images based of input image values.

Pix2Pix is the name of one of the implemented GAN neural network algorithms. First of all, the author of this algorithm is phillip Isola, who is from UC Berkeley's Professor Alexei A. Efros.

- Pix2Pix Github: https://github.com/phillipi/pix2pix

<a name="Data-learning-process"/>

### - Data learning process

- Creating datasets

  Aimed to produce 1000 pairs of data sets considering physical learning time and computer performance. First, 1000 high resolution images were used as target images and target images were intentionally blurred using Java. Input data was created and connected to a pair. The completed dataset looks like this.

  ![image](https://user-images.githubusercontent.com/32252093/103262036-0714aa80-49e7-11eb-9248-c83ae282bcec.png)

  The input and target resolutions of all data sets are 256 and 256, respectively. The reason for setting the resolution to 256 * 256 is due to the learning time. 
Considering the reasonable time to obtain the output of visually precise data, 256 * 256 was the most suitable resolution. If you then study higher resolution data for future neural network performance upgrades, you will be able to see higher accuracy results.

- GAN learning

  Pix2Pix Python code that can be downloaded from github. When you run Python on the console, you can specify the path to the dataset created through each of the options you can set, or set the left and right sides of the dataset to either Input or Target respectively. The learning time for each Epoch is as follows

  Epoch | Learning time(m)
  :----: | :----:
  10 | 30
  100 | 360
  200 | 840
  400 | 2880
  
  Since the number of epochs is high, we can not conclude that it can produce good results unconditionally. However, according to the results we have learned so far, we can observe that the results are continuously improving as follows.

  ![image](https://user-images.githubusercontent.com/32252093/103262279-dc772180-49e7-11eb-9c80-c36351430b2f.png) | ![image](https://user-images.githubusercontent.com/32252093/103262282-de40e500-49e7-11eb-9cf7-4d5d61d515f9.png) | ![image](https://user-images.githubusercontent.com/32252093/103262285-e13bd580-49e7-11eb-9976-35f061d74b6d.png) | ![image](https://user-images.githubusercontent.com/32252093/103262286-e3059900-49e7-11eb-822e-03d3ec1b6a95.png) |![image](https://user-images.githubusercontent.com/32252093/103262292-e567f300-49e7-11eb-84cd-2f2d512c0387.png)
  :----: | :----: | :----: | :----: | :----:
  Target | Epoch 10 | Epoch 100 | Epoch 200 | Epoch 400

<a name="Execution-result"/>

## 4. Execution Result

<img src="https://user-images.githubusercontent.com/32252093/103262639-e188a080-49e8-11eb-9aef-2fcbb3c88ca1.png" width="800px"/>
<img src="https://user-images.githubusercontent.com/32252093/103262699-17c62000-49e9-11eb-8053-eb15806ff111.png" width="800px"/>
<img src="https://user-images.githubusercontent.com/32252093/103262722-29a7c300-49e9-11eb-9cc0-464d5b67d2a1.png" width="800px"/>
