const Diary = require('../models/Diary');
const { metadataFromUpload, removeLocalImage } = require('../services/image.service');
function notFound() {
  const error = new Error('Diary not found');
  error.status = 404;
  return error;
}
async function index(req, res, next) {
  try {
    const diaries = await Diary.find({ user: req.user._id }).sort({ diaryDate: -1 }).lean();
    res.render('diaries/index', { title: 'My diaries', diaries });
  } catch (e) {
    next(e);
  }
}
async function map(req, res, next) {
  try {
    const rows = await Diary.find({ user: req.user._id })
      .select('title diaryDate location locationName content')
      .lean();
    const markers = rows
      .filter((d) => d.location && d.location.coordinates)
      .map((d) => ({
        id: String(d._id),
        title: d.title,
        diaryDate: d.diaryDate,
        locationName: d.locationName || '',
        content: d.content || '',
        coordinates: d.location.coordinates,
      }));
    res.render('diaries/map', {
      title: 'Diary map',
      markers,
      mapboxToken: req.app.locals.config.mapboxToken,
    });
  } catch (e) {
    next(e);
  }
}
function newForm(req, res) {
  res.render('diaries/new', {
    title: 'New diary',
    diary: req.body || {},
    errors: [],
    mapboxToken: req.app.locals.config.mapboxToken,
  });
}
async function create(req, res, next) {
  if (req.validationErrors.length) {
    if (req.file) {
      await removeLocalImage(req.file.filename, req.app.locals.config.uploadDirectory).catch(
        () => {},
      );
    }
    return res.status(422).render('diaries/new', {
      title: 'New diary',
      diary: req.body,
      errors: req.validationErrors,
      mapboxToken: req.app.locals.config.mapboxToken,
    });
  }
  try {
    const diary = await Diary.create({
      user: req.user._id,
      title: req.body.title,
      content: req.body.content,
      diaryDate: req.body.diaryDate,
      locationName: req.body.locationName,
      location: { type: 'Point', coordinates: [req.body.longitude, req.body.latitude] },
      photo: metadataFromUpload(req.file),
    });
    return res.redirect(`/diaries/${diary.id}`);
  } catch (e) {
    if (req.file) {
      await removeLocalImage(req.file.filename, req.app.locals.config.uploadDirectory).catch(
        () => {},
      );
    }
    return next(e);
  }
}
async function owned(req) {
  return Diary.findOne({ _id: req.params.id, user: req.user._id });
}
async function show(req, res, next) {
  try {
    const diary = await owned(req);
    if (!diary) throw notFound();
    res.render('diaries/show', { title: diary.title, diary });
  } catch (e) {
    next(e);
  }
}
async function editForm(req, res, next) {
  try {
    const diary = await owned(req);
    if (!diary) throw notFound();
    res.render('diaries/edit', {
      title: 'Edit diary',
      diary,
      errors: [],
      mapboxToken: req.app.locals.config.mapboxToken,
    });
  } catch (e) {
    next(e);
  }
}
async function update(req, res, next) {
  if (req.validationErrors.length) {
    if (req.file) {
      await removeLocalImage(req.file.filename, req.app.locals.config.uploadDirectory).catch(
        () => {},
      );
    }
    return res.status(422).render('diaries/edit', {
      title: 'Edit diary',
      diary: { ...req.body, _id: req.params.id },
      errors: req.validationErrors,
      mapboxToken: req.app.locals.config.mapboxToken,
    });
  }
  try {
    const oldDiary = await Diary.findOne({ _id: req.params.id, user: req.user._id });
    if (!oldDiary) throw notFound();

    const updates = {
      title: req.body.title,
      content: req.body.content,
      diaryDate: req.body.diaryDate,
      locationName: req.body.locationName,
      location: { type: 'Point', coordinates: [req.body.longitude, req.body.latitude] },
    };

    if (req.file) {
      updates.photo = metadataFromUpload(req.file);
    }

    const diary = await Diary.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      updates,
      { new: true, runValidators: true },
    );
    if (!diary) throw notFound();

    if (req.file && oldDiary.photo && oldDiary.photo.storageKey) {
      await removeLocalImage(
        oldDiary.photo.storageKey,
        req.app.locals.config.uploadDirectory,
      ).catch(() => {});
    }

    res.redirect(`/diaries/${diary.id}`);
  } catch (e) {
    if (req.file) {
      await removeLocalImage(req.file.filename, req.app.locals.config.uploadDirectory).catch(
        () => {},
      );
    }
    next(e);
  }
}
async function remove(req, res, next) {
  try {
    const diary = await Diary.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!diary) throw notFound();
    if (diary.photo && diary.photo.storageKey) {
      await removeLocalImage(diary.photo.storageKey, req.app.locals.config.uploadDirectory).catch(
        () => {},
      );
    }
    res.redirect('/diaries');
  } catch (e) {
    next(e);
  }
}
module.exports = { index, map, newForm, create, show, editForm, update, remove };
