const {getProducts, createProductPackage} = require("../controller/product.controller")
const express = require('express')

const router = express.Router()

router.get('/',getProducts)
router.post('/create-order',createProductPackage)

module.exports = router