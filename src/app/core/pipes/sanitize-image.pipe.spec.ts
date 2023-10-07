import { SanitizeImagePipe } from './sanitize-image.pipe';

describe('SanitizeImagePipe', () => {
  it('create an instance', () => {
    const pipe = new SanitizeImagePipe();
    expect(pipe).toBeTruthy();
  });
});
