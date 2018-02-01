//
//  main.swift
//  ex4.2
//
//  Created by Daniel on 2018-01-17.
//  Copyright © 2018 Daniel. All rights reserved.
//

import Foundation

func palindrome(argument: [String]) -> Bool {
    for ch in stride(from: 0, to: argument.count, by: 1) {
        if (argument[ch] != argument[(argument.count - 1) - ch]) {
        }
    }
    return true
}

print("Enter a 5-digits number")
let str:String = readLine()!
let arrStr = Array(str)

while !palindrome(argument: arrStr) {
    print("Your number is not a palindrome")
    print("Enter a 5-digits number")
}

print("Your number is a palindrome")


