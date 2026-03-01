async function loadAnime() {
  const response = await fetch("https://api.jikan.moe/v4/top/anime");
  const data = await response.json();
  const grid = document.getElementById("animeGrid");
  grid.innerHTML = "";

  const sortOptions = document.getElementById("sortOptions");

  function sortData() {
    const selectedOption = sortOptions ? sortOptions.value : "";

    if (selectedOption === "title") {
      data.data.sort((a, b) => a.title.localeCompare(b.title));
    } else if (selectedOption === "rating") {
      data.data.sort((a, b) => b.score - a.score);
    }

    displayAnime(data.data);
  }

  function sortData() {
    const selectedOption = sortOptions ? sortOptions.value : "";

    if (selectedOption === "title-asc") {
      data.data.sort((a, b) => a.title.localeCompare(b.title));
    } else if (selectedOption === "title-desc") {
      data.data.sort((a, b) => b.title.localeCompare(a.title));
    } else if (selectedOption === "rating-desc") {
      data.data.sort((a, b) => (b.score || 0) - (a.score || 0));
    } else if (selectedOption === "rating-asc") {
      data.data.sort((a, b) => (a.score || 0) - (b.score || 0));
    }

    displayAnime(data.data);
  }

  if (sortOptions) {
    sortOptions.addEventListener("change", sortData);
  }

  function displayAnime(animeList) {
    grid.innerHTML = "";

    animeList.forEach((anime) => {
      const genres = anime.genres
        ? anime.genres.map((g) => g.name).join(", ")
        : "";

      grid.innerHTML += `<div class="anime-card">
                <div class="anime-poster" style="background-image: url('${anime.images.jpg.image_url}');"></div>
                <div class="anime-info">
                    <div class="anime-title">${anime.title}</div>
                    <div class="anime-rating"><i class="fas fa-star"></i> ${anime.score || "N/A"}</div>
                    <div class="anime-genres">${genres}</div>
                </div>
            </div>`;
    });

    document.querySelectorAll(".anime-card").forEach((card) => {
      card.addEventListener("click", function () {
        const title = this.querySelector(".anime-title").textContent;
        alert(`Opening ${title}...`);
      });
    });
  }

  sortData();

  if (sortOptions) {
    sortOptions.addEventListener("change", sortData);
  }
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
  alert("Playing Solo Leveling!");
});

document.querySelectorAll(".popular-item").forEach((item) => {
  item.addEventListener("click", function () {
    const title = this.querySelector("h4").textContent;
    alert(`Opening ${title}...`);
  });
});

loadAnime();
