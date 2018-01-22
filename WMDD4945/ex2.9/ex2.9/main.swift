//
//  main.swift
//  ex2.9
//
//  Created by Daniel on 2018-01-17.
//  Copyright © 2018 Daniel. All rights reserved.
//

import Foundation

print("Enter a 5-digit integer number:")
var strRadius = readLine()
var intRadius:Int! = 0
if strRadius != nil {
    intRadius = Int (strRadius!)
}
print ("The first digit is \(intRadius / 10000)")
print ("The first digit is \(intRadius / 1000)")
print ("The first digit is \(intRadius / 100)")
print ("The first digit is \(intRadius / 10)")
