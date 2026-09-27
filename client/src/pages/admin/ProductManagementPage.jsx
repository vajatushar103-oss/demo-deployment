import { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import ProductManager from '../../components/admin/ProductManager';
import StaffDashboard from '../../components/admin/StaffDashboard';

export default function ProductManagementPage() {
  const [products, setProducts] = useState([]);

  const handleAddProduct = () => {
    document.getElementById('staff-product-manager')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.dispatchEvent(new CustomEvent('prime:open-product-editor'));
  };

  return (
    <AdminLayout>
      <StaffDashboard products={products} onAddProduct={handleAddProduct} />
      <div id="staff-product-manager">
        <ProductManager onProductCountChange={setProducts} />
      </div>
    </AdminLayout>
  );
}
