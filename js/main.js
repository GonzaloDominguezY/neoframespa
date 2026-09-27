document.addEventListener("DOMContentLoaded", () => {

    const header =
        document.querySelector(".header");

    const menuButton =
        document.getElementById("mobileMenuButton");

    const navigation =
        document.getElementById("mainNavigation");

    const currentYear =
        document.getElementById("currentYear");


    /* =====================================
       HEADER SCROLL
    ===================================== */

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 20) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader
    );


    /* =====================================
       MOBILE MENU
    ===================================== */

    if (menuButton && navigation) {

        menuButton.addEventListener(
            "click",
            () => {

                navigation
                    .classList
                    .toggle("active");

                document.body
                    .classList
                    .toggle("menu-open");

            }
        );


        navigation
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        navigation
                            .classList
                            .remove("active");

                        document.body
                            .classList
                            .remove("menu-open");

                    }
                );

            });

    }


    /* =====================================
       CURRENT YEAR
    ===================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }

});