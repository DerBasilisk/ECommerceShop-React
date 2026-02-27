function Filter() {
    return (
        <section >
        <div class="bg-white  rounded-xl shadow-lg p-6 mb-6">
            <div class="mb-6">
                <div class="relative">
                    <input type="text" 
                    placeholder="Buscar productos..." 
                    class="  w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200" 
                    id="search-input"></input>
                    <svg class="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
            </div>
             <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700  mb-2">Categoria</label>
                    <select class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 " id="category-filter-type">
                        <option value="laptops">Laptops</option>
                        <option value="celulares">Celulares</option>
                        <option value="componentes">Componentes</option>
                        <option value="accesorios">Accesorios</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700  mb-2">Rango de Precio</label>
                    <select class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 " id="category-filter-price">
                        <option value="">Cualquier Precio</option>
                        <option value="0-500000">$0 - $500,000</option>
                        <option value="500000-1500000">$500,000 - $1,500,000</option>
                        <option value="1500000-3000000">$1,500,000 - $3,000,000</option>
                        <option value="3000000">$3,000,000</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700  mb-2">Ordenar Por</label>
                    <select class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 " id="category-filter-order">
                        <option value="relevance">Relevancia</option>
                        <option value="price-asc">Precio: Menor a Mayor</option>
                        <option value="price-desc">Precio: Mayor a Menor</option>
                        <option value="name">Nombre A-Z</option>
                        <option value="name">Nombre Z-A</option>
                        <option value="newest">Más Nuevos</option>
                        <option value="newest">Más Antiguos</option>
                    </select>
                </div>
            </div>
        </div>
        </section>
    );
}

export default Filter;
