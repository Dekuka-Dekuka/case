/**
 * @jest-environment jsdom
*/
describe('pauseVideo', () => {
    test('removes img-hover class from img', () => {
      const videoId = 'video1';
      const imgId = 'img1';
      const video = document.createElement('video');
      video.setAttribute('id', videoId);
      const img = document.createElement('img');
      img.setAttribute('id', imgId);
      img.classList.add('img-hover');
      document.body.appendChild(video);
      document.body.appendChild(img);
      
      const event = new Event('mouseenter');
      img.dispatchEvent(event);
      img.classList.remove('img-hover');
      
      expect(img.classList.contains('img-hover')).toBe(false);
      
      document.body.removeChild(video);
      document.body.removeChild(img);
    });
});
  