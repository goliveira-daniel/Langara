//
//  Invoice.swift
//  lab2_ex3.1
//
//  Created by Daniel on 2018-01-18.
//  Copyright © 2018 Langara. All rights reserved.
//

import Foundation

class Invoice{
    var partNumber: String = ""
    var partDescription: String = ""
    var quantity: Int = 0
    var pricePerItem: Double = 0
    
    init(partNumber: String, partDescription: String, quantity: Int, pricePerItem: Double) {
        self.partNumber = partNumber
        self.partDescription = partDescription
        self.quantity = (quantity > 0 ? quantity : 0)
        self.pricePerItem = (pricePerItem > 0 ? pricePerItem : 0)
    }
    
    func getInvoiceAmount() -> Double {
        return Double(quantity) * pricePerItem
    }
}
