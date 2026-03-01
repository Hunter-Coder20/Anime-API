const card = `<div class="anime-card">
    <div class="anime-poster" style="background-image: url('');"></div>
        <div class="anime-info">
            <div class="anime-title">Bleach</div>
            <div class="anime-rating"><i class="fas fa-star"></i> 4.9</div>
        <div class="anime-genres">Action, Adventure, Supernatural</div>
    </div>
</div>`;
async function loadAnime() {
    const response = await fetch("https://api.jikan.moe/v4/top/anime");
    const data = await response.json();
    const grid = document.getElementById("animeGrid");
    grid.innerHTML = "";

    data.data.forEach((anime) => {
        const genres = anime.genres
            ? anime.genres.map((g) => g.name).join(",")
            : "";

        grid.innerHTML += `<div class="anime-card">
    <div class="anime-poster" style="background-image: url('${anime.images.jpg.image_url}');"></div>
        <div class="anime-info">
            <div class="anime-title">${anime.title}</div>
            <div class="anime-rating"><i class="fas fa-star"></i> ${anime.score || "N/A"}</div>
        <div class="anime-genres">${genres}</div>
    </div>`;
        document.querySelectorAll(".anime-card").forEach((card) => {
            // |
            card.addEventListener("click", function () {
                const title = this.querySelectorAll(".anime-title").textContent;
                alert(`Opening ${title}...`);
            });
        });
    });
}

document.querySelectorAll(".nav-tab").forEach((tab) => {
    tab.addEventListener("click", function (e) {
        e.preventDefault();
        document
            .querySelectorAll(".nav-tab")
            .forEach((t) => t.classList.remove("active"));
        this.classList.add("active");
    });
});

document.querySelectorAll(".sidebar-item").forEach((item) => {
    item.addEventListener("click", function (e) {
        e.preventDefault();
        document
            .querySelectorAll(".sidebar-item")
            .forEach((i) => i.classList.remove("active"));
        this.classList.add("active");
    });
});

document.querySelector(".play-button").addEventListener("click", () => {
    alert("Playing Solo Leveling!")
})

document.querySelectorAll(".popular-item").forEach((item) => {
    item.addEventListener("click", function () {
        const title = this.querySelectorAll("h4").textContent;
        alert(`Opening ${title}...`)
    });
});

loadAnime();
