const products = require('../data/products')
const createPackages = require('../services/product.service')

const createProductPackage=(req,res)=>{
        const { selectedProductIds } = req.body;
        if (!Array.isArray(selectedProductIds) || !selectedProductIds.length) {
          return res.status(400).json({ error: 'No valid items selected' });
        }
        const packages = createPackages(selectedProductIds);
        console.log(packages)
        res.json(packages);
    } 

const getProducts=(req,res)=>{
        res.json(products);
    }

module.exports = {createProductPackage,getProducts}