// fetching all  category button 
 const category_button  = async () => {
            try {
                        const response = await fetch ("https://openapi.programming-hero.com/api/peddy/categories");
                        const data = await response.json();
                        data = show_category(data.categories);
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

// get all data 
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
            // console.log(pets);

            // get the items container 
            const items_container = document.getElementById("items_container");
            
            // looping all the data
            pets.forEach(items => {
                        const card_wrapper = document.createElement("div");
                        card_wrapper.classList.add("card", "bg-base-100", "w-[280px]" , "mx-auto","shadow-sm");
                        card_wrapper.innerHTML = `
                                    <figure class="p-5">
                                                <img
                                                            src="${items.image}"
                                                            alt="pets image" 
                                                />
                                    </figure>
                                    <div class="card-body">
                                                <h2 class="card-title">
                                                            ${items.pet_name}
                                                </h2>
                                                <span class="text-gray-500 "><i class="ri-apps-2-line p-1"></i>Breed : ${items.breed} </span>
                                                <span class="text-gray-500"><i class="ri-calendar-line p-1"></i>Birth : ${items.date_of_birth} </span>
                                                <span class="flex text-gray-500"><img src="assets/gender.svg">Gender : ${items.gender} </span>
                                                <span class="flex text-gray-500"><img src="assets/dollar.svg"> : ${items.price}$</span>
                                                <div class="card-actions justify-center gap-3 border-t border-gray-200 py-2 mt-2">
                                                            <button class="btn bg-base-100"><img src="assets/thumbs-up.svg"></button>
                                                            <button class="btn bg-base-100 text_primary font-semibold">Adopt</button>
                                                            <button class="btn bg-base-100 text_primary font-semibold">Details</button>
                                                </div>
                                    </div>
                                    
                        `;
                        items_container.appendChild(card_wrapper);
            });
};


// calling category function
category_button();

// calling data function 
get_data();




/*


{
    "petId": 1,
    "breed": "Golden Retriever",
    "category": "Dog",
    "date_of_birth": "2023-01-15",
    "price": 1200,
    "image": "https://i.ibb.co.com/p0w744T/pet-1.jpg",
    "gender": "Male",
    "pet_details": "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog.",
    "vaccinated_status": "Fully",
    "pet_name": "Sunny"
}


*/