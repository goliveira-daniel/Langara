//
//  main.swift
//  ex2.8
//
//  Created by Daniel on 2018-01-17.
//  Copyright © 2018 Daniel. All rights reserved.
//

import Foundation
let pi:Double = 3.14159
print("Enter the radius of a circle:")
var strRadius = readLine()
var intRadius:Double! = 0
if strRadius != nil {
    intRadius = Double (strRadius!)
}
print ("The diameter of this circle is \(intRadius * 2)")
print ("The area of this circle is \(intRadius * intRadius * pi)")
print ("The circumference of this circle is \(intRadius * 2.0 * pi)")
