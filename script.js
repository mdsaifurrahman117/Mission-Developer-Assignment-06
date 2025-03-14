// fetching all  category button 
 const category_button  = async () => {
            try {
                        const response = await fetch ("https://openapi.programming-hero.com/api/peddy/categories")
                        const data = await response.json()
                        data = show_category(data.categories)
            } catch (error) {
                        error => console.log(error)
            }
} ;

// showing all category button on the ui 
const show_category = (categories) => {
            // console.log(category);
            const button_collection = document.getElementById("button_collection");
            
            // looping all category button
            for (const items of categories) {
                        // console.log(items);
                        const button_container =  document.createElement("div");
                        button_container.classList.add = "btn";
                        button_container.innerHTML = `
                                    <button 
                                                class="btn bg-green-50 px-14 py-7 text-[15px] rounded-full border border-green-800 
                                                            w-[150px] md:w-[200px]">
                                                <img src="${items.category_icon}" class="w-8 h-8"> 
                                                ${items.category}
                                    </button>
                        `;
                        button_collection.appendChild(button_container);
            };
};
category_button()