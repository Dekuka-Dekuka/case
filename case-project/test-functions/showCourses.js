function showCourses(data) {
    let courses = data.courses;
    for (const course of courses) {
        let div = document.createElement('div');
        div.setAttribute('id', course.id);
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
        div.append(img, title, description, rating, lessonsCount, skillsUl, btn);
        try {
            let img = `<img src='${course.previewImageLink + '/cover.webp'}' id='${course.id + '1'}' class='video-img-hover'>`
            let video = document.createElement('video');
            video.classList.add('course-video');
            video.muted = true;
            video.autoplay = true;
            video.setAttribute('id', course.id + "12")
            div.insertAdjacentHTML('beforeend', img);
            div.append(video);
        } catch(e) {
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

module.exports = showCourses;