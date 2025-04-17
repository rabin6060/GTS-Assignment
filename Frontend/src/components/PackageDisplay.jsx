export const PackageDisplay = ({ packages, getCourierPrice }) => {
    return (
      packages.length > 0 && (
        <div className="package-results">
          <h2>Order Packages</h2>
          {packages.map((pkg, index) => (
            <div key={index} className="package">
              <h3>Package {index + 1}</h3>
              <p>Items - {pkg.items.join(', ')}</p>
              <p>Total weight - {pkg.totalWeight}g</p>
              <p>Total price - ${pkg.totalPrice}</p>
              <p>Courier price - ${getCourierPrice(pkg.totalWeight)}</p>
            </div>
          ))}
        </div>
      )
    );
  };