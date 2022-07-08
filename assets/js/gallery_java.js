const reset = document.querySelector('.reset_btn');
const section = document.querySelector('.data');
const galleryLoader = document.querySelector('.loader-wrapper');

let start = 0;
let end = 99;

function loader(show = true) {
    if (show) {
        galleryLoader.classList.remove('hide');
        return;
    }
    galleryLoader.classList.add('hide');
}

loader();

let metaData = [];
let filterData = [];
let isFilter = false;
let reachedBottom = false;

fetch(`https://kjh9852.github.io/auroracat/meta.json`)
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        loader(false);
        metaData = json;
        filter(metaData);
    })
    .catch(function (error) {
        console.log(error);
    });

function filter() {
    let meta = isFilter ? filterData : metaData;
    meta = meta.slice(start, end);
    console.log(meta);

    for (let i = 0; i < meta.length; i++) {
        const div = document.createElement("div");
        const a = document.createElement("a");
        a.setAttribute("href", meta[i].hash);
        const mypara = document.createElement("p");
        const img = document.createElement("img");
        img.dataset.src;
        img.src = meta[i].image;
        img.loading = "lazy";

        mypara.textContent = `CAT #${meta[i].name}`;
        div.appendChild(a);
        div.appendChild(mypara);
        a.appendChild(img);
        div.classList.add("item");
        div.setAttribute('data-num', meta[i].name);

        if (meta[i].attributes.Background) {
            div.setAttribute("data-background", meta[i].attributes.Background);
        }
        if (meta[i].attributes.Eyes) {
            div.setAttribute("data-eyes", meta[i].attributes.Eyes);
        }
        if (meta[i].attributes.Fur) {
            div.setAttribute("data-fur", meta[i].attributes.Fur);
        }
        if (meta[i].attributes.Item) {
            div.setAttribute("data-items", meta[i].attributes.Item);
        }
        section.appendChild(div);

        const options = { threhold: 0.1 };
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.add("visible");
                    io.unobserve(image);
                } else {
                    entry.target.classList.remove("visible");
                }
            });
        }, options);

        document.querySelectorAll(".item").forEach((item) => io.observe(item));
        reachedBottom = false;
    }

    loader(false);

    window.addEventListener('scroll', () => {
        let Yoffset = window.pageYOffset;
        const windowHeight = window.innerHeight;
        let resultHeight = Yoffset + windowHeight;
        const gallery = document.querySelector('.gallery')
        let galleryHeight = gallery.scrollHeight;
        if (resultHeight >= galleryHeight) {
            console.log("scroll end")
            if (!reachedBottom) {
                loader();
                reachedBottom = true;
                setTimeout(() => {
                    start = end;
                    end = end + 99;
                    filter();
                }, 1000);
            }
        }
    });
}

function initFilter() {
    let background = $(".filter-background").val();
    let fur = $(".filter-fur").val();
    let eyes = $(".filter-eyes").val();
    let items = $(".filter-item").val();
    let id = $(".search_form input").val();
    console.log(background);

    filterData = metaData
        .filter(function (item) {
            if (background && item.attributes.Background !== background) {
                return false;
            }
            if (fur && item.attributes.Fur !== fur) {
                return false;
            }
            if (eyes && item.attributes.Eyes !== eyes) {
                return false;
            }
            if (items && item.attributes.Item !== items) {
                return false;
            }
            if (id && item.name !== id) {
                return false;
            }
            return true;
        });
    isFilter = true;
    start = 0;
    end = 99;
    $(".gallery .data").html("");
    filter();
}

$(".filter").on("change", () => {
    initFilter();
});

$(".form_control").on("input", () => {
    initFilter();
});

$(".search_form").on("submit", (e) => {
    e.preventDefault();
});

$(".reset_btn button").on("click", (e) => {
    $(".gallery .data").html("");
    isFilter = false;
    start = 0;
    end = 99;
    $(".search_form input").val("");
    $(".filter").val("");
    filter();
});
