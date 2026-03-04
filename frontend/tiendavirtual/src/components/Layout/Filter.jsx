function Filter({ search, setSearch, categoria, setCategoria, precio, setPrecio, orden, setOrden }) {
    return (
        <section>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                {/* Buscador */}
                <div className="mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)} // 👈
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Categoría */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
                        <select
                            value={categoria}
                            onChange={(e) => setCategoria(e.target.value)} // 👈
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Todas</option>
                            <option value="laptops">Laptops</option>
                            <option value="celulares">Celulares</option>
                            <option value="componentes">Componentes</option>
                            <option value="accesorios">Accesorios</option>
                        </select>
                    </div>

                    {/* Precio */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Rango de Precio</label>
                        <select
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)} // 👈
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Cualquier Precio</option>
                            <option value="0-500000">$0 - $500,000</option>
                            <option value="500000-1500000">$500,000 - $1,500,000</option>
                            <option value="1500000-3000000">$1,500,000 - $3,000,000</option>
                            <option value="3000000">+$3,000,000</option>
                        </select>
                    </div>

                    {/* Orden */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ordenar Por</label>
                        <select
                            value={orden}
                            onChange={(e) => setOrden(e.target.value)} // 👈
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="relevance">Relevancia</option>
                            <option value="price-asc">Precio: Menor a Mayor</option>
                            <option value="price-desc">Precio: Mayor a Menor</option>
                            <option value="name-asc">Nombre A-Z</option>
                            <option value="name-desc">Nombre Z-A</option>
                        </select>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Filter;