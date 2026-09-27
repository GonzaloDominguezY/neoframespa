function createProjectCard(project) {

    const article =
        document.createElement("a");


    article.className =
        "project-card";


    article.href =
        `proyecto.html?id=${encodeURIComponent(project.id)}`;


    article.innerHTML = `

        <img
            class="project-card-image"
            src="${project.cover}"
            alt="${project.title}"
            loading="lazy"
        >

        <div
            class="project-card-overlay"
        ></div>


        <div
            class="project-card-content"
        >

            <span
                class="project-card-category"
            >
                ${project.category}
            </span>


            <h3>
                ${project.title}
            </h3>


            <p
                class="project-card-location"
            >
                ${project.location}
            </p>

        </div>

    `;


    return article;
}



document.addEventListener(
    "DOMContentLoaded",
    () => {

        /* =================================
           HOME FEATURED PROJECTS
        ================================= */

        const featuredContainer =
            document.getElementById(
                "featuredProjects"
            );


        if (featuredContainer) {

            const featured =
                NEOFRAME_PROJECTS
                    .filter(
                        project =>
                            project.featured
                    )
                    .slice(0, 6);


            featured.forEach(project => {

                featuredContainer
                    .appendChild(
                        createProjectCard(project)
                    );

            });

        }


        /* =================================
           ALL PROJECTS
        ================================= */

        const allProjectsContainer =
            document.getElementById(
                "allProjects"
            );


        const filtersContainer =
            document.getElementById(
                "projectFilters"
            );


        if (
            allProjectsContainer &&
            filtersContainer
        ) {

            const categories = [
                "Todos",
                ...new Set(
                    NEOFRAME_PROJECTS.map(
                        project =>
                            project.category
                    )
                )
            ];


            function renderProjects(
                category = "Todos"
            ) {

                allProjectsContainer
                    .innerHTML = "";


                const projects =
                    category === "Todos"
                        ? NEOFRAME_PROJECTS
                        : NEOFRAME_PROJECTS
                            .filter(
                                project =>
                                    project.category
                                    === category
                            );


                projects.forEach(project => {

                    allProjectsContainer
                        .appendChild(
                            createProjectCard(project)
                        );

                });

            }


            categories.forEach(
                (category, index) => {

                    const button =
                        document
                            .createElement(
                                "button"
                            );


                    button.type =
                        "button";


                    button.className =
                        "filter-button";


                    if (index === 0) {

                        button.classList
                            .add("active");

                    }


                    button.textContent =
                        category;


                    button.addEventListener(
                        "click",
                        () => {

                            document
                                .querySelectorAll(
                                    ".filter-button"
                                )
                                .forEach(btn =>
                                    btn.classList
                                        .remove(
                                            "active"
                                        )
                                );


                            button.classList
                                .add("active");


                            renderProjects(
                                category
                            );

                        }
                    );


                    filtersContainer
                        .appendChild(button);

                }
            );


            renderProjects();

        }

    }
);