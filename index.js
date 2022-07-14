let swiper;

function initSwiperSlide() {
  swiper = new Swiper(".swiper", {
    loopedSlides: 10,
    slidesPerView: 6,
    spaceBetween: 100,
    speed: 400,
    autoplay: true,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

function uploadFeed() {
  $.ajax({
    url: "https://petner.kr/api/v6/publics",
    data: "feed",
    type: "GET",
    dataType: "json",
    error: function () {
      alert("통신실패");
    },
  }).done(function (json) {
    swiper.destroy();
    $(".swiper-wrapper").html(` `);
    for (i in json) {
      let infoTime = moment(json[i].created_at).fromNow();
      let cardTemplate = `
        <div class="swiper-slide" draggable=false >
            <div class="card">
              <div class="card-user">
                  <div class="user-img" style="background-image:url(${json[i].petner.image});"> </div>
                  <div class="user-info">
                      <p class="user-name">${json[i].petner.name}</p>
                      <p class="user-type">수의대생</p>
                  </div>
              </div>
              <div class="card-image">
                  <div style=" background-image:url(${json[i].image}); ">
                  </div>
              </div>
              <div class="card-info">
                  <p class="info-time">${infoTime}</p>
                  <p class="info-name">${json[i].companion.name}</p>
              </div>
          </div>
        </div>
      `;
      $(".swiper-wrapper").append(cardTemplate);
    }
    initSwiperSlide();
  });
}

$(document).ready(function () {
  initSwiperSlide();
  uploadFeed();

  $("#reload").on("click", function () {
    uploadFeed();
  });
});
