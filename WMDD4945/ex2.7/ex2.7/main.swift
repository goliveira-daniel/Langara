//
//  main.swift
//  ex2.7
//
//  Created by Daniel on 2018-01-17.
//  Copyright © 2018 Daniel. All rights reserved.
//

import Foundation

print("Enter a number:")
var strNumberOne = readLine()
var numberOne:Int! = 0
if strNumberOne != nil {
    numberOne = Int (strNumberOne!)
}
print ("Enter another number:")
var strNumberTwo = readLine()
var numberTwo:Int! = 0
if strNumberTwo != nil {
    numberTwo = Int (strNumberTwo!)
}
print ("Enter yet another number:")
var strNumberThree = readLine()
var numberThree:Int! = 0
if strNumberThree != nil {
    numberThree = Int (strNumberThree!)
}
var arrNumbers:[Int] = []

arrNumbers.append(numberOne)
arrNumbers.append(numberTwo)
arrNumbers.append(numberThree)

arrNumbers.sort()
print("The numbers in a correct order is:")
for number in arrNumbers {
    print(number)
}
