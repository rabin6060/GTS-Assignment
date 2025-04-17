const products = require('../data/products')

// Create packages from selected items
const createPackages = (selectedItems) => {
    // check and filter if items are valid
    const validItems = selectedItems
      .map(id => products.find(p => p.id === id))
      .filter(item => item && item.price != null && item.weight != null);

    if (!validItems.length) return [];

    // Sort to prioritize high-value items
    validItems.sort((a, b) => b.price - a.price);

    //Assign items to packages based on $250 price limit
    const packages = [];
    let currentPackage = { items: [], totalPrice: 0, totalWeight: 0 };

    for (const item of validItems) {
      if (currentPackage.totalPrice + item.price <= 250) {
        currentPackage.items.push(item);
        currentPackage.totalPrice += item.price;
        currentPackage.totalWeight += item.weight;
      } else {
        if (currentPackage.items.length) packages.push(currentPackage);
        currentPackage = { items: [item], totalPrice: item.price, totalWeight: item.weight };
      }
    }
    if (currentPackage.items.length) packages.push(currentPackage);

    
   

    return packages.map(pkg => ({
      items: pkg.items.map(item => item.name),
      totalWeight: pkg.totalWeight,
      totalPrice: pkg.totalPrice,
      courierPrice: 15 //15 fixed per package
    }));
  };