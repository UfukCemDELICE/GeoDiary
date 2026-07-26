const mongoose = require('mongoose');
const Diary = require('../../models/Diary');
describe('Diary model', () => {
  const valid = () => ({
    user: new mongoose.Types.ObjectId(),
    title: 'A place',
    content: 'A memory',
    diaryDate: new Date(),
    location: { type: 'Point', coordinates: [-73.9, 40.7] },
  });
  it('accepts GeoJSON longitude then latitude', () =>
    expect(new Diary(valid()).validateSync()).toBeUndefined());
  it('requires content', () => {
    const data = valid();
    delete data.content;
    expect(new Diary(data).validateSync().errors.content).toBeDefined();
  });
  it('rejects coordinates outside range', () => {
    const data = valid();
    data.location.coordinates = [200, 95];
    expect(new Diary(data).validateSync().errors['location.coordinates']).toBeDefined();
  });
});
