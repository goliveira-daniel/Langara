//
//  HeartRate.swift
//  lab2_ex3.3
//
//  Created by Daniel on 2018-01-23.
//  Copyright © 2018 Langara. All rights reserved.
//

import Foundation

class HeartRate {
    var firstName:String
    var lastName:String
    var yearOfBirth:Int
    let age:Int
    
    init(firstName:String,lastName:String, yearOfBirth:Int, currentYear:Int) {
        self.firstName = firstName
        self.lastName = lastName
        self.yearOfBirth = yearOfBirth
        self.age = currentYear - yearOfBirth
    }
    
    func maxHeartRate() -> Int {
        return 220 - age
    }
    
    func maxTargetHeartRate() -> Double {
        return (Double(maxHeartRate()) * 0.85)
    }
    
    func minTargetHeartRate() -> Double {
        return (Double(maxHeartRate()) * 0.5)
    }
}
