function playVideoOnHover(e) {
    e.currentTarget.classList.add('img-hover');
    let imgId = e.currentTarget.getAttribute('id');
    let videoId = imgId + "2";
    let video = document.getElementById(videoId);
    video.play();
}

module.exports = playVideoOnHover;