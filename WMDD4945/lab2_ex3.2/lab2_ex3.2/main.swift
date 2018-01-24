//
//  main.swift
//  lab2_ex3.2
//
//  Created by Daniel on 2018-01-22.
//  Copyright © 2018 Langara. All rights reserved.
//

import Foundation

var emp1 = Employee(firstName: "Adam", lastName: "Foo", monthlySalary: 1000)
var emp2 = Employee(firstName: "Brian", lastName: "Bar", monthlySalary: -2000)

print("\(emp1.firstName)'s yearly salary is $\(emp1.getYearlySalary())")
print("\(emp2.firstName)'s yearly salary is $\(emp2.getYearlySalary())")

emp1.giveRaise(raisePercentage: 10)
emp2.giveRaise(raisePercentage: 10)

print("\(emp1.firstName)'s yearly salary after raise is $\(emp1.getYearlySalary())")
print("\(emp2.firstName)'s yearly salary after raise is $\(emp2.getYearlySalary())")
