/**
 * @jest-environment jsdom
*/

const playVideoOnHover = require('../test-functions/playVideoOnHover')
describe('playVideoOnHover', () => {
    let div, img, video;
    
    beforeEach(() => {
      // Создаем элементы DOM для теста
      div = document.createElement('div');
      img = document.createElement('img');
      video = document.createElement('video');
      div.append(img, video);
      document.body.append(div);
      img.setAttribute('id', 'test-img');
      video.setAttribute('id', 'test-img2');
    });
    
    afterEach(() => {
      // Удаляем элементы DOM после теста
      div.remove();
    });
    
    test('should add class "img-hover" to the currentTarget', () => {
      // Arrange
      const event = { currentTarget: img };
      
      // Act
      playVideoOnHover(event);
      
      // Assert
      expect(img.classList.contains('img-hover')).toBe(true);
    });
    
    test('should play the video element with the correct id', () => {
      const event = { currentTarget: img };
      jest.spyOn(video, 'play');
      
      playVideoOnHover(event);
      
      expect(video.play).toHaveBeenCalled();
      expect(video.play).toHaveBeenCalledTimes(1);
    });
});
  