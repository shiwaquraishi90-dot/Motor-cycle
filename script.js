/* =====================================================
   SECTION 01 — SCROLL REVEAL
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const revealElements = document.querySelectorAll("[data-reveal]");

    if (!revealElements.length) {
        return;
    }

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });

});


// section two


document.addEventListener("DOMContentLoaded", () => {

    const revealElements = document.querySelectorAll("[data-reveal]");

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });

});

