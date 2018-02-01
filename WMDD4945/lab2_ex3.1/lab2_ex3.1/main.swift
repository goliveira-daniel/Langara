//
//  main.swift
//  lab2_ex3.1
//
//  Created by Daniel on 2018-01-18.
//  Copyright © 2018 Langara. All rights reserved.
//

import Foundation

var invoice = Invoice(partNumber: "1", partDescription: "this", quantity: 10, pricePerItem: 2)
var negativeInvoice = Invoice(partNumber: "1", partDescription: "that", quantity: -1, pricePerItem: 20)

print("The total of your invoice is $\(invoice.getInvoiceAmount())")
print("The total for the other invoice is $\(negativeInvoice.getInvoiceAmount())")
