//
//  main.swift
//  ex4.2
//
//  Created by Daniel on 2018-01-17.
//  Copyright © 2018 Daniel. All rights reserved.
//

import Foundation

let arrDays:[String] = ["first","second", "third", "forth", "fifth", "sixth", "seventh","eighth", "nineth","tenth", "eleventh", "twelfth"]

let arrGifts:[String] = ["a Partridge in a pear-tree", "Two Turtle doves", "Three French hens", "Four Colly birds", "Five Gold rings", "six Geese a laying", "Seven Swans a swimming", "Eight Maids a milking", "Nine Drummers drumming", "Ten Pipers piping", "Eleven Ladies dancing", "Twelve Lords a leaping"]

for day in stride(from: 0, to: arrDays.count, by: 1) {
    print("On the \(arrDays[day]) day of Christmas my true love sent to me")
    var copyDay = day
    while copyDay >= 0 {
        print(arrGifts[copyDay])
        copyDay -= 1
    }
}
