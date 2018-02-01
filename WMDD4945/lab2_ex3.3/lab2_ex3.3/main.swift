//
//  main.swift
//  lab2_ex3.3
//
//  Created by Daniel on 2018-01-23.
//  Copyright © 2018 Langara. All rights reserved.
//

import Foundation

var hr = HeartRate(firstName: "Daniel", lastName: "Oliveira", yearOfBirth: 1987, currentYear: 2018)

print("\(hr.firstName) is \(hr.age) year old and his maximum heart rate is \(hr.maxHeartRate()). His target heart rate is between \(hr.minTargetHeartRate()) and \(hr.maxTargetHeartRate())")
