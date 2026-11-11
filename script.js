document.addEventListener("DOMContentLoaded", async () => {
    const mount = document.getElementById("site-header");
    if (mount) {
        try {
            const response = await fetch("head.html");
            if (!response.ok) throw new Error("Impossible de charger head.html");
            mount.innerHTML = await response.text();

            const currentPage = document.body.dataset.page || "index";
            document.querySelectorAll(".main-nav a").forEach(link => {
                if (link.dataset.page === currentPage) {
                    link.classList.add("active");
                    link.setAttribute("aria-current", "page");
                }
            });

            const toggle = document.getElementById("menuToggle");
            const nav = document.getElementById("mainNav");
            toggle?.addEventListener("click", () => {
                const opened = nav.classList.toggle("show");
                toggle.setAttribute("aria-expanded", String(opened));
            });
            nav?.querySelectorAll("a").forEach(link => {
                link.addEventListener("click", () => {
                    nav.classList.remove("show");
                    toggle?.setAttribute("aria-expanded", "false");
                });
            });
        } catch (error) {
            console.error(error);
            mount.innerHTML = '<div class="header-error">Le menu n’a pas pu être chargé. Vérifiez que head.html est présent à la racine du site.</div>';
        }
    }

    const year = document.getElementById("currentYear");
    if (year) year.textContent = new Date().getFullYear();
});
