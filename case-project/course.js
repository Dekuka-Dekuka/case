window.addEventListener('load', () => {

    let course = localStorage.getItem('course');
    course = JSON.parse(course);
    let divCourse = document.getElementById('course');
    let home = document.querySelector('.a-home');

    const urlParams = new URLSearchParams(window.location.search);
    let currentTime = urlParams.get('time');
    let main = document.querySelector('main');

    if (currentTime) {

        let picture = document.createElement('video');
        picture.classList.add('picture-in-picture');
        console.log(picture);

        let hls = new Hls;
        picture.autoplay = true;
        picture.controls = true;

        picture.setAttribute('data-src', urlParams.get('src'));
        let src = urlParams.get('src');
        hls.loadSource(src);
        hls.attachMedia(picture);
        picture.currentTime = currentTime;

        picture.addEventListener('play', () => {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'x') {
                    main.removeChild(picture);
                }
            })
        })
        
        main.append(picture);
    }


    function showCourse() {
        let div = document.createElement('div');
        let title = document.createElement('h3');
        let description = document.createElement('p');
        let img = document.createElement('img');
        let rating = document.createElement('p');


        rating.textContent = 'Rating: ' + course.rating;
        img.setAttribute('src', course.previewImageLink + '/cover.webp');
        description.textContent = course.description;
        title.textContent = course.title;


        let skillsUl = document.createElement('ul');
        let skills = course.meta.skills;
        skillsUl.classList.add('list-group');


        if (skills) {
            for (const skill of skills) {
                let li = document.createElement('li');
                li.classList.add('list-group-item');
                li.textContent = skill;
                skillsUl.appendChild(li);
            }
        }


        div.append(img, title, description, rating, skillsUl);
        divCourse.insertAdjacentElement('beforeend', div);


        let ulLesson = document.createElement('ul');
        ulLesson.textContent = 'Lessons:';
        ulLesson.classList.add('list-group');
        ulLesson.classList.add('ul');
        div.insertAdjacentElement('afterend', ulLesson);

        for (let lesson of course.lessons) {
            let lessontitle = `<li class='lesson-title ${lesson.status} list-group-item' id='${lesson.id}' data-poster='${lesson.previewImageLink + '/lesson-' + lesson.order + '.webp'}'>${lesson.title}</li>`
            ulLesson.insertAdjacentHTML('beforeend', lessontitle);
        }


        try {
            let video = document.createElement('video');
            video.controls = true;
            video.classList.add('primary-video');


            var hls = new Hls();
            hls.loadSource(course.meta.courseVideoPreview.link);
            hls.attachMedia(video);


            let btnPic = `<button class="picture-in-pictire btn btn-primary">Picture-in-Picture Mode</button>`
            div.insertAdjacentHTML('beforeend', btnPic);
            btnPic = document.querySelector('.picture-in-pictire');
            video.setAttribute('poster', course.previewImageLink + '/cover.webp');
            btnPic.addEventListener('click', pictureInPicture);
            div.append(video);

            let courseId = course.id;
            let videoProgress = JSON.parse(localStorage.getItem(courseId));


            if (videoProgress) {
                video.currentTime = videoProgress.videoProgress;
                let lessonTitle = document.createElement('p');
                lessonTitle.textContent = videoProgress.textContent;
                lessonTitle.classList.add('lesson-name');
                video.insertAdjacentElement('beforebegin', lessonTitle);
            }


        } catch(e) {
            console.log(e);
        }

        let lessonsLi = document.querySelectorAll('.lesson-title');
        for (const lessonLi of lessonsLi) {

            lessonLi.addEventListener('click', (e) => {

                let status = e.currentTarget.getAttribute('class');
                let video = document.querySelector('.primary-video');
                let regexp = /unlocked/;


                if (regexp.test(status)) {
                    let dataPoster = e.currentTarget.getAttribute('data-poster');
                    video.setAttribute('poster', dataPoster);
                    video.currentTime = 0;
                    let lessonName = document.querySelector('.lesson-name');


                    if (lessonName)  {
                        lessonName.innerHTML = e.currentTarget.textContent;
                    } else {
                        let lessonName = document.createElement('p');
                        lessonName.textContent = e.currentTarget.textContent;
                        lessonName.classList.add('lesson-name');
                        video.insertAdjacentElement('beforebegin', lessonName);
                    }

                } else {
                    alert('This video is locked for now');
                }


            });
        }

        let primaryVideo = document.querySelector('.primary-video');
        primaryVideo.addEventListener('play', () => {
            document.addEventListener('keydown', (e) => {
                if(e.key === 'X') {
                    primaryVideo.playbackRate = 2.0;
                } else if(e.key === 'x') {
                    primaryVideo.playbackRate = 1.5;
                } else if(e.key === 'Y') {
                    primaryVideo.playbackRate = 0.5;
                } else if (e.key === 'y') {
                    primaryVideo.playbackRate = 0.25;
                } else {
                    primaryVideo.playbackRate = 1.0;
                }
            });
        })
    }


    showCourse();

    function pictureInPicture() {

        var hls = new Hls();
        hls.loadSource(course.meta.courseVideoPreview.link);
        let picture = document.createElement('video');
        hls.attachMedia(picture);

        picture.autoplay = true;
        picture.controls = true;

        picture.setAttribute('data-src', course.meta.courseVideoPreview.link);
        picture.classList.add('picture-in-picture');
        document.body.append(picture);

        picture.addEventListener('play', () => {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'x') {
                    document.body.removeChild(picture);
                    window.location.href='./course.html';
                }
            })
        })

    }


    home.addEventListener('click', () => {

        let picture = document.querySelector('.picture-in-picture');

        if (picture) {
            window.location.href = './base.html?time=' + picture.currentTime + '&src=' + picture.getAttribute('data-src');
        } else {
            window.location.href = './base.html';
        }

    })

});

window.addEventListener('unload', () => {
    let idCourse = JSON.parse(localStorage.getItem('course'));
    idCourse = idCourse.id;

    try {
        let lesson = document.querySelector('.lesson-name').textContent;
        let video = document.querySelector('.primary-video');

        let lessonProps = {
            'textContent': lesson,
            'videoProgress': video.currentTime
        }

        localStorage.setItem(idCourse, JSON.stringify(lessonProps));
    } catch (e) {
        console.log(e);
    }
});


window.addEventListener('offline', () => {
    document.body.innerHTML = '<p class = "offline">We are offline</p>'
})