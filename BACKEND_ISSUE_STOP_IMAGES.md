# Backend API - Stop Image Missing Issue

## Main Problem

The Flask backend API is **NOT returning the `image` field** for stops in the Experience response. This is why stop images are not displaying on the frontend.

---

## Current API Response (WRONG)

When frontend calls: `GET /api/v1/experience`

Backend returns stops WITHOUT image:
```json
{
  "stops": [
    {
      "bestTime": "Morning",
      "description": "A spiritually significant shrine...",
      "duration": "15 – 20 min",
      "fact": "The shrine is an important local spiritual touchpoint.",
      "name": "Chhoti Devkali Mandir",
      "order": 1
      // ❌ MISSING: "image" field
      // ❌ MISSING: "gallery" field
    }
  ]
}
```

---

## Expected API Response (CORRECT)

According to BACKEND_GUIDE.md, stops should include:
```json
{
  "stops": [
    {
      "order": 1,
      "name": "Chhoti Devkali Mandir",
      "duration": "15 – 20 min",
      "image": "http://127.0.0.1:5000/media/experience/stops/stop-image-uuid.jpg",
      "description": "A spiritually significant shrine...",
      "bestTime": "Morning",
      "fact": "The shrine is an important local spiritual touchpoint.",
      "gallery": [
        "http://127.0.0.1:5000/media/experience/stops/gallery-uuid-1.jpg",
        "http://127.0.0.1:5000/media/experience/stops/gallery-uuid-2.jpg"
      ]
    }
  ]
}
```

---

## What Needs to be Fixed in Flask Backend

In your Flask Experience model serialization method (likely in `models.py` or the route that returns experiences):

### Current Code (WRONG):
```python
'stops': [
  {
    'order': stop.order,
    'name': stop.name,
    'duration': stop.duration,
    'description': stop.description,
    'bestTime': stop.best_time,
    'fact': stop.fact,
    # ❌ Missing 'image' field
    # ❌ Missing 'gallery' field
  }
  for stop in experience.stops
]
```

### Fixed Code (CORRECT):
```python
'stops': [
  {
    'order': stop.order,
    'name': stop.name,
    'duration': stop.duration,
    'image': stop.image,           # ← ADD THIS
    'description': stop.description,
    'bestTime': stop.best_time,
    'fact': stop.fact,
    'gallery': stop.gallery or [],  # ← ADD THIS (default to empty array if None)
  }
  for stop in experience.stops
]
```

---

## Files to Check/Modify in Flask Backend

1. **models.py** - Check Experience model's `to_dict()` or serialization method
2. **routes/experiences.py** or similar - Check the serialization in GET `/api/v1/experience` endpoint
3. Make sure the Stop model has `image` and `gallery` columns/fields in the database

---

## Testing

After fixing the backend, run:
```bash
curl http://127.0.0.1:5000/api/v1/experience | python -m json.tool
```

And verify that each stop in the response includes:
- `"image": "http://127.0.0.1:5000/media/experience/..."`
- `"gallery": [...]` array

Then frontend will automatically display the stop images correctly.

---

## Frontend Changes Already Done

✅ Frontend code is already fixed to:
- Convert relative image paths to absolute URLs
- Handle null/missing images gracefully
- Display stop images in JourneyRoute component
- Display gallery images in TouchpointModal component

**No frontend changes needed** - just fix the backend to include image fields in stops!
