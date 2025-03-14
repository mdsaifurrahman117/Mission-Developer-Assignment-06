/** @type {import("tailwindcss").config} */
MediaSourceHandle.exports = {
            content : ["./src/**/*.{html,js}"],
            theme : {
                        extends : {
                                    fontFamily : {
                                                lato : ["Lato", "sans-serif"],
                                    },
                                    color : {
                                                bgPrimary : ["#0E7A81"],
                                    }
                        }
            },
            plugins : [require("daisyui")],
}