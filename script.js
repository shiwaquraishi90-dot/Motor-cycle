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

/* =========================
   SECTION 03 — PERFORMANCE COUNTERS
========================= */

const counters = document.querySelectorAll(".counter");

if (counters.length) {
    let countersStarted = false;

    const startCounters = () => {
        if (countersStarted) return;

        countersStarted = true;

        counters.forEach((counter) => {
            const target = Number(counter.dataset.target);
            const duration = 1600;
            const startTime = performance.now();

            const updateCounter = (currentTime) => {
                const progress = Math.min(
                    (currentTime - startTime) / duration,
                    1
                );

                const easedProgress =
                    1 - Math.pow(1 - progress, 3);

                counter.textContent = Math.floor(
                    easedProgress * target
                );

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            requestAnimationFrame(updateCounter);
        });
    };

    const performanceSection = document.querySelector("#performance");

    if (performanceSection) {
        const counterObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        startCounters();
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.25
            }
        );

        counterObserver.observe(performanceSection);
    }
}

