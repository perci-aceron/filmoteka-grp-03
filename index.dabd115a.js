!function(){var e=[{id:28,name:"Action"},{id:12,name:"Adventure"},{id:16,name:"Animation"},{id:35,name:"Comedy"},{id:80,name:"Crime"},{id:99,name:"Documentary"},{id:18,name:"Drama"},{id:10751,name:"Family"},{id:14,name:"Fantasy"},{id:36,name:"History"},{id:27,name:"Horor"},{id:10402,name:"Music"},{id:9648,name:"Mystery"},{id:10749,name:"Romance"},{id:878,name:"Science Fiction"},{id:10770,name:"TV Movie"},{id:53,name:"Thriller"},{id:10752,name:"War"},{id:37,name:"War"}];function n(){var e=document.getElementById("loader");e&&(e.style.display="inline-block")}function a(){var e=document.getElementById("loader");e&&(e.style.display="none")}var t="https://image.tmdb.org/t/p/w500",i=document.getElementById("movie-container");function o(o,c){return n(),fetch("".concat("https://api.themoviedb.org/3/","discover/movie?sort_by=popularity.desc&api_key=").concat("9ce408291b177c2a2e598968d33c0b4a","&page=").concat(o)).then((function(e){return e.json()})).then((function(n){a();var o=n.total_results;console.log(n),console.log(o);var r=n.results,d=r.slice(0,c);console.log(r.slice(0,c)),function(n){i.innerHTML=" ",n.forEach((function(n){var a,o=n.title,c=n.poster_path,r=n.genre_ids,d=n.release_date,m=document.createElement("div");m.classList.add("movie-card"),m.innerHTML='<img src ="'.concat(t).concat(c,' alt="').concat(o,'"/>\n            <div class="movie-card-text">\n            <h2 class="movie-title">').concat(o,'</h2>\n            <p class="movie-card-genre">').concat((a=r,a.map((function(n){return e.find((function(e){return e.id===n})).name})).join(",")),' \n            <span class="movie-release">| ').concat(new Date(d).getFullYear(),"</span>\n            </p>\n            </div>"),i.appendChild(m)}))}(d)})).catch((function(e){a(),console.error(e)}))}o(1,18);o(1,18),n(),setTimeout((function(){a()}),2e3)}();
//# sourceMappingURL=index.dabd115a.js.map
