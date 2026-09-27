document.addEventListener(
    "DOMContentLoaded",
    () => {

        const form =
            document.getElementById(
                "contactForm"
            );


        const message =
            document.getElementById(
                "formMessage"
            );


        if (!form) {
            return;
        }


        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const formData =
                    new FormData(form);


                const name =
                    formData
                        .get("name")
                        ?.trim();


                const phone =
                    formData
                        .get("phone")
                        ?.trim();


                const email =
                    formData
                        .get("email")
                        ?.trim();


                const commune =
                    formData
                        .get("commune")
                        ?.trim();


                const projectType =
                    formData
                        .get("projectType")
                        ?.trim();


                const projectMessage =
                    formData
                        .get("message")
                        ?.trim();


                const privacyConsent =
                    formData.get("privacyConsent");


                if (
                    !name ||
                    !phone ||
                    !email ||
                    !projectMessage ||
                    !privacyConsent
                ) {

                    message.textContent =
                        "Completa los campos obligatorios y acepta la Política de Privacidad.";

                    return;

                }


                const subject =
                    encodeURIComponent(
                        `Solicitud de cotización - ${name}`
                    );


                const body =
                    encodeURIComponent(
`SOLICITUD DE COTIZACIÓN NEOFRAME

Nombre:
${name}

Teléfono:
${phone}

Correo:
${email}

Comuna:
${commune || "No indicada"}

Tipo de proyecto:
${projectType || "No indicado"}

Descripción del proyecto:
${projectMessage}`
                    );


                const mailto =
                    `mailto:contacto.neoframe@gmail.com?subject=${subject}&body=${body}`;


                message.textContent =
                    "Abriendo tu aplicación de correo...";


                window.location.href =
                    mailto;

            }
        );

    }
);