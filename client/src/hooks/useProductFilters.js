import { useMemo, useState } from 'react';

export default function useProductFilters(products = []) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('newest');

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category).filter(Boolean))].sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    const search = query.trim().toLowerCase();

    const result = products.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category;
      const matchesSearch = !search || [product.name, product.category, product.desc]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(search));

      return matchesCategory && matchesSearch;
    });

    return [...result].sort((a, b) => {
      if (sort === 'name-asc') return String(a.name).localeCompare(String(b.name));
      if (sort === 'name-desc') return String(b.name).localeCompare(String(a.name));
      if (sort === 'oldest') return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });
  }, [products, query, category, sort]);

  return {
    query,
    setQuery,
    category,
    setCategory,
    sort,
    setSort,
    categories,
    filteredProducts,
  };
}
