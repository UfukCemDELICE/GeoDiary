const request = require('supertest');
const mongoose = require('mongoose');
const Diary = require('../../models/Diary');
const { createApp } = require('../../app');
const app = createApp();
describe('diary isolation', () => {
  afterEach(() => vi.restoreAllMocks());
  it('handles malformed ids as not found', async () => {
    const response = await request(app)
      .get('/diaries/not-an-id')
      .set('x-test-user-id', new mongoose.Types.ObjectId().toString());
    expect(response.status).toBe(404);
  });
  it('does not reveal a diary owned by someone else', async () => {
    const userId = new mongoose.Types.ObjectId();
    const diaryId = new mongoose.Types.ObjectId();
    const findOne = vi.spyOn(Diary, 'findOne').mockResolvedValue(null);
    const response = await request(app)
      .get(`/diaries/${diaryId}`)
      .set('x-test-user-id', userId.toString());
    expect(response.status).toBe(404);
    expect(findOne).toHaveBeenCalledWith({ _id: diaryId.toString(), user: userId.toString() });
  });
});
