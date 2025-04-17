const products = require('../data/products');

// Calculate courier price based on weight
function getCourierPrice(weight) {
  if (weight <= 200) return 5;
  if (weight <= 500) return 10;
  if (weight <= 1000) return 15;
  return 20;
}

// Create packages from selected items
const createPackages = (selectedItems) => {
  // Validate input
  if (!Array.isArray(selectedItems) || selectedItems.length === 0) {
    throw new Error('Selected items must be a non-empty array');
  }

  // Check and filter valid items
  const validItems = selectedItems
    .map((item) => {
      if (!item || !item.id) {
        console.warn('Invalid item: missing id', item);
        return null;
      }
      const product = products.find((p) => p.id === item.id);
      if (!product) {
        console.warn(`Product with ID ${item.id} not found`);
        return null;
      }
      if (product.price == null || product.weight == null || product.price < 0 || product.weight < 0) {
        console.warn(`Invalid product data for ${product.name}: price=${product.price}, weight=${product.weight}`);
        return null;
      }
      if (product.price > 250) {
        throw new Error(`Product ${product.name} has price (${product.price}) exceeding $250`);
      }
      return product;
    })
    .filter((item) => item !== null);

  if (!validItems.length) {
    return [];
  }

  // Sort to prioritize high-value items
  validItems.sort((a, b) => b.price - a.price);

  // Assign items to packages based on $250 price limit
  const packages = [];
  let currentPackage = { items: [], totalPrice: 0, totalWeight: 0 };

  for (const item of validItems) {
    if (currentPackage.totalPrice + item.price <= 250) {
      currentPackage.items.push(item);
      currentPackage.totalPrice += item.price;
      currentPackage.totalWeight += item.weight;
    } else {
      if (currentPackage.items.length) {
        packages.push(currentPackage);
      }
      currentPackage = { items: [item], totalPrice: item.price, totalWeight: item.weight };
    }
  }
  if (currentPackage.items.length) {
    packages.push(currentPackage);
  }

  // Balance weights if multiple packages
  if (packages.length > 1) {
    // Simple swap-based balancing to minimize weight difference between packages
    for (let i = 0; i < packages.length - 1; i++) {
      for (let j = i + 1; j < packages.length; j++) {
        const pkg1 = packages[i];
        const pkg2 = packages[j];

        for (const item1 of pkg1.items) {
          for (const item2 of pkg2.items) {
            const newPrice1 = pkg1.totalPrice - item1.price + item2.price;
            const newPrice2 = pkg2.totalPrice - item2.price + item1.price;

            if (newPrice1 <= 250 && newPrice2 <= 250) {
              const newWeight1 = pkg1.totalWeight - item1.weight + item2.weight;
              const newWeight2 = pkg2.totalWeight - item2.weight + item1.weight;

              // Compare weight difference between packages
              const currentDiff = Math.abs(pkg1.totalWeight - pkg2.totalWeight);
              const newDiff = Math.abs(newWeight1 - newWeight2);

              if (newDiff < currentDiff) {
                // Perform swap
                pkg1.items = pkg1.items.filter((item) => item !== item1);
                pkg2.items = pkg2.items.filter((item) => item !== item2);
                pkg1.items.push(item2);
                pkg2.items.push(item1);

                pkg1.totalPrice = newPrice1;
                pkg2.totalPrice = newPrice2;
                pkg1.totalWeight = newWeight1;
                pkg2.totalWeight = newWeight2;
              }
            }
          }
        }
      }
    }
  }

  // Format output for frontend
  return packages.map((pkg) => ({
    items: pkg.items.map((item) => item.name),
    totalWeight: pkg.totalWeight,
    totalPrice: pkg.totalPrice,
    courierPrice: getCourierPrice(pkg.totalWeight),
  }));
};

module.exports = createPackages;