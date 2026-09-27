document.addEventListener(
    "DOMContentLoaded",
    () => {

        const projectPage =
            document.getElementById(
                "projectPage"
            );


        if (!projectPage) {
            return;
        }


        const params =
            new URLSearchParams(
                window.location.search
            );


        const projectId =
            params.get("id");


        const project =
            NEOFRAME_PROJECTS.find(
                item =>
                    item.id === projectId
            );


        if (!project) {

            projectPage.innerHTML = `

                <section
                    class="project-not-found"
                >

                    <div class="container">

                        <span
                            class="section-label"
                        >
                            NeoFrame
                        </span>

                        <h1>
                            Proyecto no encontrado
                        </h1>

                        <p>
                            El proyecto solicitado
                            no existe o ya no está
                            disponible.
                        </p>

                        <a
                            href="proyectos.html"
                            class="btn btn-primary"
                        >
                            Ver proyectos
                        </a>

                    </div>

                </section>

            `;

            return;
        }


        document.title =
            `${project.title} | NeoFrame SpA`;


        const formattedPrice =
            project.price
                ? new Intl.NumberFormat(
                    "es-CL",
                    {
                        style: "currency",
                        currency: "CLP",
                        maximumFractionDigits: 0
                    }
                ).format(project.price)

                : "Consultar";


        projectPage.innerHTML = `

            <section
                class="project-detail-hero"
            >

                <img
                    class="project-detail-background"
                    src="${project.cover}"
                    alt="${project.title}"
                >

                <div
                    class="project-detail-overlay"
                ></div>


                <div
                    class="
                        container
                        project-detail-heading
                    "
                >

                    <span>
                        ${project.category}
                    </span>

                    <h1>
                        ${project.title}
                    </h1>

                    <p>
                        ${project.location}
                        ·
                        ${project.year}
                    </p>

                </div>

            </section>



            <section class="section">

                <div
                    class="
                        container
                        project-information-grid
                    "
                >


                    <div
                        class="project-description"
                    >

                        <span
                            class="section-label"
                        >
                            Proyecto realizado
                        </span>

                        <h2>
                            Sobre el proyecto
                        </h2>

                        <p>
                            ${project.description}
                        </p>


                        <a
                            href="index.html#contacto"
                            class="
                                btn
                                btn-primary
                            "
                        >
                            Solicitar proyecto similar
                        </a>

                    </div>



                    <aside
                        class="project-data-card"
                    >

                        <h3>
                            Ficha del proyecto
                        </h3>


                        <div
                            class="project-data-item"
                        >
                            <span>
                                Categoría
                            </span>

                            <strong>
                                ${project.category}
                            </strong>
                        </div>


                        <div
                            class="project-data-item"
                        >
                            <span>
                                Ubicación
                            </span>

                            <strong>
                                ${project.location}
                            </strong>
                        </div>


                        <div
                            class="project-data-item"
                        >
                            <span>
                                Estado
                            </span>

                            <strong>
                                ${project.status}
                            </strong>
                        </div>


                        <div
                            class="project-data-item"
                        >
                            <span>
                                Año
                            </span>

                            <strong>
                                ${project.year}
                            </strong>
                        </div>


                        <div
                            class="project-price"
                        >

                            <span>
                                Valor del proyecto
                            </span>

                            <strong>
                                ${formattedPrice}
                            </strong>

                            <small>
                                Valor correspondiente
                                a las condiciones
                                particulares del
                                proyecto ejecutado.
                            </small>

                        </div>

                    </aside>

                </div>

            </section>



            <section
                class="project-gallery-section"
            >

                <div class="container">

                    <span
                        class="section-label"
                    >
                        Galería
                    </span>

                    <h2
                        class="section-title"
                    >
                        Registro del proyecto
                    </h2>


                    <div
                        class="project-gallery"
                        id="projectGallery"
                    ></div>

                </div>

            </section>

        `;


        /* =================================
           GALLERY
        ================================= */

        const gallery =
            document.getElementById(
                "projectGallery"
            );


        project.images.forEach(
            (image, index) => {

                const button =
                    document.createElement(
                        "button"
                    );


                button.className =
                    "gallery-item";


                button.type =
                    "button";


                button.innerHTML = `

                    <img
                        src="${image}"
                        alt="
                            ${project.title}
                            - fotografía
                            ${index + 1}
                        "
                        loading="lazy"
                    >

                `;


                button.addEventListener(
                    "click",
                    () => {

                        openLightbox(index);

                    }
                );


                gallery.appendChild(
                    button
                );

            }
        );


        /* =================================
           LIGHTBOX
        ================================= */

        const lightbox =
            document.getElementById(
                "lightbox"
            );


        const lightboxImage =
            document.getElementById(
                "lightboxImage"
            );


        const closeButton =
            document.getElementById(
                "lightboxClose"
            );


        const previousButton =
            document.getElementById(
                "lightboxPrev"
            );


        const nextButton =
            document.getElementById(
                "lightboxNext"
            );


        let currentImage = 0;


        function showImage() {

            lightboxImage.src =
                project.images[
                    currentImage
                ];

        }


        function openLightbox(index) {

            currentImage = index;

            showImage();

            lightbox
                .classList
                .add("active");

            document.body.style
                .overflow = "hidden";

        }


        function closeLightbox() {

            lightbox
                .classList
                .remove("active");

            document.body.style
                .overflow = "";

        }


        function previousImage() {

            currentImage =
                (
                    currentImage - 1 +
                    project.images.length
                )
                %
                project.images.length;

            showImage();

        }


        function nextImage() {

            currentImage =
                (
                    currentImage + 1
                )
                %
                project.images.length;

            showImage();

        }


        closeButton.addEventListener(
            "click",
            closeLightbox
        );


        previousButton.addEventListener(
            "click",
            previousImage
        );


        nextButton.addEventListener(
            "click",
            nextImage
        );


        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target
                    === lightbox
                ) {

                    closeLightbox();

                }

            }
        );


        document.addEventListener(
            "keydown",
            event => {

                if (
                    !lightbox
                        .classList
                        .contains("active")
                ) {

                    return;

                }


                if (
                    event.key === "Escape"
                ) {

                    closeLightbox();

                }


                if (
                    event.key === "ArrowLeft"
                ) {

                    previousImage();

                }


                if (
                    event.key === "ArrowRight"
                ) {

                    nextImage();

                }

            }
        );

    }
);