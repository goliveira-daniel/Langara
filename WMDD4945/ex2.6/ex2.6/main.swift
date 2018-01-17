//
//  main.swift
//  ex2.6
//
//  Created by Daniel on 2018-01-17.
//  Copyright © 2018 Daniel. All rights reserved.
//

//import UIKit
import Foundation

//var str = "Hello, playground"
print("Enter a number:")
var strNumberOne = readLine()
var numberOne:Double! = 0
if strNumberOne != nil {
    numberOne = Double (strNumberOne!)
}
print ("Enter another number:")
var strNumberTwo = readLine()
var numberTwo:Double! = 0
if strNumberTwo != nil {
    numberTwo = Double (strNumberTwo!)
}
print("Enter a operation:");
var result:Double
var operation = readLine()
switch operation {
case "1"?:
    result = numberOne + numberTwo
    print("\(numberOne) + \(numberTwo) = \(result)")
case "2"?:
    result = numberOne - numberTwo
    print("\(numberOne) - \(numberTwo) = \(result)")
case nil: print("invalid entry!")
case "3"?:
    result = numberOne * numberTwo
    print("\(numberOne) * \(numberTwo) = \(result)")
case "4"?:
    result = numberOne / numberTwo
    print("\(numberOne) / \(numberTwo) = \(result)")
default: print("Invalid entry!")
//case .some(_):
    break
}
