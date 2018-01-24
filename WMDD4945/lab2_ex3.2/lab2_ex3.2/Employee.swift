//
//  Employee.swift
//  lab2_ex3.2
//
//  Created by Daniel on 2018-01-22.
//  Copyright © 2018 Langara. All rights reserved.
//

import Foundation

class Employee {
    var firstName:String
    var lastName: String
    var monthlySalary: Double
    
    init(firstName:String, lastName:String, monthlySalary:Double) {
        self.firstName = firstName
        self.lastName = lastName
        self.monthlySalary = monthlySalary
    }
    
    func getYearlySalary() -> Double {
        return monthlySalary * 12
    }
    
    func giveRaise(raisePercentage:Double) {
        monthlySalary *= (raisePercentage / 100) + 1
    }
}
