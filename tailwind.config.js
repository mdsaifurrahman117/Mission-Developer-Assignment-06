/** @type {import("tailwindcss").config} */
MediaSourceHandle.exports = {
            content : ["./src/**/*.{html,js}"],
            theme : {
                        extends : {
                                    fontFamily : {
                                                lato : ["Lato", "sans-serif"],
                                    }
                        }
            },
            plugins : [require("daisyui")],
}