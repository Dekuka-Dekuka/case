window.addEventListener('load', () => {

    const urlParams = new URLSearchParams(window.location.search);
    let currentTime = urlParams.get('time');
    let main = document.querySelector('main');


    if (currentTime) {
        let picture = document.createElement('video');
        picture.classList.add('picture-in-picture');
        picture.setAttribute('data-src', urlParams.get('src'));

        let hls = new Hls;
        picture.autoplay = true;
        picture.controls = true;

        let src = urlParams.get('src');
        hls.loadSource(src);
        hls.attachMedia(picture);
        picture.currentTime = currentTime;

        picture.addEventListener('play', () => {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'x') {
                    main.removeChild(picture);
                    window.location.href = 'base.html';
                }
            })
        })

        main.append(picture);
    }

    let tokenUrl = 'http://api.wisey.app/api/v1/auth/anonymous?platform=subscriptions';
    let prewiewCoursesUrl = 'https://api.wisey.app/api/v1/core/preview-courses';


    const firstPage = document.getElementById('firstPage');
    const secondPage = document.getElementById('secondPage');
    const thirdPage = document.getElementById('thirdPage');


    async function getData(url, headers) {
        const response = await fetch(url, headers).catch(e => document.body.innerHTML = '<p class="offline">API Error</p>');
        return await response.json();
    }


    function showCourses(data) {
        let courses = data.courses;

        for (const course of courses) {
            let div = document.createElement('div');
            div.setAttribute('id', course.id)
            let title = document.createElement('h4');
            let description = document.createElement('p');
            let img = document.createElement('img');
            let rating = document.createElement('p');
            rating.textContent = 'Rating: ' + course.rating;

            let lessonsCount = document.createElement('p');
            lessonsCount.textContent = 'Lessons: ' + course.lessonsCount;
            img.setAttribute('src', course.previewImageLink + '/cover.webp');
            description.textContent = course.description;
            title.textContent = course.title;

            let skillsUl = document.createElement('ul');
            skillsUl.textContent = 'Skills:';
            skillsUl.classList.add('list-group');
            let skills = course.meta.skills;

            if (skills) {

                for (const skill of skills) {
                    let li = document.createElement('li');
                    li.textContent = skill;
                    li.classList.add('list-group-item')
                    skillsUl.appendChild(li);
                }

            }

            let btn = document.createElement('button');
            btn.textContent = "View Details";
            btn.setAttribute('id', course.id);
            btn.classList.add('btn');
            btn.classList.add('btn-primary');
            btn.onclick = getCourse;

            div.append(img, title, description, rating, lessonsCount, skillsUl, btn);

            try {
                let img = `<img src='${course.previewImageLink + '/cover.webp'}' id='${course.id + '1'}' class='video-img-hover'>`

                let video = document.createElement('video');
                video.classList.add('course-video');
                video.muted = true;
                video.autoplay = true;
                video.setAttribute('id', course.id + "12");

                var hls = new Hls();
                hls.loadSource(course.meta.courseVideoPreview.link);
                hls.attachMedia(video);

                div.insertAdjacentHTML('beforeend', img);
                div.append(video);

            } catch (e) {
                console.log(e);
            }

            if (courses.indexOf(course) < 10) {
                firstPage.append(div);

            } else if (courses.indexOf(course) > 10 && courses.indexOf(course) < 21) {
                secondPage.append(div);
                
            } else {
                thirdPage.append(div);
            }
        }

    }

    getData(tokenUrl, {}).then(value => {

        token = value.token;


        getData(prewiewCoursesUrl, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(value => {
            showCourses(value);

            let imgs = document.querySelectorAll('.video-img-hover');

            for (const img of imgs) {
                img.addEventListener('mouseenter', playVideoOnHover);
            }

            let videos = document.querySelectorAll('.course-video');

            for (const video of videos) {
                video.addEventListener('mouseleave', pauseVideo);
            }
        })


    });

    function getCourse(e) {

        let id = e.currentTarget.getAttribute('id');

        getData(tokenUrl, {}).then(value => {
            token = value.token;
            let url = 'https://api.wisey.app/api/v1/core/preview-courses/' + id;
            console.log(url);


            getData(url, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then(value => {

                localStorage.setItem('course', JSON.stringify(value));

                let picture = document.querySelector('.picture-in-picture');


                if (picture) {
                    window.location.href = 'course.html?time=' + picture.currentTime + '&src=' + picture.getAttribute('data-src');
                } else {
                    window.location.href = 'course.html';
                }

            })
        });

    }

    function playVideoOnHover(e) {
        e.currentTarget.classList.add('img-hover');
        let imgId = e.currentTarget.getAttribute('id');
        let videoId = imgId + "2";
        let video = document.getElementById(videoId);
        video.play()
    }

    function pauseVideo(e) {
        let videoId = e.currentTarget.getAttribute('id');
        let imgId = videoId.slice(0, -1);
        let img = document.getElementById(imgId);
        img.classList.remove('img-hover');
    }
})



window.addEventListener('offline', () => {
    document.body.innerHTML = '<p class = "offline">We are offline</p>'
})