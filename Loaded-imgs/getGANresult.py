#!/usr/bin/python
from PIL import Image, ImageFilter
import os
import random
import sys
import getopt


def box_make(original_image, random_count):
    width, height = original_image.size
    box_image = [0]*random_count
    box = [0]*random_count

    for i in range(0, random_count):

        box_width_left = random.randrange(1, width-5)
        box_height_top = random.randrange(1, height-5)
        box_width_range = random.randrange(box_width_left+1, width)
        box_height_range = random.randrange(box_height_top+1, height)
        box[i] = (box_width_left, box_height_top,
                  box_width_range, box_height_range)

        print(i+1, ' box blur radius :', end=" ")
        box_image[i] = box_blur(original_image, box[i])

    return box_image, box


def box_blur(original_image, box):

    box_image = original_image.crop(box)

    blur_radius = random.randrange(1, 5)
    print(blur_radius)

    box_image = box_image.filter(
        ImageFilter.GaussianBlur(radius=blur_radius))

    return box_image 


def box_paste(original_image, box, box_image):
    original_image.paste(box_image, box)
  

def blurImage(Image_address):  

    im = Image.open(Image_address) 
    dir_name = os.path.split(Image_address)
    outputfile = dir_name[1].split('.')[0]+'-result.'+Image_address.split('.')[-1]
    print(dir_name, outputfile)

    random_count = random.randrange(1, 4)  
    print('number of box : ', random_count) 
    box_image, box = box_make(im, random_count)
   

    for i in range(0, random_count): 
        print('box range : ', box[i]) 
        box_paste(im, box[i], box_image[i])

    im.save(dir_name[0]+'/'+outputfile, dpi=(100, 100))
    #print('blurImage return address : '+dir_name[0]+'/real.jpg')

    return dir_name[0]+outputfile  

def main(argv):
   inputfile = ''
   try:
      opts, args = getopt.getopt(argv,"hi:o:",["ifile=","ofile="])
   except getopt.GetoptError:
      print ('test.py -i <inputfile>')
      sys.exit(2)
   for opt, arg in opts:
        if opt == '-h':
            print ('test.py -i <inputfile>')
            sys.exit()
        elif opt in ("-i", "--ifile"):
            inputfile = arg
            blurImage(inputfile)

   print ('Input file is "', inputfile)

if __name__ == "__main__":
   main(sys.argv[1:])
