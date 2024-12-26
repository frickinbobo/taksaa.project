document.addEventListener("scroll", () => {
    const button = document.getElementById("fixedButton");
    const section2 = document.getElementById("all-items");

    // Cek apakah section2 terlihat di viewport
    const sectionInView = section2.getBoundingClientRect().top < window.innerHeight &&
                          section2.getBoundingClientRect().bottom >= 0;

    // Toggle visibility button
    if (sectionInView) {
        button.classList.remove("hidden");
        button.classList.add("block");
    } else {
        button.classList.remove("block");
        button.classList.add("hidden");
    }
});