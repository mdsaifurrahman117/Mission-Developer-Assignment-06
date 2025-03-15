document.addEventListener("DOMContentLoaded", () => {
            // adding loader
            const loader = document.getElementById("loader");
            const show_loader = () => {
                        loader.classList.add("block");
                        loader.classList.remove("hidden");
            }
            const hide_loader = () => {
                        loader.classList.add("hidden");
                        loader.classList.remove("block");
            }

            // fetching all  category button 
            const category_button = async () => {
                        try {
                                    show_loader();
                                    const response = await fetch("https://openapi.programming-hero.com/api/peddy/categories");
                                    const data = await response.json();
                                    data = show_category(data.categories);
                                    hide_loader();
                        } catch (error) {
                                    error => console.log(error)
                                    hide_loader();
                        }
            };

// showing all category button on the ui 
const show_category = (categories) => {
            // console.log(categories);
            const button_collection = document.getElementById("button_collection");

            // looping all category button
            categories.forEach(items => {
                        const button_container = document.createElement("div");

                        // create buttons
                        const button = document.createElement("button");
                        button.classList.add("btn", "px-14", "py-7", "text-[15px]", "w-[150px]", "md:w-[200px]");
                        button.setAttribute("id", `category_button_${items.category}`);
                        button.setAttribute("data-category", items.category);
                        button.addEventListener("click", () => {
                                    category_data(items.category)
                        });
                        button.innerHTML = `
                                    <img src="${items.category_icon}" class="w-8 h-8"> 
                        `;
                        button_container.appendChild(button);
                        button_collection.appendChild(button_container);
            });
};

// fetching category data based on category button click
const category_data = async (category) => {
            try {
                        show_loader();
                        const response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`);
                        const data = await response.json();

                        // active button style adding
                        remove_active()
                        const active_category_button = document.getElementById(`category_button_${category}`);
                        active_category_button.classList.add("active_button");

                        // calling all data function
                        show_data(data.data);
                        hide_loader();
            } catch (error) {
                        console.log(error);
                        hide_loader();
            }
}

// removing active button style 
const remove_active = () => {
            const remove_style = document.getElementsByClassName("btn");
            for (const btn of remove_style) {
                        btn.classList.remove("active_button")
            }
}

// get all data by default
const get_data = async () => {
            try {
                        const response = await fetch("https://openapi.programming-hero.com/api/peddy/pets");
                        const data = await response.json();
                        show_data(data.pets);

            } catch (error) {
                        console.log(error);
            }
}


// showing all the data by default on the ui
const show_data = (pets) => {
            // get the items container 
            const items_container = document.getElementById("items_container");
            items_container.innerHTML = "";

            // check if pets data is empty, null or undefined
            if (!pets || pets.length === 0) {
                        // console.log("not found");
                        items_container.classList.remove("grid");
                        items_container.innerHTML = `
                        <div class="bg-gray-100 w-80 md:w-[800px] mx-auto h-full flex flex-col items-center justify-center  p-14 rounded-lg">
                                    <img src="assets/error.webp" class="w-40 mx-auto">
                                    <h1 class="text-3xl text-center">No Information Available</h1>
                        </div>
                        `;
                        return;
            } else {
                        items_container.classList.add("grid")
            };

            // declare ascending 
            let is_ascending = true;
            
            // sort data by price descending
            const sort_price = () => {
                        pets.sort((a, b) => is_ascending ? (a.price || 0) - (b.price) : (b.price || 0) - (a.price));
                        document.getElementById("sort_price").textContent = !is_ascending ? "High to Low" : "Low to High" ;
                        show_data(pets);
            };
            document.getElementById("sort_price").addEventListener("click", () => {
                        is_ascending = !is_ascending;
                        sort_price();
            });
            
            // looping all the data
            pets.forEach(items => {
                        // console.log(items);
                        
                        const card_wrapper = document.createElement("div");
                        card_wrapper.classList.add("card", "bg-base-100", "w-[280px]", "mx-auto", "shadow-sm");
                        card_wrapper.innerHTML = `
                                    <figure class="p-5">
                                                <img
                                                            src="${items.image}"
                                                            alt="pets image" 
                                                />
                                    </figure>
                                    <div class="card-body pt-0">
                                                <h2 class="card-title">
                                                            ${items.pet_name || "Unavailable"}
                                                </h2>
                                                <span class="text-gray-500 "><i class="ri-apps-2-line p-1"></i>
                                                            Breed : ${items.breed || "Unavailable"} 
                                                </span>
                                                <span class="text-gray-500"><i class="ri-calendar-line p-1"></i>
                                                            Birth : ${items.date_of_birth || "Unavailable"} 
                                                </span>
                                                <span class="flex text-gray-500"><img src="assets/gender.svg">
                                                            Gender : ${items.gender || "Unavailable"} 
                                                </span>
                                                <span class="flex text-gray-500"><img src="assets/dollar.svg"> : 
                                                            ${items.price || "Unavailable"}
                                                </span>
                                                <div class="card-actions justify-center gap-3 border-t border-gray-200 py-2 mt-2">
                                                            <button class="btn bg-base-100"><img src="assets/thumbs-up.svg"></button>
                                                            <button class="btn bg-base-100 text_primary font-semibold">Adopt</button>
                                                            <button class="btn bg-base-100 text_primary font-semibold" 
                                                                        onclick="get_description('${items.petId || "Unavailable"}')">
                                                                        Details
                                                            </button>
                                                </div>
                                    </div>
                        `;
                        items_container.appendChild(card_wrapper);
            });
};

// showing all data by clicking view more button
window.show_all_item = () => {
            remove_active()
            items_container.innerHTML = "";
            get_data();
};

// fetching description data
window.get_description = async (id) => {
            try {
                        show_loader();
                        const response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
                        const data = await response.json();
                        show_description(data);
                        hide_loader()
            } catch (error) {
                        console.log(error);
                        hide_loader();
            }
}

// showing description on modal
const show_description = (desc) => {
            const description_container = document.getElementById("description-container");
            description_container.innerHTML = `
                        <figure class="p-5">
                                                <img
                                                            src="${desc.petData.image}"
                                                            alt="pets image" 
                                                            class="w-full rounded"
                                                />
                                    </figure>
                                    <div class="card-body t-0">
                                                <h2 class="card-title text-2xl"> ${desc.petData.pet_name || "Unavailable"}</h2>
                                                <div class="grid grid-cols-2 gap-1">
                                                            <span class="text-gray-500 "><i class="ri-apps-2-line p-1"></i>
                                                                        Breed : ${desc.petData.breed || "Unavailable"}
                                                            </span>
                                                            <span class="text-gray-500"><i class="ri-calendar-line p-1"></i>
                                                                        Birth : ${desc.petData.date_of_birth || "Unavailable"}
                                                            </span>
                                                            <span class="flex text-gray-500"><img src="assets/gender.svg">
                                                                        Gender : ${desc.petData.gender || "Unavailable"} 
                                                            </span>
                                                            <span class="flex text-gray-500"><img src="assets/dollar.svg"> : 
                                                                        ${desc.petData.price || "Unavailable"}$
                                                            </span>
                                                            <span class="flex text-gray-500"><img src="assets/gender.svg">
                                                                        Vaccinated Status : ${desc.petData.vaccinated_status || "Unavailable"}
                                                            </span>
                                                </div>
                                                <div class="border-t border-gray-200 py-2 mt-2">
                                                            <h3 class="text-xl font-semibold py-2">Details Information</h3>
                                                            <p>${desc.petData.pet_details || "Unavailable"}</p>
                                                </div>
                                    </div>

            `;
            document.getElementById("open_modal").showModal();
}

category_button()

// calling data function 
get_data();

})