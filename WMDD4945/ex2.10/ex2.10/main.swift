//
//  main.swift
//  ex2.10
//
//  Created by Daniel on 2018-01-17.
//  Copyright © 2018 Daniel. All rights reserved.
//

import Foundation

print("Enter your weight:")
var strWeight = readLine()
var douWeight:Double! = 0
if strWeight != nil {
    douWeight = Double (strWeight!)
}

print("Enter height:")
var strHeight = readLine()
var douHeight:Double! = 0
if strWeight != nil {
    douWeight = Double (strWeight!)
}
print ("Your BMI is \(douWeight / douHeight * douHeight)")
